import { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";

interface ActionButtonProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  color?: "default" | "inherit" | "primary" | "warning" | undefined;
  size?: "small" | "medium" | undefined;
  disabled?: boolean;
}

export default function ActionButton({
  icon,
  title,
  onClick,
  color,
  size,
  disabled = false,
}: ActionButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      size={size ? size : "small"}
      color={color}
      title={title}
      disabled={disabled}
    >
      {icon}
    </IconButton>
  );
}
