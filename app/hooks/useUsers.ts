import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const deleteUser = async (uid: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This cannot be undone.",
      )
    ) {
      try {
        await deleteDoc(doc(db, "users", uid));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({ ...doc.data() }));
      setUsers(userList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { users, loading, deleteUser };
}
