"use client";

import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalManager from "./components/modals/ModalManager";

export default function HomePage() {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  const router = useRouter();

  const handleAuthSuccess = () => {
    setModalType(null);
    router.push("/dashboard");
  };

  return (
    <MainContainer>
      <HeroSection>
        <Title>Project Management</Title>
        <SubTitle>
          Organize your team, tasks, and projects in one place.
        </SubTitle>
        <ButtonGroup>
          <PrimaryButton onClick={() => setModalType("login")}>
            Log in
          </PrimaryButton>
          <SecondaryButton onClick={() => setModalType("register")}>
            Create Account
          </SecondaryButton>
        </ButtonGroup>
      </HeroSection>
      <ModalManager type={modalType} onClose={() => setModalType(null)} />
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0f172a;
  color: white;
  gap: 20px;
`;

const HeroSection = styled.div`
  text-align: center;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 3rem;
  background: linear-gradient(to right, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubTitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const PrimaryButton = styled.button`
  background-color: #6366f1;
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9s;
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  border: 1px solid #334155;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #1e293b;
  }
`;
