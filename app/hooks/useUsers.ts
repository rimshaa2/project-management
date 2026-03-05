import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

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
    if (!currentUser) return;

    const q = query(
      collection(db, "users"),
      where("createdBy", "==", currentUser.uid),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data() })));
        setLoading(false);
      },
      (error) => {
        console.error("USER FETCH ERROR:", error.code, error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [currentUser]);

  return { users, loading, deleteUser };
}
