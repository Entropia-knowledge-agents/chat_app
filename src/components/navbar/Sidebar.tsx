import React from "react";

// Definir el tipo para las props
interface SidebarProps {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ option, setOption}) => {
  return (
    <div className="flex flex-col items-start">
      {/* Título del menú */}
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      {/* Pestaña 1 */}
      <button
        onClick={() => setOption("OLAS")}
        className={`w-[250px] px-4 py-2 text-left rounded-l-lg ${
          option === "OLAS" ? "bg-[#1f2f79] text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        Hub OLAS
      </button>

      {/* Pestaña 2 */}
      <button
        onClick={() => setOption("energy")}
        className={`w-[250px] px-4 py-2 text-left rounded-l-lg ${
          option === "energia" ? "bg-[#1f2f79] text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        Hub Energía
      </button>
    </div>
  );
};

export default Sidebar;
