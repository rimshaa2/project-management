import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

export const useActivities = () => {
  const [activities, setActivites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      orderBy("createdAt", "desc"),
      limit(5),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activityData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivites(activityData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { activities, loading };
};
