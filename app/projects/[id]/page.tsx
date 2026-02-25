"use client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from "../../dashboard/Dashboard.styles";
import * as P from "../../sidebar/SideBar.styles";
import Sidebar from "@/app/sidebar/page";
import * as K from "./Kanban.styles";
import { useProjects } from "@/app/hooks/useProjects";
import { useUpdateTask } from "@/app/hooks/useUpdateTask";
import { Task } from "@/app/types";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function ProjectTasksPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { projects } = useProjects();
  const { updateTask } = useUpdateTask();

  const currentProject = projects.find((p) => p.id === id);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    const task = tasks.find((t) => t.id === taskId);

    if (task?.status === "completed") {
      alert("Completed tasks cannot be reopened");
    } else {
      const statusUpdate: Partial<Task> = {
        status: newStatus as Task["status"],
      };
      const success = await updateTask(taskId, statusUpdate);
      if (!success) {
        alert("Failed to update status");
      }
    }
  };
  useEffect(() => {
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

  const columns = ["pending", "process", "completed"];

  return (
    <S.LayoutContainer>
      <S.ContentArea>
        <S.DashboardContainer>
          <S.Title>
            {currentProject ? `${currentProject.name}` : "Project Board"}{" "}
          </S.Title>
          <K.KanbanBoard>
            {columns.map((status) => (
              <K.Column key={status}>
                <K.ColumnHeader>
                  <h3>{status.toUpperCase()}</h3>
                  <span>{tasks.filter((t) => t.status === status).length}</span>
                </K.ColumnHeader>
                <K.TaskContainer>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <K.TaskCard key={task.id}>
                        <h4>{task.name}</h4>
                        <p>{task.description}</p>
                        <K.TaskFooter>
                          <div className="meta">
                            <span>{task.endDate}</span>
                            <p>{task.assignedTo}</p>
                          </div>
                          <K.StatusSelect
                            value={task.status}
                            $status={task.status}
                            disabled={task.status === "completed"}
                            onChange={(e) =>
                              handleStatusChange(task.id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="process">In Process</option>
                            <option value="completed">Completed</option>
                          </K.StatusSelect>
                        </K.TaskFooter>
                      </K.TaskCard>
                    ))}
                </K.TaskContainer>
              </K.Column>
            ))}
          </K.KanbanBoard>
        </S.DashboardContainer>
      </S.ContentArea>
    </S.LayoutContainer>
  );
}
