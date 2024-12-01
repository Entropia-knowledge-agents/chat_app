"use client";

import { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode; 
  title: string; 
  onClick: () => void; 
}

export default function ActionButton({ icon, title, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-7 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-200"
      title={title}
    >
      <div className="text-gray-500 flex items-center justify-center" style={{ fontSize: "16px" }}>
        {icon}
      </div>
    </button>
  );
}
