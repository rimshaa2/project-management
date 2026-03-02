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
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectModal from "./ProjectModal";
import Link from "next/link";
import { useRole } from "../hooks/useRole";

export default function ProjectPage() {
  const { projects, tasks, loading } = useProjects();
  const [editingProject, setEditingProject] = useState<any>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isAdmin } = useRole();

  const handlDelete = async (id: string) => {
    if (window.confirm("Are you sure yu want to delete this project?")) {
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
          <S.ProjectGrid>
            {loading ? (
              <p>Loading projects...</p>
            ) : (
              projects.map((project) => (
                <S.ProjectCard key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <S.CardHeader>
                      <h3>{project.name}</h3>
                      <div style={{ position: "relative" }}>
                        <EllipsisVerticalIcon
                          className="size-6 text-gray-400 cursor-pointer"
                          onClick={(e) => {
                            setActiveMenuId(
                              activeMenuId === project.id ? null : project.id,
                            );
                            e.preventDefault();
                          }}
                        />
                        {activeMenuId === project.id && isAdmin && (
                          <S.ActionMenu>
                            <button
                              onClick={(e) => {
                                setEditingProject(project);
                                e.preventDefault();
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="delete"
                              onClick={(e) => {
                                handlDelete(project.id);
                                e.preventDefault();
                              }}
                            >
                              Delete
                            </button>
                          </S.ActionMenu>
                        )}
                      </div>
                    </S.CardHeader>
                    <S.Dscription>
                      {project.description || "Empty"}{" "}
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
                        {tasks.length || 0}
                      </S.StatsItem>
                      <S.StatsItem>
                        <CalendarIcon className="size-4" />
                        {project.endDate}
                      </S.StatsItem>

                      <S.StatsItem>
                        <UserGroupIcon className="size-4" />
                        {project.assignedTo || 0} Assigned
                      </S.StatsItem>
                    </S.StatsRow>
                  </Link>
                </S.ProjectCard>
              ))
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
          </S.ProjectGrid>
        </D.DashboardContainer>
      </D.ContentArea>
    </D.LayoutContainer>
  );
}
