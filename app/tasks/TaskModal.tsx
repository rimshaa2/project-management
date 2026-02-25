import { useEffect, useState } from "react";
import * as S from "./TaskModal.styles";
import { useCreateTask } from "../hooks/useCreateTask";
import { useProjects } from "../hooks/useProjects";
import { useUpdateTask } from "../hooks/useUpdateTask";
import {
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Task } from "../types";

interface TaskModalProps {
  onClose: () => void;
  task?: any;
}

export default function TaskModal({ onClose, task }: TaskModalProps) {
  const isEditMode = !!task;
  const { projects } = useProjects();
  const { createTask, loading } = useCreateTask();
  const { updateTask } = useUpdateTask();
  const statusConfig = {
    pending: { icon: ClockIcon, color: "#f59e0b" },
    process: { icon: ArrowPathIcon, color: "#6366f1" },
    completed: { icon: CheckCircleIcon, color: "#10b981" },
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectId: "",
    project: "",
    assignedTo: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || "",
        description: task.description || "",
        projectId: task.projectId || "",
        project: task.project || "",
        assignedTo: task.assignedTo || "",
        startDate: task.startDate || "",
        endDate: task.endDate || "",
        status: task.status || "pending",
      });
    }
  }, [task]);

  const handleSubmit = async () => {
    const projectId = formData.projectId;

    if (!projectId) {
      alert("Error: Project ID not found.");
      return;
    }

    const taskPayload = {
      name: formData.name,
      description: formData.description,
      status: formData.status as Task["status"],
      projectId: projectId,
      assignedTo: formData.assignedTo,
      endDate: formData.endDate,
      project: formData.project,
    };

    const success = isEditMode
      ? await updateTask(task.id, taskPayload)
      : await createTask(taskPayload);
    if (success) {
      alert(isEditMode ? "Task updated" : "Task Created");
      onClose();
    }
  };
  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <h2>Add Task</h2>
          <S.LogoIcon>
            <button onClick={onClose}>
              <XMarkIcon />
            </button>
          </S.LogoIcon>
        </S.Header>
        <S.FormGroup>
          <label>Name</label>
          <input
            type="text"
            placeholder="Task name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          ></input>
        </S.FormGroup>
        <S.FormGroup>
          <label>Description</label>
          <input
            type="text"
            placeholder="Task description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></input>
        </S.FormGroup>
        <S.Row>
          <S.FormGroup>
            <label>Assigned Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => {
                const selectedProject = projects.find(
                  (p) => p.id === e.target.value,
                );
                setFormData({
                  ...formData,
                  projectId: e.target.value,
                  project: selectedProject?.name || "",
                });
              }}
              style={{
                background: "#1e1e1e",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <option value="">Select a Project</option>
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.name}
                </option>
              ))}
            </select>
          </S.FormGroup>
          <S.FormGroup>
            <label>Assigned To</label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({ ...formData, assignedTo: e.target.value })
              }
            ></input>
          </S.FormGroup>
        </S.Row>
        <S.Row>
          <S.FormGroup>
            <label>Start Date</label>
            <S.DateInputWrapper>
              <span></span>
              <input
                type="text"
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
                type="text"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              ></input>
            </S.DateInputWrapper>
          </S.FormGroup>
        </S.Row>
        <S.StatusGrid>
          {Object.keys(statusConfig).map((s) => {
            const Config = statusConfig[s as keyof typeof statusConfig];
            const Icon = Config.icon;
            return (
              <S.StatusCard
                key={s}
                $active={formData.status === s}
                $statusColor={Config.color}
                onClick={() =>
                  setFormData({
                    ...formData,
                    status: s,
                  })
                }
              >
                <Icon
                  className="size-5"
                  style={{
                    color: formData.status === s ? "#fff" : Config.color,
                  }}
                />
                <p>{s.toUpperCase()}</p>
              </S.StatusCard>
            );
          })}
        </S.StatusGrid>
        <S.SubmitButton onClick={handleSubmit} disabled={loading}>
          {loading ? "SAVING.." : isEditMode ? "UPDATE TASK" : "ADD TASK"}
        </S.SubmitButton>
      </S.ModalContainer>
    </S.Overlay>
  );
}
