"use client";

import { useEffect } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import { useProjects } from "../hooks/useProjects";
import { useForm, Controller } from "react-hook-form";
import { useUpdateTask } from "../hooks/useUpdateTask";
import {
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Status, Task } from "../types";
import FormInput from "../global/FormInput";
import { auth } from "@/lib/firebase";
import { useUsers } from "../hooks/useUsers";
import { styled } from "styled-components";
import { mindevice } from "../global/global.styles";

interface TaskModalProps {
  onClose: () => void;
  task?: Partial<Task>;
}

export default function TaskModal({ onClose, task }: TaskModalProps) {
  const isEditMode = !!task?.id;
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

      <Row>
        <FormGroup>
          <RequiredLabel>Assigned Project</RequiredLabel>
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
                    }}
                  >
                    {error.message}
                  </span>
                )}
              </>
            )}
          />
        </FormGroup>

        <FormGroup>
          <RequiredLabel>Assigned To</RequiredLabel>
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
                    }}
                  >
                    {error.message}
                  </span>
                )}
              </>
            )}
          />
        </FormGroup>
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

      <StatusButtonGroup>
        {Object.entries(statusConfig).map(([s, config]) => {
          const Icon = config.icon;
          const isActive = currentStatus === s;

          return (
            <StatusItem
              key={s}
              $active={isActive}
              $statusColor={config.color}
              onClick={() => setValue("status", s as Status)}
            >
              <Icon />
              <p>{s}</p>
            </StatusItem>
          );
        })}
      </StatusButtonGroup>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "SAVING.." : isEditMode ? "UPDATE TASK" : "ADD TASK"}
      </SubmitButton>
    </form>
  );
}

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  label {
    font-size: 14px;
    color: #aaa;
  }
  input,
  textarea {
    background: #1e1e1e;
    border: 1px solid #333;
    padding: 12px;
    border-radius: 8px;
    color: white;
    outline: none;
    &:focus {
      border-color: #555;
    }
  }
`;

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

const StatusButtonGroup = styled.div`
  display: flex;
  background: #1a1a1a;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid #333;
  width: 100%;

  @media (max-width: 400px) {
    flex-wrap: wrap;
  }
`;

const StatusItem = styled.div<{
  $active: boolean;
  $statusColor: string;
}>`
  flex: 1;
  display: flex;
  min-width: 80px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  background: ${(props) =>
    props.$active ? `${props.$statusColor}20` : "transparent"};
  border: 1px solid
    ${(props) => (props.$active ? props.$statusColor : "transparent")};

  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => (props.$active ? props.$statusColor : "#666")};
    transition: color 0.2s ease;
  }

  p {
    font-size: 11px;
    @media ${mindevice.tablet} {
      font-size: 13px;
    }
  }

  &:hover {
    background: ${(props) =>
      props.$active ? `${props.$statusColor}30` : "#252525"};

    p {
      color: #fff;
    }
    svg {
      color: ${(props) => props.$statusColor};
    }
  }
`;

const RequiredLabel = styled.label`
  color: #ccc;
  font-size: 0.85rem;
  display: block;

  &::after {
    content: " *";
    color: #ef4444;
    font-weight: bold;
  }
`;
