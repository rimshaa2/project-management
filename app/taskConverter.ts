import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { Task } from "./types";

export const taskConverter = {
  toFirestore(task: Task): DocumentData {
    return {
      name: task.name,
      description: task.description,
      status: task.status,
      projectId: task.projectId,
      assignedTo: task.assignedTo,
      endDate: task.endDate,
      updatedAt: task.updatedAt || new Date(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Task {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      name: data.name,
      description: data.description,
      status: data.status,
      projectId: data.projectId,
      assignedTo: data.assignedTo,
      endDate: data.endDate,
    };
  },
};
