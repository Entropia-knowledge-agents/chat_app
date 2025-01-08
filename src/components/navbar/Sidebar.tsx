import React from "react";

// Definir el tipo para las props
interface SidebarProps {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ option, setOption, language, setLanguage }) => {
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
        onClick={() => setOption("energia")}
        className={`w-[250px] px-4 py-2 text-left rounded-l-lg ${
          option === "energia" ? "bg-[#1f2f79] text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        Hub Energía
      </button>

      {/* Sección de selección de idioma */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Agent language</h3>
        
        {/* Radio buttons para idiomas */}
        <label className="block-flex items-center mr-4">
          <input
            type="radio"
            name="language"
            value="es"
            checked={language === "es"}
            onChange={() => setLanguage("es")}
            className="form-radio"
          />
          <span className="ml-2 text-2xl">🇪🇸</span> {/* Emoji de la bandera de España */}
        </label>
        
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="language"
            value="en"
            checked={language === "en"}
            onChange={() => setLanguage("en")}
            className="form-radio"
          />
          <span className="ml-2 text-2xl">🇺🇸</span> {/* Emoji de la bandera de EE. UU. */}
        </label>
        
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="language"
            value="pt"
            checked={language === "pt"}
            onChange={() => setLanguage("pt")}
            className="form-radio"
          />
          <span className="ml-2 text-2xl">🇵🇹</span> {/* Emoji de la bandera de Portugal */}
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
