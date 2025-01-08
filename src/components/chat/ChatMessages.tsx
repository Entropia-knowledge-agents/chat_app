import { UserMessages, ModelMessages, MessageProps } from "./TemplateMessages";
import { memo } from "react";
import equal from "fast-deep-equal";
import { useChatContext } from "@/context/ChatContext";

// Un "spinner" dummy
function LoadingBubble({ toolName }: { toolName?: string }) {
  const name =
    toolName === "documentRetriever"
      ? "Looking for the content of relevant documents..."
      : toolName === "catalogueRetriever"
      ? "Give a second, I'm searching relevant documents..."
      : "Thinking...";

  return <ModelMessages content={name} isLoading={true}/>;
}

function ChatMessagesBase({ messages}: { messages: MessageProps[]}) {
  const { awaitingResponse, currentToolCall } = useChatContext();

  /**
   * Podemos renderizar la lista de mensajes "finales" (user + assistant).
   * Luego, al final, si `awaitingResponse || currentToolCall`, mostramos un bubble de LoadingBubble.
   *
   * IMPORTANTE:
   *   - Filtra (opcional) los mensajes que tengan content vacío y sean toolInvocations
   *   - Así evitas que aparezcan “mensajes sueltos” con content:""
   */
  const filteredMessages = messages.filter((m) => {
    // Por ejemplo, ignorar mensajes donde content == "" y existan toolInvocations
    if (m.content === "" && m.toolInvocations?.length) {
      return false;
    }
    // caso normal => lo incluimos
    return true;
  });

  return (
    <div className="w-full p-1 space-y-4">
      {filteredMessages.map((message) =>
        message.role === "user" ? (
          <UserMessages key={message.id} content={message.content} />
        ) : (
          <ModelMessages key={message.id} content={message.content} isLoading={false} />
        )
      )}

      {/* Al final, si estamos esperando o hay toolCall, renderizamos un bubble “loading” */}
      {(awaitingResponse || currentToolCall) && (
        <LoadingBubble toolName={currentToolCall} />
      )}
    </div>
  );
}

export const ChatMessages = memo(ChatMessagesBase, (prevProps, nextProps) => {
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;
  return true;
});
