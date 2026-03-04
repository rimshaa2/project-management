"use client";
import { useState, useEffect } from "react";
import { db, auth } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  or,
} from "firebase/firestore";
import { useRole } from "../hooks/useRole";

export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, loading: roleLoading } = useRole();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (roleLoading || !currentUser) return;

    const projectQ = query(
      collection(db, "projects"),
      or(
        where("createdBy", "==", currentUser.uid),
        where("members", "array-contains", currentUser.uid),
      ),
      orderBy("name", "asc"),
    );

    const unsubscribeProjects = onSnapshot(projectQ, (snapshot) => {
      const projectData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        count: doc.data().count || 0,
      }));
      setProjects(projectData);
    });

    const taskQ = query(
      collection(db, "tasks"),
      or(
        where("assignedTo", "==", currentUser.uid),
        where("createdBy", "==", currentUser.uid),
      ),
      orderBy("name", "asc"),
    );

    const unsubscribeTasks = onSnapshot(
      taskQ,
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      },
    );

    return () => {
      unsubscribeProjects();
      unsubscribeTasks();
    };
  }, [isAdmin, roleLoading, currentUser]);

  return { projects, tasks, loading };
};
