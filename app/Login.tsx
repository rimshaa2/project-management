"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { UserProfile } from "./types";
import FormInput from "./global/FormInput";

type LoginProps = {
  onSuccess: () => void;
};

export default function Login({ onSuccess }: LoginProps) {
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
      onSuccess();
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
    <>
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
    </>
  );
}

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
