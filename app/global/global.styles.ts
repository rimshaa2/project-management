import { styled } from "styled-components";

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "100px",
};

export const COLORS = {
  bg: "#121212",
  border: "#262626",
  textMain: "#FFFFFF",
  textMuted: "#9CA3AF",
  accent: "#6366F1",
  hover: "rgba(255, 255, 255, 0.05)",
};
export const THEME = {
  bg: "#121212",
  surface: "#1A1A1A",
  surfaceLight: "#262626",
  accent: "#6366f1",
  accentHover: "#4f46e5",
  textMain: "#FFFFFF",
  textMuted: "#A1A1AA",
  textDim: "#71717A",
};

const size = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1200px",
};

export const maxdevice = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

export const mindevice = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed #333;
  border-radius: 12px;
  color: #888;

  .icon-wrapper {
    background: #1e1e1e;
    padding: 8px;
    border-radius: 50%;
    margin-bottom: 20px;
    color: #6366f1;
  }

  h3 {
    color: white;
    margin-bottom: 8px;
  }

  p {
    max-width: 300px;
    line-height: 1.5;
  }
`;

export const EmptyColumnText = styled.p`
  text-align: center;
  font-size: 0.85rem;
  color: #555;
  padding: 20px;
  border: 1px dashed #222;
  border-radius: 8px;
`;
