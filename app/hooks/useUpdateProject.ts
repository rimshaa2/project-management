import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Project } from "../types";

export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (id: string, data: Partial<Project>) => {
    setLoading(true);
    setError(null);
    try {
      const projectRef = doc(db, "projects", id);
      await updateDoc(projectRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      setLoading(false);
      return true;
    } catch (err: any) {
      console.error("Update Error:", err.message);
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return { updateProject, loading, error };
};
