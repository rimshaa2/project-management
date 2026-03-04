"use client";

import { useEffect } from "react";
import * as S from "./TaskModal.styles";
import { useCreateTask } from "../hooks/useCreateTask";
import { useProjects } from "../hooks/useProjects";
import { useForm, Controller } from "react-hook-form";
import { useUpdateTask } from "../hooks/useUpdateTask";
import {
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Status, Task } from "../types";
import FormInput from "../global/FormInput";
import { auth } from "@/lib/firebase";
import { useUsers } from "../hooks/useUsers";

interface TaskModalProps {
  onClose: () => void;
  task?: Partial<Task>;
}

export default function TaskModal({ onClose, task }: TaskModalProps) {
  const isEditMode = !!task;
  const { projects } = useProjects();
  const { createTask, loading } = useCreateTask();
  const { updateTask } = useUpdateTask();
  const { users } = useUsers();

  const { handleSubmit, control, reset, watch, setValue } = useForm<Task>({
    defaultValues: { status: Status.PENDING },
  });

  const startDate = watch("startDate");
  const currentStatus = watch("status");

  const statusConfig = {
    [Status.PENDING]: { icon: ClockIcon, color: "#f59e0b" },
    [Status.PROCESS]: { icon: ArrowPathIcon, color: "#6366f1" },
    [Status.COMPLETED]: { icon: CheckCircleIcon, color: "#10b981" },
  };

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task, reset]);

  const onSubmit = async (data: Task) => {
    let success;
    const currentUser = auth.currentUser;

    if (!currentUser) return;
    const taskData = {
      ...data,
      createdBy: currentUser.uid,
      createdAt: new Date().toISOString(),
    };
    if (isEditMode && task?.id) {
      success = await updateTask(task.id, taskData);
    } else {
      success = await createTask(taskData);
    }

    if (success) {
      alert(isEditMode ? "Task updated" : "Task created");
      onClose();
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <h2>{isEditMode ? "Edit Task" : "Add Task"}</h2>
          <S.LogoIcon>
            <button type="button" onClick={onClose}>
              <XMarkIcon />
            </button>
          </S.LogoIcon>
        </S.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            label="Task Name"
            control={control}
            required
            rules={{ required: "Task name is required" }}
            placeholder="Task name"
          />

          <FormInput
            name="description"
            label="Description"
            control={control}
            placeholder="Task description"
          />

          <S.Row>
            <S.FormGroup>
              <S.RequiredLabel>Assigned Project</S.RequiredLabel>
              <Controller
                name="projectId"
                control={control}
                rules={{ required: "Project selection is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <select
                      {...field}
                      disabled={!!task?.projectId && !task.id}
                      style={{
                        background: "#1e1e1e",
                        color: "white",
                        padding: "14px",
                        paddingRight: "40px",
                        borderRadius: "8px",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        backgroundSize: "16px",
                        border: error ? "1px solid #ff4d4d" : "1px solid #333",
                      }}
                    >
                      <option value="">Select a Project</option>
                      {projects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.name}
                        </option>
                      ))}
                    </select>
                    {error && (
                      <span
                        style={{
                          color: "#ff4d4d",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.RequiredLabel>Assigned To</S.RequiredLabel>
              <Controller
                name="assignedTo"
                control={control}
                rules={{ required: "Please assign this task to someone" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <select
                      {...field}
                      style={{
                        background: "#1e1e1e",
                        color: "white",
                        padding: "14px",
                        borderRadius: "8px",
                        appearance: "none",
                        border: error ? "1px solid #ff4d4d" : "1px solid #333",
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="">Select a team member</option>
                      {users.map((user) => (
                        <option key={user.uid} value={user.uid}>
                          {user.name} ({user.role})
                        </option>
                      ))}
                    </select>
                    {error && (
                      <span
                        style={{
                          color: "#ff4d4d",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {error.message}
                      </span>
                    )}
                  </>
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

          <S.StatusButtonGroup>
            {Object.entries(statusConfig).map(([s, config]) => {
              const Icon = config.icon;
              const isActive = currentStatus === s;

              return (
                <S.StatusItem
                  key={s}
                  $active={isActive}
                  $statusColor={config.color}
                  onClick={() => setValue("status", s as Status)}
                >
                  <Icon />
                  <p>{s}</p>
                </S.StatusItem>
              );
            })}
          </S.StatusButtonGroup>

          <S.SubmitButton type="submit" disabled={loading}>
            {loading ? "SAVING.." : isEditMode ? "UPDATE TASK" : "ADD TASK"}
          </S.SubmitButton>
        </form>
      </S.ModalContainer>
    </S.Overlay>
  );
}
