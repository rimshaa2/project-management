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
  justify-content: space-between;
  margin-bottom: 30px;
  h2 {
    font-size: 24px;
    font-weight: 500;
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

export const StatusCard = styled.div<{ $active?: boolean }>`
  background: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid ${(props) => (props.$active ? "#fff" : "#333")};
  cursor: pointer;
  transition: all 0.2s;
  p {
    margin-top: 10px;
    font-size: 14px;
    color: ${(props) => (props.$active ? "#fff" : "#888")};
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
  margin-top: 20px;
  &:hover {
    background: #252525;
  }
`;

export const DateInputWrapper = styled.div`
  input[type="date] {
    color-scheme: dark;
    width: 100%;
    padding: 10px;
    background: #1e1e1e;
    border: 1px solid #333;
    border-radius: 8px;
    color: white;
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(1); 
    }

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
  font-size: 11px;
  color: #666;
  margin-top: 15px;
  line-height: 1.4;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

export const ProjectCard = styled.div`
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
  }
`;

export const Dscription = styled.div`
  font-size: 13px;
  color: #888;
  line-height: 1.5;
`;

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
`;

export const StatsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #252525;
  border: 1px solid #333;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  color: #aaa;
`;

export const Badge = styled(StatsItem)<{ $type: "active" | "inactive" }>`
  color: ${(props) => (props.$type === "active" ? "#fff" : "#888")};

  svg {
    color: ${(props) => (props.$type === "active" ? "#4caf50" : "#888")};
  }
`;

export const ActionMenu = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  background: #252525;
  border: 1px solid #333;
  border-radius: 8px;
  width: 120px;
  z-index: 10;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

  button {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: none;
    color: #ccc;
    text-align: left;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      background: #333;
      color: white;
    }
    &.delete {
      color: #ff4d4d;
      &:hover {
        background: #451a1a;
      }
    }
  }
`;
