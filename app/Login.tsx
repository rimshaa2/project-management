"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

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
      <Header>
        <Form>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter you email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton onClick={handleLogin}>Login</SubmitButton>
        </Form>
      </Header>
    </Card>
  );
}

const Card = styled.div`
    background: #121212,
    padding: 40px,
    border-radius: 16px;
    width: 100%;
    max-width: 450px;
    border 1px solid #333
`;
const Header = styled.div`
  color: white;
  marigin-bottom: 30px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  color: #ccc;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  color: white;
  margin-bottom: 20px;
`;
const SubmitButton = styled.button`
  padding: 14px;
  background: #fff;
  color: #000;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: none;
`;
