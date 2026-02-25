import styled from "styled-components";
import { THEME } from "./global/global.styles";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${THEME.bg};
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  position: relative;
`;

export const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    padding: 1rem;
    background: ${THEME.bg};
  }
`;
