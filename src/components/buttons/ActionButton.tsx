"use client";

import { ReactNode } from "react";
import IconButton from '@mui/material/IconButton';

interface ActionButtonProps {
  icon: ReactNode; 
  title: string; 
  onClick: () => void; 
  color?: "default" | "inherit" | "primary" | "warning" | undefined;
}

export default function ActionButton({ icon, title, onClick, color }: ActionButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      color={color}
      title={title}
    >
        {icon}
    </IconButton>
  );
}
