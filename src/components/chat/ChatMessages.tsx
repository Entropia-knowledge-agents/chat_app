import { UserMessages, ModelMessages } from "./TemplateMessages";
import { memo } from 'react';
import equal from 'fast-deep-equal';

interface Message {
  id: string;
  content: string;
  role: string;
}

function ChatMessagesBase({ messages }: { messages: Message[] }) {
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

export const ChatMessages = memo(
  ChatMessagesBase,
  (prevProps, nextProps) => {
    // Si la longitud cambió, seguro hay un cambio
    if (prevProps.messages.length !== nextProps.messages.length) return false;

    // Si el contenido de algún mensaje cambió, se vuelve a renderizar
    // Aquí usamos fast-deep-equal para comparar el array de mensajes completo
    // Dependiendo de la complejidad, podrías hacer una comparación más ligera
    if (!equal(prevProps.messages, nextProps.messages)) return false;

    // Si llegamos aquí, las props son iguales y no se re-renderiza.
    return true;
  }
);
