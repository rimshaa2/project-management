import RegisterForm from "@/app/register/page";
import UnifiedModal from "./UnifiedModal";
import Login from "@/app/Login";
import ProjectModal from "../../projects/ProjectModal";
import TaskModal from "@/app/tasks/TaskModal";

type ModalManagerProps = {
  type: "login" | "register" | "project" | "task" | null;
  data?: any;
  onClose: () => void;
};

export default function ModalManager({
  type,
  data,
  onClose,
}: ModalManagerProps) {
  if (!type) return null;

  const titles = {
    login: "Welcome Back",
    register: "Create Account",
    project: data ? "Edit Project" : "New Project",
    task: data ? "Edit Task" : "New Task",
  };

  return (
    <UnifiedModal isOpen={!!type} onClose={onClose} title={titles[type]}>
      {type === "login" && <Login onSuccess={onClose} />}
      {type === "register" && <RegisterForm onSuccess={onClose} />}
      {type === "project" && <ProjectModal project={data} onClose={onClose} />}
      {type === "task" && <TaskModal task={data} onClose={onClose} />}
    </UnifiedModal>
  );
}
