import styled from "styled-components";

export const KanbanBoard = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-top: 20px;
  overflow-x: auto;
  height: calc(100vh -180px);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
  }
`;

export const Column = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  min-width: 300px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #333;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const ColumnHeader = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  h3 {
    font-size: 14px;
    color: #888;
    letter-spacing: 1px;
  }
  span {
    background: #333;
    padding: 2px 8px;
    borderradius: 4px;
    fontsize: 12px;
  }
`;

export const TaskContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

export const TaskCard = styled.div`
  background: #252525;
  border: 1px solid #333;
  padding: 15px;
  border-radius: 8px;
  h4 {
    color: #fff;
    margin-bottom: 5px;
  }
  p {
    color: #888;
    font-size: 12px;
    line-height: 1.4;
  }
`;

export const StatusSelect = styled.select<{ $status: string }>`
  background: #1a1a1a;
  color: ${(props) => {
    if (props.$status === "completed") return "#10b981";
    if (props.$status === "process") return "#6366f1";
    return "#f59e0b";
  }};
  border: 1px solid #333;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:hover {
    background: #333;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

export const TaskFooter = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .meta {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-size: 10px;
      color: #555;
    }
    p {
      font-size: 11px;
      color: #888;
      margin: 0;
    }
  }
`;
