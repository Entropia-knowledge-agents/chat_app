import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ActionButtons from '../buttons/LikeButtons';

interface MessageProps {
  content: string;
}

export function ModelMessages({ content }: MessageProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-11 flex items-start space-x-2">
        
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center border p-2 border-gray-200">
            <AutoAwesomeIcon fontSize="small" className="text-black" />
          </div>
        </div>

        <div className="inline-block max-w-full py-1 px-2   text-black">
          {content}
          <ActionButtons />
        </div>
      </div>

      <div className="col-span-1"></div>
    </div>
  );
}


export  function UserMessages({ content }: MessageProps) {
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


