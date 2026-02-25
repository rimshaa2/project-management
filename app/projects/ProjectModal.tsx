"use client";
import { useEffect, useState } from "react";
import * as S from "./ProjectModal.styles";
import * as T from "../tasks/TaskModal.styles";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { Project } from "../types";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TaskModalProps {
  onClose: () => void;
  project?: any;
}

export default function TaskModal({ onClose, project }: TaskModalProps) {
  const isEditMode = !!project;
  const { updateProject } = useUpdateProject();
  const { createProject, loading } = useCreateProject();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    clientName: "",
    status: "pending",
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        clientName: project.clientName || "",
        status: project.status || "pending",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
      });
    }
  }, [project]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.clientName) {
      alert("Please fill in the required fields");
      return;
    }

    const projectPayload: Omit<Project, "id"> = {
      name: formData.name,
      description: formData.description,
      clientName: formData.clientName,
      status: formData.status as Project["status"],
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    let success;
    if (isEditMode) {
      success = await updateProject(project.id, {
        status: formData.status as Project["status"],
        name: formData.name,
      });
    } else {
      success = await createProject(projectPayload);
    }

    if (success) {
      alert(isEditMode ? "Project Updated" : "Project Created");
      onClose();
    }
  };
  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <T.Header>
          <h2>{isEditMode ? "Update Project" : "Add Project"}</h2>
          <T.LogoIcon>
            <button onClick={onClose}>
              <XMarkIcon />
            </button>
          </T.LogoIcon>
        </T.Header>
        <S.FormGroup>
          <label>Name</label>
          <input
            type="text"
            placeholder="Project name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          ></input>
        </S.FormGroup>
        <S.FormGroup>
          <label>Description</label>
          <input
            type="text"
            placeholder="Project description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></input>
        </S.FormGroup>
        <S.Row>
          <S.FormGroup>
            <label>Client Name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
            ></input>
          </S.FormGroup>
          <S.FormGroup>
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              style={{
                padding: "16px",
                background: "#1e1e1e",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <option value="pending">Pending</option>
              <option value="process">In Process</option>
              <option value="completed">Completed</option>
            </select>
          </S.FormGroup>
        </S.Row>
        <S.Row>
          <S.FormGroup>
            <label>Start Date</label>
            <S.DateInputWrapper>
              <span></span>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              ></input>
            </S.DateInputWrapper>
          </S.FormGroup>
          <S.FormGroup>
            <label>End Date</label>
            <S.DateInputWrapper>
              <span></span>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              ></input>
            </S.DateInputWrapper>
          </S.FormGroup>
        </S.Row>
        <S.SubmitButton onClick={handleSubmit} disabled={loading}>
          {loading ? "SAVING.." : isEditMode ? "UPDATE PROJECT" : "ADD PROJECT"}
        </S.SubmitButton>
      </S.ModalContainer>
    </S.Overlay>
  );
}
