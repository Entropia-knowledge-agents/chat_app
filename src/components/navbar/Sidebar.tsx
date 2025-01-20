import React from "react";
import IconButton from "@mui/material/IconButton";
import TsunamiIcon from "@mui/icons-material/Tsunami";
import BoltIcon from "@mui/icons-material/Bolt";
import PublicIcon from '@mui/icons-material/Public';

interface SidebarProps {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

// Estilos inline para el contenedor principal
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  boxShadow: "0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)",
  paddingTop: "100px",
  backgroundColor: "#cbd5e1", // bg-slate-300
  color: "#334155",           // text-slate-700
  width: "50px",
  height: "100%",
};

// Estilos base para los IconButton
const iconButtonBaseStyle: React.CSSProperties = {
  marginLeft: "4px",        // ml-1
  paddingLeft: "12px",      // pl-3
  paddingRight: "16px",     // pr-4
  paddingTop: "8px",        // py-2
  paddingBottom: "8px",     // py-2
  textAlign: "left",
  borderTopLeftRadius: "0.5rem",   // rounded-l-lg (arriba)
  borderBottomLeftRadius: "0.5rem",// rounded-l-lg (abajo)
  marginBottom: "20px",     // mb-5
  cursor: "pointer"
};

const Sidebar: React.FC<SidebarProps> = ({ option, setOption }) => {
  return (
    <div style={containerStyle}>
      {/* Pestaña 1 */}
      <IconButton
        onClick={() => setOption("OLAS")}
        // Combinas los estilos base con el condicional para color de fondo y texto
        style={{
          ...iconButtonBaseStyle,
          backgroundColor: option === "OLAS" ? "#0c4a6e" : "transparent",
          color: option === "OLAS" ? "#e2e8f0" : "inherit",
        }}
        title="Hub OLAS"
        size="medium"
      >
        <TsunamiIcon />
      </IconButton>

      {/* Pestaña 2 */}
      <IconButton
        onClick={() => setOption("energy")}
        style={{
          ...iconButtonBaseStyle,
          backgroundColor: option === "energy" ? "#0c4a6e" : "transparent",
          color: option === "energy" ? "#e2e8f0" : "inherit",
        }}
        title="Hub Energía"
        size="medium"
      >
        <BoltIcon />
      </IconButton>

      {/* Pestaña 3 */}
      <IconButton
        onClick={() => setOption("all")}
        style={{
          ...iconButtonBaseStyle,
          backgroundColor: option === "all" ? "#0c4a6e" : "transparent",
          color: option === "all" ? "#e2e8f0" : "inherit",
        }}
        title="Todos los hubs"
        size="medium"
      >
        <PublicIcon />
      </IconButton>
    </div>
  );
};

export default Sidebar;
