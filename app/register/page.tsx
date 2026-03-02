"use client";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import * as S from "./Register.styles";
import { useForm } from "react-hook-form";
import { UserProfile } from "../types";

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        <S.InputGroup>
          <label>Name</label>
          <S.StyledInput
            placeholder="Enter your name.."
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
        </S.InputGroup>
        <S.InputGroup>
          <S.RequiredLabel>Email</S.RequiredLabel>
          <S.StyledInput
            placeholder="Enter your email.."
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
        </S.InputGroup>
        <S.InputGroup>
          <S.RequiredLabel>Password</S.RequiredLabel>
          <S.StyledInput
            type="password"
            placeholder="Enter your password.."
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && (
            <S.ErrorText>{errors.password.message}</S.ErrorText>
          )}
        </S.InputGroup>
        <S.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add User"}
        </S.SubmitButton>
      </form>
    </S.Container>
  );
}
