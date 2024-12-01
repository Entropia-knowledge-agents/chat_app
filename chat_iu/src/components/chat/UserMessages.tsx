"use client";

interface UserMessageProps {
  content: string;
}

export default function UserMessages({ content }: UserMessageProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"></div>

      {/* Mensaje del usuario ocupando las últimas 10 columnas */}
      <div className="col-span-10 flex justify-end">
        <div className="inline-block max-w-full  rounded-lg bg-violet-800 text-white px-3 py-2">
          {content}
        </div>
      </div>
    </div>
  );
}
