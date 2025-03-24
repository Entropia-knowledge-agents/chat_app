import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ActionButtons from "../buttons/LikeButtons";
import { Markdown } from "@/components/utils/Markdown";
import { memo } from "react";

interface ToolProps {
  toolName: string;
}

export interface MessageProps {
  id: string;
  content: string;
  role?: string;
  toolInvocations?: ToolProps[];
  isLoading?: boolean;
  usage?: number
}

export const ModelMessages = memo(
  function ModelMessages({ id, content, isLoading, usage }: MessageProps) {
    return (
      <div className="grid grid-cols-12">
        <div className="col-span-11 flex items-start space-x-2">
          <div className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center border p-2 border-gray-200">
              <AutoAwesomeIcon fontSize="small" className="text-black" />
            </div>
          </div>

          <div
            className="inline-block max-w-full py-1 px-2 text-black"
            style={{
              wordBreak: "break-word",
              maxWidth: "100%",
              maxHeight: "100%",
              overflowY: "auto",
              padding: "10px",
            }}
          >
            {isLoading ? (
              <p className="loader-shine">{content}</p>
            ) : (
              <div>
                <Markdown>{content}</Markdown>
                <p>{usage}</p>
              </div>
            )}
            <ActionButtons msgId={id} />
          </div>
        </div>

        <div className="col-span-1"></div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

export const UserMessages = memo(
  function UserMessages({ content }: MessageProps) {
    return (
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-10 flex justify-end">
          <div className="inline-block max-w-full rounded-lg bg-violet-800 text-white px-3 py-2">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);
