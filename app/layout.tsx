"use client";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import { Inter } from "next/font/google";
import Sidebar from "./sidebar/page";
import * as S from "./layout.styles";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import AuthGuard from "./components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/";
  const isAuthPage = pathname === "/" || pathname === "/register";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && pathname !== "/") {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <StyledComponentsRegistry>
          <S.LayoutWrapper>
            {!isLoginPage && !isAuthPage && (
              <Sidebar
                $isMobileOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            )}
            <S.MainContent>
              <S.MobileHeader>
                <button onClick={() => setIsMobileMenuOpen(true)}>
                  <Bars3Icon className="size-5 text-white" />
                </button>
              </S.MobileHeader>
              <AuthGuard>{children}</AuthGuard>
              <div id="chart-portal-target"></div>
            </S.MainContent>
          </S.LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
