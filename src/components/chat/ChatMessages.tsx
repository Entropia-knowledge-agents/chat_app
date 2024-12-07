import { UserMessages, ModelMessages } from "./TemplateMessages";

interface Message {
  id: string;
  content: string;
  role: string;
}

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="w-full p-1 space-y-4">
      {messages?.map((message) =>
        message.role === "user" ? (
          <UserMessages key={message.id} content={message.content} />
        ) : (
          <ModelMessages key={message.id} content={message.content} />
        )
      )}
    </div>
  );
}
