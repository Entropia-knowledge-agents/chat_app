import React from "react";
import IconButton from '@mui/material/IconButton';
import TsunamiIcon from '@mui/icons-material/Tsunami';
import BoltIcon from '@mui/icons-material/Bolt';

// Definir el tipo para las props
interface SidebarProps {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

// Definir el componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ option, setOption }) => {



  return (
    <div className="flex flex-col items-start shadow-lg pt-[100px] bg-slate-300 text-slate-700 h-full  bottom-0 w-[50px]">
      {/* Pestaña 1 */}
      <IconButton
        onClick={() => setOption("OLAS")} 
        className={`ml-1 pl-3 pr-4 py-2 text-left rounded-l-lg mb-5 ${
          option === "OLAS" ? "bg-[#1f2f79] text-slate-200" : "hover:bg-slate-400"
        }`} 
        title="Hub OLAS"  
        size="medium"     
      >
        <TsunamiIcon />
      </IconButton>

      {/* Pestaña 2 */}
      <IconButton
        onClick={() => setOption("energy")}
        className={`ml-1 pl-3 pr-4 py-2 text-left rounded-l-lg ${
          option === "energy" ? "bg-[#1f2f79] text-slate-200" : "hover:bg-slate-400"
        }`}
        title="Hub Energía"
        size="medium"
      >
        <BoltIcon />
      </IconButton>
    </div>
  );
};

// Exportar el componente Sidebar
export default Sidebar;