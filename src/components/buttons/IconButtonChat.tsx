import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import StopIcon from '@mui/icons-material/Stop';

interface IconButtonChatProps {
  name: "send" | "stop"; // Nombre del ícono a renderizar
  disabled?: boolean; // Deshabilitar el botón
  onClick: () => void; // Función al hacer clic
}

export default function IconButtonChat({ name, onClick, disabled }: Readonly<IconButtonChatProps>) {
  let IconComponent;
  switch (name) {
    case "send":
      IconComponent = ArrowUpwardIcon; 
      break;
    case "stop":
      IconComponent = StopIcon; 
      break;
    default:
      throw new Error(`Invalid icon name: ${name}`); 
  }

  return (
    <IconButton
      onClick={onClick}
      size="small"
      disabled={disabled}
      style={{
        backgroundColor: "#3730a3", // Color sólido (azul)
        color: "#fff", // Ícono en blanco
        borderRadius: "50%", // Redondeado
      }}
    >
      <IconComponent fontSize="small" />
    </IconButton>
  );
}
