import styled from "styled-components";
import { THEME, SPACING, mindevice, maxdevice } from "../global/global.styles";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 12px;
  min-height: 100vh;
  width: 100%;
  background: ${THEME.bg};
  overflow-x: hidden;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 24px;

  @media ${mindevice.tablet} {
    flex-direction: row;
  }
`;

export const DashboardContainer = styled.div`
  background: #${THEME.bg};
  color: ${THEME.textMain};
  flex: 1;
`;

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

export const PrimaryButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${THEME.accent};
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);

  &:hover {
    background-color: ${THEME.accentHover};
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    stroke-width: 2.5;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${SPACING.xl};

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: ${SPACING.lg};
  }
`;

export const ActivityCard = styled.div`
  background: ${THEME.surface};
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid transparent;
  transition: border-color 0.2s ease;
  &:hover {
    border-color: ${THEME.surfaceLight};
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    padding: ${SPACING.md};
  }
`;

export const IconWrapper = styled.div<{ $status?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${THEME.surfaceLight};
  border: 1px solid #333;
  color: ${(props) =>
    props.$status === "completed" ? "#4caf50" : THEME.textMuted};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
  }
  p {
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
  }
  button {
    background: #1e1e1e;
    border: none;
    color: #aaa;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    margin-top: 20px;
  }
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActivityInfo = styled.div`
  flex: 1;
  h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  p {
    font-size: 12px;
    color: #888;
  }
`;

export const ActivityMeta = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 11px;
  color: #aaa;

  @media ${maxdevice.tablet} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const MoreButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

export const StatsSidebar = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
`;

export const ChartCard = styled.div`
  background: ${THEME.surface};
  border: 1px solid ${THEME.surfaceLight};
  padding: ${SPACING.lg};
  border-radius: 8px;
  min-height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: all 0.23s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    border-color: ${THEME.surfaceLight}cc;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }

  h4 {
    margin-bottom: ${SPACING.md};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: ${THEME.textDim};
    text-align: center;
    opacity: 0.8;
  }

  @media (max-width: 1050px) {
    min-height: 280px;
    padding: ${SPACING.md};
    margin-left: 16px;
    margin-bottom: 4px;
  }
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;

export const ChartCenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }
  span {
    font-size: 10px;
    color: #71717a;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    background: #1a1a1a;
    border-bottom: 1px solid #262626;
    position: sticky;
    top: 0;
  }
`;

export const Hamburger = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
`;
