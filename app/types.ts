export enum Status {
  PENDING = "pending",
  PROCESS = "process",
  COMPLETED = "completed",
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type UserProfile = {
  uid: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
};

export type Task = {
  id?: string;
  name: string;
  description: string;
  status: Status;
  projectId: string;
  assignedTo: string;
  startDate: string;
  endDate: string;
  updatedAt?: any;
};

export type Project = {
  id?: string;
  name: string;
  description: string;
  clientName: string;
  status: Status;
  startDate: string;
  endDate: string;
  createdAt?: any;
  updatedAt?: any;
};
