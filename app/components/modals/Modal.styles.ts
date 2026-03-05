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
    padding: 40px;
    width: 100%;
    max-width: 500px;
    border: 1px solid #222
    color: #fff;
    border-radius: 8px;
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  h2 {
    color: white;
    font-size: 24px;
    font-weight: 600;
    text-align: left;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ModalBody = styled.div``;
