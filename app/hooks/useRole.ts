import { useEffect, useState } from "react";
import { UserRole } from "../types";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useRole() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        console.log(userDoc.data());

        if (userDoc.exists()) {
          setRole(userDoc.data().role as UserRole);
        }
      }
      setLoading(false);
    };

    fetchRole();
  }, [auth.currentUser]);
  return { role, isAdmin: role === UserRole.ADMIN, loading };
}
