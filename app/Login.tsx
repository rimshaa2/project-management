"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { THEME, SPACING } from "./global/global.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Card>
      <Title>Welcome Back</Title>
      <Subtitle>Please enter your details to sign in.</Subtitle>
      <Form>
        <RequiredLabel>Email</RequiredLabel>
        <Input
          type="email"
          placeholder="Enter you email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <RequiredLabel>Password</RequiredLabel>
        <Input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton onClick={handleLogin}>Login</SubmitButton>
      </Form>
    </Card>
  );
}

const Card = styled.div`
  background: ${THEME.surface};
  padding: 40px;
  width: 90%;
  max-width: 420px;
  border: 1px solid ${THEME.surfaceLight};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const Title = styled.div`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #ccc;
  margin-bottom: 8px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 16px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  color: white;
  margin-bottom: 20px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${THEME.accent};
  }
`;
const SubmitButton = styled.button`
  padding: 14px;
  background: #fff;
  color: #000;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const RequiredLabel = styled.label`
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
