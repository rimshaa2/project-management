"use client";

import styled from "styled-components";
import Login from "./Login";
import { useState } from "react";
import Register from "./register/page";

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <MainContainer>
      {isLogin ? <Login /> : <Register />}
      <ToggleButton onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Dont have an account? Sign up"
          : "Already have an account? Log in"}
      </ToggleButton>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  gap: 20px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
  &:hover {
    color: #fff;
  }
`;
