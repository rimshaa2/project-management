import { mindevice } from "@/app/global/global.styles";
import styled from "styled-components";

export const KanbanBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;

  @media ${mindevice.laptop} {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    padding: 20px;
  }
`;

export const Column = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  min-width: 300px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #333;
`;

export const ColumnHeader = styled.div`
  padding: 14px;
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
    border-radius: 4px;
    fontsize: 12px;
  }
`;

export const TaskContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const TaskCard = styled.div`
  background: #252525;
  border: 1px solid #333;
  padding: 14px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    color: #fff;
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
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;

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
    }
  }
`;
