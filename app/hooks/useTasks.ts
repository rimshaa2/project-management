import {
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useRole } from "./useRole";

export const useTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, loading: roleLoading } = useRole();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (roleLoading || !currentUser) return;

    const q = query(
      collection(db, "tasks"),
      or(
        where("assignedTo", "==", currentUser.uid),
        where("createdBy", "==", currentUser.uid),
      ),
      orderBy("name", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore Task Error:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [isAdmin, roleLoading, currentUser]);

  return { tasks, loading };
};
