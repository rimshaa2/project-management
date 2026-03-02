"use client";
import { useEffect } from "react";
import * as S from "./TaskModal.styles";
import { useCreateTask } from "../hooks/useCreateTask";
import { useProjects } from "../hooks/useProjects";
import { useForm } from "react-hook-form";
import { useUpdateTask } from "../hooks/useUpdateTask";
import {
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Status, Task } from "../types";

interface TaskModalProps {
  onClose: () => void;
  task?: Task;
}

export default function TaskModal({ onClose, task }: TaskModalProps) {
  const isEditMode = !!task;
  const { projects } = useProjects();
  const { createTask, loading } = useCreateTask();
  const { updateTask } = useUpdateTask();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Task>({
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
    if (isEditMode && task?.id) {
      success = await updateTask(task.id, data);
    } else {
      success = await createTask(data);
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
          <S.FormGroup>
            <S.RequiredLabel>Name</S.RequiredLabel>
            <input
              {...register("name", { required: "Task name is required" })}
              placeholder="Task name"
            />
            {errors.name && (
              <span style={{ color: "#ff4d4d", fontSize: "12px" }}>
                {errors.name.message}
              </span>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>Description</label>
            <input
              {...register("description")}
              placeholder="Task description"
            />
          </S.FormGroup>

          <S.Row>
            <S.FormGroup>
              <S.RequiredLabel>Assigned Project</S.RequiredLabel>
              <select
                {...register("projectId", {
                  required: "Project selection is required",
                })}
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
                }}
              >
                <option value="">Select a Project</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <span style={{ color: "#ff4d4d", fontSize: "12px" }}>
                  {errors.projectId.message}
                </span>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.RequiredLabel>Assigned To</S.RequiredLabel>
              <input
                type="text"
                {...register("assignedTo", {
                  required: "Assignee is required",
                })}
              />
              {errors.assignedTo && (
                <span style={{ color: "#ff4d4d", fontSize: "12px" }}>
                  {errors.assignedTo.message}
                </span>
              )}
            </S.FormGroup>
          </S.Row>

          <S.Row>
            <S.FormGroup>
              <label>Start Date</label>
              <S.DateInputWrapper>
                <input type="date" {...register("startDate")} />
              </S.DateInputWrapper>
            </S.FormGroup>

            <S.FormGroup>
              <label>End Date</label>
              <S.DateInputWrapper>
                <input
                  type="date"
                  {...register("endDate", {
                    validate: (value) =>
                      !startDate ||
                      !value ||
                      new Date(value) >= new Date(startDate) ||
                      "End date cannot be earlier than start date",
                  })}
                />
              </S.DateInputWrapper>
              {errors.endDate && (
                <span style={{ color: "#ff4d4d", fontSize: "12px" }}>
                  {errors.endDate.message}
                </span>
              )}
            </S.FormGroup>
          </S.Row>

          <S.StatusGrid>
            {Object.entries(statusConfig).map(([s, Config]) => {
              const Icon = Config.icon;
              const isActive = currentStatus === s;
              return (
                <S.StatusCard
                  key={s}
                  $active={isActive}
                  $statusColor={Config.color}
                  onClick={() => setValue("status", s as Status)}
                >
                  <Icon
                    className="size-5"
                    style={{
                      color: isActive ? "#fff" : Config.color,
                    }}
                  />
                  <p>{s.toUpperCase()}</p>
                </S.StatusCard>
              );
            })}
          </S.StatusGrid>

          <S.SubmitButton type="submit" disabled={loading}>
            {loading ? "SAVING.." : isEditMode ? "UPDATE TASK" : "ADD TASK"}
          </S.SubmitButton>
        </form>
      </S.ModalContainer>
    </S.Overlay>
  );
}
