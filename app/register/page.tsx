"use client";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as S from "./Register.styles";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Register error: ", error);
    }
  };
  return (
    <S.Container>
      <h3>Add Users</h3>
      <form>
        <S.InputGroup>
          <label>Name</label>
          <S.StyledInput
            placeholder="Enter your name.."
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </S.InputGroup>
        <S.InputGroup>
          <label>Email</label>
          <S.StyledInput
            placeholder="Enter your email.."
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </S.InputGroup>
        <S.InputGroup>
          <label>Password</label>
          <S.StyledInput
            placeholder="Enter your password.."
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </S.InputGroup>
        <S.SubmitButton onClick={handleRegister}>Add User</S.SubmitButton>
      </form>
    </S.Container>
  );
}
