import { UserMessages, ModelMessages,  MessageProps } from "./TemplateMessages";
import { memo } from "react";
import equal from "fast-deep-equal";
import { useChatContext } from "@/context/ChatContext";

// Un "spinner" dummy
function LoadingBubble({ toolName }: { readonly toolName?: string }) {
  let name = "Thinking...";
  if (toolName === "documentRetriever") {
    name = "Looking for the content of relevant documents...";
  } else if (toolName === "catalogueRetriever") {
    name = "Give a second, I'm searching relevant documents...";
  }

  return <ModelMessages content={name} isLoading={true} id={name} />;
}

function ChatMessagesBase({ messages }: { readonly messages: readonly MessageProps[] }) {
  const { awaitingResponse, currentToolCall, usageTracking } = useChatContext();

  /**
   * Podemos renderizar la lista de mensajes "finales" (user + assistant).
   * Luego, al final, si `awaitingResponse || currentToolCall`, mostramos un bubble de LoadingBubble.
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
      {filteredMessages.map((message, ix) =>
        message.role === "user" ? (
          <UserMessages key={message.id} content={message.content} id={message.id} />
        ) : (
          <ModelMessages
            key={message.id}
            content={message.content}
            isLoading={false}
            usage={usageTracking[ix]?.tokens}
            id={messages[ix-1].id}
          />
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
