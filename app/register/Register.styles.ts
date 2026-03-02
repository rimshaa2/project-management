import styled from "styled-components";

export const Container = styled.div`
  background: #121212;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  border: 1px solid #222
  color: #fff;
  border-radius: 8px
  
`;

export const Title = styled.h3`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: left;
`;

export const RequiredLabel = styled.label`
  color: #ccc;
  margin-bottom: 8px;
  font-size: 0.85rem;
  display: block;

  &::after {
    content: " *";
    color: #ef4444; /* A bright red color */
    font-weight: bold;
  }
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

export const ErrorText = styled.span`
  color: #ff4d4d;
  font-size: 11px;
  margin-top: 4px;
  font-weight: 500;
`;
