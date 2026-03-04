import { auth } from "../lib/firebase";

export enum Status {
  PENDING = "pending",
  PROCESS = "process",
  COMPLETED = "Completed",
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
  createdBy: string;
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
  createdBy: string;
};

export type Project = {
  id?: string;
  name: string;
  description: string;
  clientName: string;
  status?: Status;
  startDate: string;
  endDate: string;
  createdAt?: any;
  updatedAt?: any;
  createdBy: string;
  members: string[];
};
