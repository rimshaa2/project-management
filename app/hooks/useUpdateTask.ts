import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Task } from "../types";
import { taskConverter } from "../taskConverter";

export const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = async (id: string, data: Partial<Task>) => {
    setLoading(true);
    setError(null);
    try {
      const projectRef = doc(db, "tasks", id).withConverter(taskConverter);
      await updateDoc(projectRef, {
        ...data,
        updatedAt: new Date(),
      });
      console.log(data);
      setLoading(false);
      return true;
    } catch (err: any) {
      console.error("Update Error:", err.message);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return { updateTask, loading, error };
};
