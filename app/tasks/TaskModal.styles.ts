import styled from "styled-components";
import { mindevice } from "../global/global.styles";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #121212;
  width: 95%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 16px;
  position: relative;
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media ${mindevice.tablet} {
    width: 100%;
    padding: 32px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  label {
    font-size: 14px;
    color: #aaa;
  }
  input,
  textarea {
    background: #1e1e1e;
    border: 1px solid #333;
    padding: 12px;
    border-radius: 8px;
    color: white;
    outline: none;
    &:focus {
      border-color: #555;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${mindevice.tablet} {
    flex-direction: row;
    gap: 20px;
  }
`;

export const StatusButtonGroup = styled.div`
  display: flex;
  background: #1a1a1a;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid #333;
  width: 100%;

  @media (max-width: 400px) {
    flex-wrap: wrap;
  }
`;

export const StatusItem = styled.div<{
  $active: boolean;
  $statusColor: string;
}>`
  flex: 1;
  display: flex;
  min-width: 80px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  background: ${(props) =>
    props.$active ? `${props.$statusColor}20` : "transparent"};
  border: 1px solid
    ${(props) => (props.$active ? props.$statusColor : "transparent")};

  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => (props.$active ? props.$statusColor : "#666")};
    transition: color 0.2s ease;
  }

  p {
    font-size: 11px;
    @media ${mindevice.tablet} {
      font-size: 13px;
    }
  }

  &:hover {
    background: ${(props) =>
      props.$active ? `${props.$statusColor}30` : "#252525"};

    p {
      color: #fff;
    }
    svg {
      color: ${(props) => props.$statusColor};
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #1e1e1e;
  border: 1px solid #333;
  color: white;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background: #252525;
  }
`;

export const DateInputWrapper = styled.div`
  position: relative;
  input {
    width: 100%;
    padding-left: 40px;
  }
  .icon {
    position: absolute;
    left: 12px;
    top: 12px;
    color: #888;
  }
`;

export const FooterInfo = styled.div`
  display: flex;
  gap: 10px;
`;

export const UserBadge = styled.div`
  background: #1e1e1e;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #ccc;
`;

export const HelperText = styled.p`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
`;

export const RequiredLabel = styled.label`
  color: #ccc;
  font-size: 0.85rem;
  display: block;

  &::after {
    content: " *";
    color: #ef4444;
    font-weight: bold;
  }
`;

export const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #666;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: #2a2a2a;
    color: #fff;
  }
`;
