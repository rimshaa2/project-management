"use client";
import { auth, db, firebaseConfig } from "@/lib/firebase";
import { initializeApp, getApp, deleteApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import * as S from "./User.styles";
import * as D from "../dashboard/Dashboard.styles";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useUsers } from "../hooks/useUsers";
import {
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRole } from "../hooks/useRole";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [isMOdalOpen, setIsModalOpen] = useState(false);
  const currenUser = auth.currentUser;
  const { isAdmin, role, loading: roleLoading } = useRole();
  const router = useRouter();
  const [editingUser, setEditingUser] = useState<any>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const { users, loading, deleteUser } = useUsers();

  console.log("Is admin?", isAdmin);
  console.log({ role });

  useEffect(() => {
    if (!isAdmin && !roleLoading) {
      router.push("/dashboard");
    }
  }, [isAdmin, router, roleLoading]);

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setValue("name", user.name);
    setValue("email", user.email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingUser) {
        const userRef = doc(db, "users", editingUser.uid);
        await setDoc(
          userRef,
          {
            ...editingUser,
            name: data.name,
            email: data.email,
          },
          { merge: true },
        );
      } else {
        const secondaryApp = initializeApp(firebaseConfig, "Secondary");
        const secondaryAuth = getAuth(secondaryApp);

        const userCredential = await createUserWithEmailAndPassword(
          secondaryAuth,
          data.email,
          data.password,
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          name: data.name,
          email: data.email,
          role: "user",
          createdBy: auth.currentUser?.uid,
          createdAt: new Date().toISOString(),
        });
        await signOut(secondaryAuth);
        await deleteApp(secondaryApp);
        alert("New user created successfully!");
      }
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };
  const handleAddClick = () => {
    setEditingUser(null);
    reset({ name: "", email: "", password: "" });
    setIsModalOpen(true);
  };

  return (
    <>
      <S.PageContainer>
        <S.HeaderRow>
          <D.Title>User Management</D.Title>
          <D.PrimaryButton onClick={handleAddClick}>
            <PlusIcon className="size-5" />
            Add User
          </D.PrimaryButton>
        </S.HeaderRow>
        <S.UserGrid>
          {loading ? (
            <p>Loading...</p>
          ) : (
            users.map((user) => (
              <S.UserCard key={user.uid}>
                <div className="flex gap-4">
                  <UserIcon className="size-4 text-white" />
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <S.RoleBadge $role={user.role}>{user.role}</S.RoleBadge>
                  </div>
                </div>
                <S.ActionGroup>
                  <S.IconButton onClick={() => handleEditClick(user)}>
                    <PencilSquareIcon className="size-5" />
                  </S.IconButton>
                  {user.uid !== currenUser?.uid ? (
                    <S.IconButton
                      $variant="danger"
                      onClick={() => deleteUser(user.uid)}
                    >
                      <TrashIcon className="size-5" />
                    </S.IconButton>
                  ) : (
                    <S.DisabledPlacholder title="You cannot delete yourself">
                      <TrashIcon className="size-5" style={{ opacity: 0.3 }} />
                    </S.DisabledPlacholder>
                  )}
                </S.ActionGroup>
              </S.UserCard>
            ))
          )}
        </S.UserGrid>
        {isMOdalOpen && (
          <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <D.Title>{editingUser ? "Edit User" : "Add New User"}</D.Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                <S.InputGroup>
                  <label>
                    Full Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <S.StyledInput
                    {...register("name", { required: "Name is required" })}
                  />
                </S.InputGroup>

                <S.InputGroup>
                  <label>
                    Email Address <span style={{ color: "red" }}>*</span>
                  </label>
                  <S.StyledInput
                    type="email"
                    {...register("email", { required: "Email is required" })}
                  />
                </S.InputGroup>

                {!editingUser && (
                  <S.InputGroup>
                    <label>
                      Temporary Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <S.StyledInput
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                    />
                  </S.InputGroup>
                )}

                <S.ButtonGroup>
                  <S.SecondaryButton
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </S.SecondaryButton>
                  <S.SubmitButton type="submit" disabled={isSubmitting}>
                    {editingUser ? "Save Changes" : "Create Account"}
                  </S.SubmitButton>
                </S.ButtonGroup>
              </form>
            </S.ModalContent>
          </S.ModalOverlay>
        )}
      </S.PageContainer>
    </>
  );
}
