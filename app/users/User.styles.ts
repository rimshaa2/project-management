import styled from "styled-components";
import { THEME, SPACING, mindevice } from "../global/global.styles";

export const PageContainer = styled.div`
  padding: ${SPACING.xl};
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  @media ${mindevice.laptop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  gap: ${SPACING.lg};
  @media ${mindevice.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
`;

export const UserCard = styled.div`
  background: ${THEME.surface};
  border: 1px solid ${THEME.surfaceLight};
  padding: ${SPACING.lg};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: ${THEME.accent};
  }
  h4 {
    font-size: 1rem;
    color: #fff;
  }

  p {
    font-size: 0.85rem;
    color: ${THEME.textDim};
  }
  svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
`;

export const RoleBadge = styled.span<{ $role: string }>`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  max-width: max-content;
  text-align: center;
  border-radius: 4px;
  letter-spacing: 0.05rem;
  background: ${(props) => (props.$role === "admin" ? "#4f46e533" : "#3f3f46")};
  color: ${(props) => (props.$role === "admin" ? "#818cf8" : "#a1a1aa")};
  border: 1px solid
    ${(props) => (props.$role === "admin" ? "#4f46e5" : "#52525b")};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: ${THEME.surface};
  border: 1px solid ${THEME.surfaceLight};
  padding: ${SPACING.xl};
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.85rem;
    color: ${THEME.textDim};
    font-weight: 500;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    font-size: 1rem;
    color: ${THEME.textMain};
  }

  p {
    font-size: 0.85rem;
    color: ${THEME.textMuted};
  }
`;

export const StyledInput = styled.input`
  background: #1a1a1a;
  border: 1px solid #333;
  padding: 12px;
  border-radius: 8px;
  color: ${THEME.textMain};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${THEME.accent};
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #000;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.md};
  flex-direction: column-reverse;

  @media ${mindevice.mobile} {
    flex-direction: row;
    justify-content: flex-end;
    text: center;
  }
  button {
    width: 100%;
    @media ${mindevice.mobile} {
      width: auto;
    }
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  border: 1px solid #333;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #ffffff11;
  }
`;

export const SubmitButton = styled(PrimaryButton)`
  background: ${THEME.textMain};
  width: auto;
  padding: 10px 18px;

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

export const ActionGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button<{ $variant?: "danger" | "default" }>`
  background: transparent;
  border: 1px solid #333;
  color: ${(props) => (props.$variant === "danger" ? "#ff4d4d" : "#9ca3af")};
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.$variant === "danger" ? "#ff4d4d22" : "#ffffff11"};
    border-color: ${(props) =>
      props.$variant === "danger" ? "#ff4d4d" : "#666"};
  }
`;

export const DisabledPlacholder = styled.div`
  padding: 6px;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
`;
