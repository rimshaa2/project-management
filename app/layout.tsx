"use client";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import { Inter } from "next/font/google";
import Sidebar from "./sidebar/page";
import * as S from "./layout.styles";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <html lang="en" className={inter.className}>
      <body>
        <StyledComponentsRegistry>
          <S.LayoutWrapper>
            <Sidebar
              $isMobileOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
            <S.MainContent>
              <S.MobileHeader>
                <button onClick={() => setIsMobileMenuOpen(true)}>
                  <Bars3Icon className="size-5 text-white" />
                </button>
              </S.MobileHeader>
              {children}
              <div id="chart-portal-target"></div>
            </S.MainContent>
          </S.LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
