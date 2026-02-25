export enum Status {
  Pending = "pending",
  Process = "process",
  Completed = "completed",
}

export type Task = {
  id?: string;
  name: string;
  description: string;
  status: Status;
  projectId: string;
  assignedTo: string;
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
