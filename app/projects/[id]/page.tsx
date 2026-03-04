"use client";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from "../../dashboard/Dashboard.styles";
import * as K from "./Kanban.styles";
import { useProjects } from "@/app/hooks/useProjects";
import { useUpdateTask } from "@/app/hooks/useUpdateTask";
import { useUsers } from "@/app/hooks/useUsers";
import { PlusIcon, InboxIcon } from "@heroicons/react/24/outline";
import TaskModal from "../../tasks/TaskModal";
import EmptyState from "../../components/EmptyState";

export default function ProjectTasksPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { projects } = useProjects();
  const { users } = useUsers();
  const { updateTask } = useUpdateTask();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const currentProject = projects.find((p) => p.id === id);
  const isProjectCompleted = currentProject?.status === "Completed";

  useEffect(() => {
    if (!id) return;
    const q = query(collection(db, "tasks"), where("projectId", "==", id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (
      tasks.length > 0 &&
      currentProject &&
      currentProject.status !== "Completed"
    ) {
      if (tasks.every((t) => t.status === "completed")) {
        updateDoc(doc(db, "projects", id as string), { status: "Completed" });
      }
    }
  }, [tasks, currentProject, id]);

  const getAssigneeName = (uid: string) =>
    users.find((u) => u.uid === uid)?.name || "Unassigned";

  const columns = ["pending", "process", "completed"];

  if (loading) return <S.LayoutContainer>Loading Board...</S.LayoutContainer>;

  return (
    <S.LayoutContainer>
      <S.ContentArea>
        <S.DashboardContainer>
          <S.HeaderRow>
            <S.Title>
              {currentProject?.name || "Project Board"}
              {isProjectCompleted && (
                <span style={{ color: "#ef4444", fontSize: "14px" }}>
                  {" "}
                  (LOCKED)
                </span>
              )}
            </S.Title>
            {!isProjectCompleted && (
              <S.PrimaryButton onClick={() => setIsCreateModalOpen(true)}>
                <PlusIcon className="size-5" /> New Task
              </S.PrimaryButton>
            )}
          </S.HeaderRow>

          <K.KanbanBoard>
            {columns.map((status) => {
              const filteredTasks = tasks.filter((t) => t.status === status);

              return (
                <K.Column key={status}>
                  <K.ColumnHeader>
                    <h3>{status.toUpperCase()}</h3>
                    <span>{filteredTasks.length}</span>
                  </K.ColumnHeader>

                  <K.TaskContainer>
                    {filteredTasks.length === 0 ? (
                      <div className="">
                        <EmptyState
                          icon={InboxIcon}
                          title={`No ${status} tasks`}
                          description={`There are currently no tasks in the ${status} stage.`}
                        />
                      </div>
                    ) : (
                      filteredTasks.map((task) => (
                        <K.TaskCard key={task.id}>
                          <h4>{task.name}</h4>
                          <p>{task.description}</p>
                          <K.TaskFooter>
                            <div className="meta">
                              <span>Due: {task.endDate}</span>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  marginTop: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    background: "#6366f1",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "10px",
                                    color: "white",
                                  }}
                                >
                                  {getAssigneeName(task.assignedTo)
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                                <span
                                  style={{ fontSize: "12px", color: "#ccc" }}
                                >
                                  {getAssigneeName(task.assignedTo)}
                                </span>
                              </div>
                            </div>
                            <K.StatusSelect
                              value={task.status}
                              $status={status}
                              disabled={task.status === "completed"}
                              onChange={(e) =>
                                updateTask(task.id, {
                                  status: e.target.value as any,
                                })
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="process">In Process</option>
                              <option value="completed">Completed</option>
                            </K.StatusSelect>
                          </K.TaskFooter>
                        </K.TaskCard>
                      ))
                    )}
                  </K.TaskContainer>
                </K.Column>
              );
            })}
          </K.KanbanBoard>
        </S.DashboardContainer>

        {isCreateModalOpen && (
          <TaskModal
            onClose={() => setIsCreateModalOpen(false)}
            task={{ projectId: id } as any}
          />
        )}
      </S.ContentArea>
    </S.LayoutContainer>
  );
}
