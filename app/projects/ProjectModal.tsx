"use client";

import { useEffect } from "react";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { Project, Status } from "../types";
import { useForm } from "react-hook-form";
import FormInput from "../global/FormInput";
import { auth } from "@/lib/firebase";
import { styled } from "styled-components";
import { mindevice } from "../global/global.styles";

type ProjectModalProps = {
  onClose: () => void;
  onSuccess?: () => void;
  project?: any;
};

export default function ProjectModal({ onClose, project }: ProjectModalProps) {
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
    const currentUser = auth.currentUser;

    if (!currentUser) return;
    const projectData = {
      ...data,
      status: Status.PENDING,
      createdBy: currentUser.uid,
      members: [currentUser.uid],
      createdAt: new Date().toISOString(),
    };
    if (isEditMode && project?.id) {
      success = await updateProject(project.id, projectData);
    } else {
      success = await createProject(projectData);
    }

    if (success) {
      alert(isEditMode ? "Project updated" : "Project created");
      onClose();
    }
  };

  return (
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

      <Row>
        <FormInput
          name="clientName"
          label="Client Name"
          control={control}
          required
          rules={{ required: "Client name is required" }}
          placeholder="Client Name"
        />
      </Row>

      <Row>
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
      </Row>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "SAVING.." : isEditMode ? "UPDATE PROJECT" : "ADD PROJECT"}
      </SubmitButton>
    </form>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${mindevice.tablet} {
    flex-direction: row;
    gap: 20px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #1e1e1e;
  border: 1px solid #333;
  color: white;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background: #252525;
  }
`;
