import React from "react";

// Definir el tipo para las props
interface SidebarProps {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

// Definir el componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ option, setOption }) => {

  return (
    <div className="flex flex-col items-start shadow-lg pt-5 bg-slate-300 text-slate-700 pl-4 h-full  bottom-0">
      {/* Pestaña 1 */}
      <button
        onClick={() => setOption("OLAS")} 
        className={`w-[250px] px-4 py-2 text-left rounded-l-lg mb-2 ${
          option === "OLAS" ? "bg-[#1f2f79] text-slate-200" : "hover:bg-slate-400"
        }`}
      >
        Hub OLAS
      </button>

      {/* Pestaña 2 */}
      <button
        onClick={() => setOption("energy")}
        className={`w-[250px] px-4 py-2 text-left rounded-l-lg ${
          option === "energy" ? "bg-[#1f2f79] text-slate-200" : "hover:bg-slate-400"
        }`}
      >
        Hub Energía
      </button>
    </div>
  );
};

// Exportar el componente Sidebar
export default Sidebar;