import styled from "styled-components";

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
  width: 90%;
  max-width: 600px;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #333;
  color: #fff;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
  margin-bottom: 24px;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  flex: 1;
  label {
    font-size: 14px;
    color: #aaa;
    margin-bottom: 8px;
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
  gap: 20px;
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
`;

export const StatusCard = styled.div<{
  $active: boolean;
  $statusColor: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: ${(props) => (props.$active ? props.$statusColor : "#1e1e1e")};
  border: 1px solid ${(props) => (props.$active ? props.$statusColor : "#333")};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  p {
    font-size: 11px;
    font-weight: 700;
    margin: 0;
    color: ${(props) => (props.$active ? "#fff" : "#888")};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    border-color: ${(props) => props.$statusColor};
    transform: translateY(-2px);
  }

  ${(props) =>
    props.$active &&
    `
    box-shadow: 0 4px 15px ${props.$statusColor}44; 
  `}
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
  margin-top: 20px;
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
  margin-top: 20px;
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
  margin-top: 15px;
  line-height: 1.4;
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
