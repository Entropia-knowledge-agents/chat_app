import Link from "next/link";
import Button from "@mui/material/Button";

function LoggedMsg() {
  return (
    <>
      <p>Ya estás logueado</p>
      <Link href="/">
        <Button>Volver al Chat!</Button>
      </Link>
    </>
  );
}

export default LoggedMsg;
