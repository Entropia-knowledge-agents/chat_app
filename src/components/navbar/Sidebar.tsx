import React from "react";

// Definir el tipo para las props
interface SidebarProps {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

// Definir el componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ option, setOption, language, setLanguage }) => {
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
        onClick={() => setOption("energia")}
        className={`w-[250px] px-4 py-2 text-left rounded-l-lg ${
          option === "energia" ? "bg-[#1f2f79] text-slate-200" : "hover:bg-slate-400"
        }`}
      >
        Hub Energía
      </button>

      {/* Sección de selección de idioma */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Agent language</h3>
        
        {/* Radio buttons para idiomas */}
        <label className="block items-center mr-4">
          <input
            type="radio"
            name="language"
            value="es"
            checked={language === "es"}
            onChange={() => setLanguage("es")}
            className="form-radio"
          />
          <span className="ml-2">Spanish</span> {/* Emoji de la bandera de España */}
        </label>
        
        <label className="block items-center mr-4">
          <input
            type="radio"
            name="language"
            value="en"
            checked={language === "en"}
            onChange={() => setLanguage("en")}
            className="form-radio"
          />
          <span className="ml-2">English</span> {/* Emoji de la bandera de EE. UU. */}
        </label>
        
        <label className="block items-center">
          <input
            type="radio"
            name="language"
            value="pt"
            checked={language === "pt"}
            onChange={() => setLanguage("pt")}
            className="form-radio"
          />
          <span className="ml-2">Portuguese</span> {/* Emoji de la bandera de Portugal */}
        </label>
      </div>
    </div>
  );
};

// Exportar el componente Sidebar
export default Sidebar;