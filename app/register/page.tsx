"use client";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import * as S from "./Register.styles";
import { useForm } from "react-hook-form";
import { UserProfile } from "../types";
import FormInput from "../global/FormInput";

export default function Register() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserProfile>();

  const onSubmit = async (data: UserProfile) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        role: "admin",
        createdAt: new Date(),
        createdBy: auth.currentUser?.uid,
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Register error: ", error);
      alert(error.message);
    }
  };
  return (
    <S.Container>
      <S.Title>Add Users</S.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          placeholder="Enter your name..."
          rules={{ required: "Name is required" }}
        />
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
              message: "Invalid email address",
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
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
            validate: {
              hasUppercase: (value: string) =>
                /[A-Z]/.test(value) ||
                "Must include at least one uppercase letter",
              hasNumber: (value: string) =>
                /[0-9]/.test(value) || "Must include at least one number",
              hasSpecial: (value: string) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                "Must include at least one special character",
            },
          }}
        />

        <S.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add User"}
        </S.SubmitButton>
      </form>
    </S.Container>
  );
}
