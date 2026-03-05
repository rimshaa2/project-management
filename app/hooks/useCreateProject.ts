"use client";
import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Project } from "../types";

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createProject = async (data: Omit<Project, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in");

      const projectRef = collection(db, "projects");

      await addDoc(projectRef, {
        ...data,
        createdAt: new Date(),
      });
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { createProject, loading, error };
};
