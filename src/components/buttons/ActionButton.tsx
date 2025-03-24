import { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";

interface ActionButtonProps {
  readonly icon: ReactNode;
  readonly title: string;
  readonly onClick: () => void;
  readonly color?: "default" | "inherit" | "primary" | "warning";
  readonly size?: "small" | "medium";
  readonly disabled?: boolean;
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
      size={size ?? "small"}
      color={color}
      title={title}
      disabled={disabled}
    >
      {icon}
    </IconButton>
  );
}
