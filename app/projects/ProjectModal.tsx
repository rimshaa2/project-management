"use client";

import { useEffect } from "react";
import * as S from "./ProjectModal.styles";
import * as T from "../tasks/TaskModal.styles";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { Project, Status } from "../types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../global/FormInput";

interface TaskModalProps {
  onClose: () => void;
  project?: any;
}

export default function TaskModal({ onClose, project }: TaskModalProps) {
  const isEditMode = !!project;
  const { updateProject } = useUpdateProject();
  const { createProject, loading } = useCreateProject();

  const { control, handleSubmit, reset, watch } = useForm<Project>({
    defaultValues: { status: Status.PENDING },
  });

  const startDate = watch("startDate");

  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [project, reset]);

  const onSubmit = async (data: Project) => {
    let success;
    if (isEditMode && project?.id) {
      success = await updateProject(project.id, data);
    } else {
      success = await createProject(data);
    }

    if (success) {
      alert(isEditMode ? "Project updated" : "Project created");
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            label="Project Name"
            control={control}
            required
            rules={{ required: "Project name is required" }}
            placeholder="Project name"
          />

          <FormInput
            name="description"
            label="Description"
            control={control}
            placeholder="Project description"
          />

          <S.Row>
            <FormInput
              name="clientName"
              label="Client Name"
              control={control}
              required
              rules={{ required: "Client name is required" }}
            />

            <S.FormGroup>
              <label>Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    style={{
                      padding: "16px",
                      background: "#1e1e1e",
                      color: "white",
                      borderRadius: "8px",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="process">In Process</option>
                    <option value="completed">Completed</option>
                  </select>
                )}
              />
            </S.FormGroup>
          </S.Row>

          <S.Row>
            <FormInput
              name="startDate"
              label="Start Date"
              type="date"
              control={control}
            />

            <FormInput
              name="endDate"
              label="End Date"
              type="date"
              control={control}
              rules={{
                validate: (value: string) =>
                  !startDate ||
                  !value ||
                  new Date(value) >= new Date(startDate) ||
                  "End date cannot be earlier than start date",
              }}
            />
          </S.Row>

          <S.SubmitButton type="submit" disabled={loading}>
            {loading
              ? "SAVING.."
              : isEditMode
                ? "UPDATE PROJECT"
                : "ADD PROJECT"}
          </S.SubmitButton>
        </form>
      </S.ModalContainer>
    </S.Overlay>
  );
}
