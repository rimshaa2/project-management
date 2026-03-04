"use client";
import React from "react";
import * as G from "../global/global.styles";
import * as D from "../dashboard/Dashboard.styles";

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  showButton = false,
}: EmptyStateProps) => {
  return (
    <G.EmptyStateContainer>
      <div className="icon-wrapper">
        <Icon className="size-12 text-gray-500" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>

      {showButton && onButtonClick && (
        <D.PrimaryButton onClick={onButtonClick} style={{ marginTop: "20px" }}>
          {buttonText}
        </D.PrimaryButton>
      )}
    </G.EmptyStateContainer>
  );
};

export default EmptyState;
