import styled from "styled-components";
import { COLORS, SPACING } from "../global/global.styles";

interface SideBarProps {
  $isCollapsed: boolean;
  $isMobileOpen: boolean;
}

export const SidebarContainer = styled.aside<SideBarProps>`
  position: relative;
  width: ${(props) => (props.$isCollapsed ? "72px" : "264px")};
  min-width: ${(props) => (props.$isCollapsed ? "72px" : "264px")};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  background: ${COLORS.bg};
  height: 100vh;
  padding: ${SPACING.lg} 0;
  border-right: 1px solid ${COLORS.border};
  overflow-x: hidden;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    width: ${(props) => (props.$isCollapsed ? "72px" : "264px")};
    height: 100vh;

    transform: ${({ $isMobileOpen }) =>
      $isMobileOpen ? "translateX(0)" : "translateX(-100%)"};

    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${({ $isMobileOpen }) =>
      $isMobileOpen ? "20px 0 50px rgba(0, 0, 0, 0.5)" : "none"};

    background: ${COLORS.bg};
    border-right: 1px solid ${COLORS.border};
  }
`;

export const MobileOverlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 999;
  }
`;

export const ToggleButton = styled.button<{ $isCollapsed: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${SPACING.sm};
  margin-right: ${SPACING.md};
  align-self: flex-end;
  color: ${COLORS.textMuted};
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    display: none;
  }
  &:hover {
    color: ${COLORS.textMain};
  }
`;

export const NavItem = styled.div<{ $active?: boolean; $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  gap: ${SPACING.md};
  cursor: pointer;
  height: 48px;
  margin: ${SPACING.xs} ${SPACING.sm};
  padding: ${(props) => (props.$isCollapsed ? "0" : `0 ${SPACING.lg}`)};
  justify-content: ${(props) => (props.$isCollapsed ? "center" : "flex-start")};

  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.08)" : "transparent"};
  transition: all 0.2s ease;
  border-radius: 8px;

  &::before {
    content: "";
    position: absolute;
    left: -8px;
    height: 20px;
    width: 4px;
    background: ${COLORS.accent};
    border-radius: 0 4px 4px 0;
    opacity: ${(props) => (props.$active && !props.$isCollapsed ? "1" : "0")};
  }

  span {
    color: ${(props) => (props.$active ? COLORS.textMain : COLORS.textMuted)};
    font-size: 16px;
    font-weight: ${(props) => (props.$active ? "600" : "400")};
    display: ${(props) => (props.$isCollapsed ? "none" : "block")};
  }

  svg {
    color: ${(props) => (props.$active ? COLORS.textMain : COLORS.textMuted)};
    min-wdith: 20px;
  }

  &:hover {
    background: ${COLORS.hover};
    svg,
    span {
      color: ${COLORS.textMain};
    }
  }
`;

export const SectionLabel = styled.div<SideBarProps>`
  color: #525252;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: ${SPACING.lg} ${SPACING.lg} ${SPACING.sm} ${SPACING.lg};
  display: ${(props) => (props.$isCollapsed ? "none" : "block")};
`;

export const AddButton = styled.button`
  margin-top: auto;
  background: #1a1a1a;
  border: 1px solid #333;
  color: white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  &:hover {
    background: #222;
  }
`;

export const DropdownWrapper = styled.div`
  width: 100%;
`;

export const SubMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${COLORS.border};
  padding-left: ${SPACING.md};
  margin-left: ${SPACING.xl};
  gap: ${SPACING.xs};
`;

export const ProjectItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.$active ? COLORS.hover : "transparent")};

  .project-title {
    display: flex;
    align-items: center;
    gap: ${SPACING.sm};
    overflow: hidden;

    span {
      font-size: 13px;
      color: ${(props) => (props.$active ? COLORS.textMain : COLORS.textMuted)};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .badge {
    font-size: 11px;
    background: #252525;
    padding: 2px 6px;
    border-radius: 4px;
    color: #71717a;
  }

  &:hover {
    background: ${COLORS.hover};
    .project-title span {
      color: ${COLORS.textMain};
    }
  }
`;
