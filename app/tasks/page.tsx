"use client";
import { useTasks } from "../hooks/useTasks";
import * as S from "../dashboard/Dashboard.styles";
import {
  PlusIcon,
  EllipsisVerticalIcon,
  CheckBadgeIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import * as P from "../projects/ProjectModal.styles";
import TaskModal from "./TaskModal";
import EmptyState from "../components/EmptyState";
import { useRole } from "../hooks/useRole";
import { useUsers } from "../hooks/useUsers";

export default function TasksPage() {
  const { tasks, loading } = useTasks();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isAdmin } = useRole();
  const { users } = useUsers();

  const getAssigneeName = (uid: string) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.name : "Unassigned";
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteDoc(doc(db, "tasks", id));
        alert("Task deleted");
      } catch (error) {
        alert("Failed");
      }
    }
  };
  return (
    <S.LayoutContainer>
      <S.HeaderRow>
        <S.Title>Tasks</S.Title>
        <S.PrimaryButton onClick={() => setIsCreateModalOpen(true)}>
          <PlusIcon className="size-5" />
          New Task
        </S.PrimaryButton>
      </S.HeaderRow>

      <hr style={{ borderColor: "#333" }} />

      <S.SectionHeader>
        <h3>Task Management</h3>
        <p>Total Tasks: {tasks.length}</p>
      </S.SectionHeader>
      <S.ActivityList>
        {loading ? (
          <p>Loading Activites...</p>
        ) : tasks.length === 0 ? (
          <EmptyState
            icon={FolderIcon}
            title="No tasks yet"
            description="Start by creating a task to manage your team's tasks."
            showButton={isAdmin}
            buttonText="Create Project"
          />
        ) : (
          tasks.map((activity) => (
            <S.ActivityCard key={activity.id}>
              <S.IconWrapper $status={activity.status}>
                {activity.status === "completed" ? (
                  <CheckBadgeIcon className="size-5" />
                ) : (
                  "+"
                )}
              </S.IconWrapper>
              <S.ActivityInfo>
                <h4>{activity.name}</h4>
                <p>
                  {activity.name} for {activity.project} for deadline{" "}
                  {activity.endDate}
                </p>
              </S.ActivityInfo>

              <S.ActivityMeta>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>By: {getAssigneeName(activity.createdBy)}</span>
                  <span>To: {getAssigneeName(activity.assignedTo)}</span>
                </div>
                <div style={{ position: "relative", marginLeft: "15px" }}>
                  <EllipsisVerticalIcon
                    className="size-6 text-gray-400"
                    onClick={() =>
                      setActiveMenuId(
                        activeMenuId === activity.id ? null : activity.id,
                      )
                    }
                  />
                  {activeMenuId === activity.id && (
                    <P.ActionMenu>
                      <button
                        onClick={() => {
                          setEditingTask(activity);
                          setActiveMenuId(null);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(activity.id)}
                      >
                        Delete
                      </button>
                    </P.ActionMenu>
                  )}
                </div>
              </S.ActivityMeta>
            </S.ActivityCard>
          ))
        )}
      </S.ActivityList>
      {isCreateModalOpen && (
        <TaskModal onClose={() => setIsCreateModalOpen(false)} />
      )}
      {editingTask && (
        <TaskModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </S.LayoutContainer>
  );
}
