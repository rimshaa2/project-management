"use client";
import * as S from "./SideBar.styles";
import { useEffect, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  Squares2X2Icon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ListBulletIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRole } from "../hooks/useRole";
import { doc, getDoc } from "firebase/firestore";

interface SidebarProps {
  $isMobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ $isMobileOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const currentUser = auth.currentUser;
  const pathname = usePathname();
  const { projects, tasks } = useProjects();
  const router = useRouter();
  const { isAdmin } = useRole();

  useEffect(() => {
    if ($isMobileOpen) {
      onClose();
    }
  }, [pathname]);

  useEffect(() => {
    const fetchRole = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    };
    fetchRole();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {$isMobileOpen && <S.MobileOverlay onClick={onClose} />}
      </AnimatePresence>
      <S.SidebarContainer
        $isCollapsed={isCollapsed}
        $isMobileOpen={$isMobileOpen}
      >
        <S.ToggleButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          $isCollapsed={isCollapsed}
        >
          {isCollapsed ? (
            <ChevronDoubleRightIcon className="size-6 text-gray-400" />
          ) : (
            <ChevronDoubleLeftIcon className="size-6 text-gray-400" />
          )}
        </S.ToggleButton>
        <Link
          href="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <S.NavItem
            $active={pathname === "/dashboard"}
            $isCollapsed={isCollapsed}
          >
            <Squares2X2Icon className="size-6 text-gray-400" />
            {!isCollapsed && <span>Dashboard</span>}
          </S.NavItem>
        </Link>
        <Link
          href="/tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <S.NavItem $active={pathname === "/tasks"} $isCollapsed={isCollapsed}>
            <CheckCircleIcon className="size-6 text-gray-400" />
            {!isCollapsed && <span>Tasks</span>}
          </S.NavItem>
        </Link>
        <S.DropdownWrapper>
          <S.NavItem
            $active={pathname.startsWith("/projects")}
            $isCollapsed={isCollapsed}
            onClick={() => !isCollapsed && setIsProjectOpen(!isProjectOpen)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ListBulletIcon className="size-6 text-gray-400" />
              {!isCollapsed && <span>Projects</span>}
            </div>
            {!isCollapsed && (
              <motion.div
                animate={{ rotate: isProjectOpen ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="size-5 text-gray-500" />
              </motion.div>
            )}
          </S.NavItem>
          <AnimatePresence>
            {!isCollapsed && isProjectOpen && (
              <motion.div
                initial={{ height: 0, opacity: 1 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <S.SubMenuList>
                  <Link href="/projects" style={{ textDecoration: "none" }}>
                    <S.ProjectItem $active={pathname === "/projects"}>
                      <span style={{ color: "white" }}>All Projects</span>
                    </S.ProjectItem>
                  </Link>
                  {projects.map((proj) => (
                    <Link
                      href={`/projects/${proj.id}`}
                      key={proj.id}
                      style={{ textDecoration: "none" }}
                    >
                      <S.ProjectItem
                        $active={pathname === `/projects/${proj.id}`}
                      >
                        <div className="project-title">
                          <CheckIcon className="size-4 text-gray-500" />
                          <span>{proj.name}</span>
                        </div>
                        <span className="badge">
                          {tasks.filter((t) => t.projectId === proj.id).length}
                        </span>
                      </S.ProjectItem>
                    </Link>
                  ))}
                </S.SubMenuList>
              </motion.div>
            )}
          </AnimatePresence>
        </S.DropdownWrapper>

        {isAdmin && (
          <Link
            href="/users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <S.NavItem
              $active={pathname === "/users"}
              $isCollapsed={isCollapsed}
            >
              <UserGroupIcon className="size-6 text-gray-400" />
              {!isCollapsed && <span>All Users</span>}
            </S.NavItem>
          </Link>
        )}
        <S.NavItem $active={pathname === "/issues"} $isCollapsed={isCollapsed}>
          <ExclamationTriangleIcon className="size-6 text-gray-400" />
          {!isCollapsed && <span>Issue</span>}
        </S.NavItem>
        <S.LogoutWrapper>
          <S.LogoutButton $isCollapsed={isCollapsed} onClick={handleLogout}>
            <ArrowLeftEndOnRectangleIcon className="size-6" />
            {!isCollapsed && <span>Logout</span>}
          </S.LogoutButton>
        </S.LogoutWrapper>
      </S.SidebarContainer>
    </>
  );
}
