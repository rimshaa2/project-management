"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { THEME, SPACING } from "./global/global.styles";
import { useForm } from "react-hook-form";
import { UserProfile } from "./types";
import FormInput from "./global/FormInput";

export default function Login() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserProfile>();

  const handleLogin = async (data: UserProfile) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error && "code" in error) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === "auth/invalid-credential") {
          setAuthError("Incorrect email or password.");
        } else {
          setAuthError("An error occurred during login.");
        }
      } else {
        setAuthError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card>
      <Title>Welcome Back</Title>
      <Subtitle>Please enter your details to sign in.</Subtitle>
      {authError && <ErrorMessage>{authError}</ErrorMessage>}
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormInput
          name="email"
          label="Email"
          control={control}
          required
          placeholder="Enter your email..."
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          }}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          control={control}
          required
          placeholder="Enter your password..."
          rules={{ required: "Email is required" }}
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          Login
        </SubmitButton>
      </form>
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
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const Title = styled.div`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
`;

const Subtitle = styled.div`
  color: #888;
  font-size: 0.9rem;
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #fff;
  color: #000;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  font-size: 0.85rem;
  text-align: center;
  font-weight: 500;
`;
