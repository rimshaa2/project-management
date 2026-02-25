import styled from "styled-components";

export const Container = styled.div`
  background: #121212;
  padding: 40px;
  boredr-radius 24px;
  width: 100%;
  max-width: 500px;
  border: 1px solid #222
  color: #fff;
  border-radius: 10px
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;
  label {
    display: block;
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 8px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
  color: white;
  outline: none;
  &:focus {
    border-color: #555;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: #222;
  color: white;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1rem;
  &:hover {
    background: #2a2a2a;
  }
`;
