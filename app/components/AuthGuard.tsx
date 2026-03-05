"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && pathname === "/") {
        router.replace("/dashboard");
      }

      if (!user && pathname.startsWith("/dashboard")) {
        router.replace("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
