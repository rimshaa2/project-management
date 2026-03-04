"use client";
import { useProjects } from "../hooks/useProjects";
import * as S from "./ProjectModal.styles";
import * as D from "../dashboard/Dashboard.styles";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
  XCircleIcon,
  PlusIcon,
  DocumentPlusIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectModal from "./ProjectModal";
import Link from "next/link";
import { useRole } from "../hooks/useRole";
import TaskModal from "../tasks/TaskModal";
import EmptyState from "../components/EmptyState";

export default function ProjectPage() {
  const { projects, tasks, loading } = useProjects();
  const [editingProject, setEditingProject] = useState<any>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [quickTaskProject, setQuickTaskProject] = useState<any>(null);

  const { isAdmin } = useRole();

  const handlDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
    }
  };

  return (
    <D.LayoutContainer>
      <D.ContentArea>
        <D.DashboardContainer>
          <D.HeaderRow>
            <D.Title style={{ margin: 0 }}>Projects</D.Title>
            {isAdmin && (
              <D.PrimaryButton onClick={() => setIsCreateModalOpen(true)}>
                <PlusIcon className="size-5" />
                New Project
              </D.PrimaryButton>
            )}
          </D.HeaderRow>

          <hr style={{ borderColor: "#333", marginBottom: "40px" }} />

          {loading ? (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#888" }}
            >
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <EmptyState
              icon={FolderIcon}
              title="No projects yet"
              description="Start by creating a project to manage your team's tasks."
              showButton={isAdmin}
              buttonText="Create Project"
              onButtonClick={() => setIsCreateModalOpen(true)}
            />
          ) : (
            <S.ProjectGrid>
              {projects.map((project) => (
                <S.ProjectCard key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <S.CardHeader>
                      <h3>{project.name}</h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        {isAdmin && (
                          <button
                            title="Add Task to Project"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setQuickTaskProject(project);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                            }}
                          >
                            <DocumentPlusIcon className="size-5 text-gray-400 hover:text-indigo-400 transition-colors" />
                          </button>
                        )}
                        <EllipsisVerticalIcon
                          className="size-6 text-gray-400 cursor-pointer hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveMenuId(
                              activeMenuId === project.id ? null : project.id,
                            );
                          }}
                        />

                        {activeMenuId === project.id && isAdmin && (
                          <S.ActionMenu onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setEditingProject(project);
                                setActiveMenuId(null);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="delete"
                              onClick={(e) => {
                                e.preventDefault();
                                handlDelete(project.id);
                                setActiveMenuId(null);
                              }}
                            >
                              Delete
                            </button>
                          </S.ActionMenu>
                        )}
                      </div>
                    </S.CardHeader>

                    <S.Dscription>
                      {project.description || "No description provided"}
                    </S.Dscription>

                    <S.StatsRow>
                      <S.Badge
                        $type={
                          project.status === "Active" ? "active" : "inactive"
                        }
                      >
                        {project.status === "Active" ? (
                          <CheckCircleIcon className="size-4" />
                        ) : (
                          <XCircleIcon className="size-4" />
                        )}
                        {project.status || "Inactive"}
                      </S.Badge>

                      <S.StatsItem>
                        <ClipboardDocumentListIcon className="size-4" />

                        {tasks.filter((t) => t.projectId === project.id)
                          .length || 0}
                      </S.StatsItem>

                      <S.StatsItem>
                        <CalendarIcon className="size-4" />
                        {project.endDate || "No date"}
                      </S.StatsItem>

                      <S.StatsItem>
                        <UserGroupIcon className="size-4" />
                        {project.assignedTo || 0}
                      </S.StatsItem>
                    </S.StatsRow>
                  </Link>
                </S.ProjectCard>
              ))}
            </S.ProjectGrid>
          )}

          {isCreateModalOpen && (
            <ProjectModal onClose={() => setIsCreateModalOpen(false)} />
          )}

          {editingProject && (
            <ProjectModal
              project={editingProject}
              onClose={() => setEditingProject(null)}
            />
          )}

          {quickTaskProject && (
            <TaskModal
              onClose={() => setQuickTaskProject(null)}
              task={{ projectId: quickTaskProject.id } as any}
            />
          )}
        </D.DashboardContainer>
      </D.ContentArea>
    </D.LayoutContainer>
  );
}
