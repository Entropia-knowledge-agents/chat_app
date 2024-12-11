'use client';
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  // status será "loading", "authenticated" o "unauthenticated".
  // session será la sesión actual si el usuario está autenticado.

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-neutral-30/80 backdrop-blur-lg py-2 px-4 z-50">
      <div className="flex items-center justify-between">
        <div>{session?.user?.email ?? "No user"}</div>
        <div className="flex space-x-4">
          {session?.user && (
            <Button
              variant="contained"
              onClick={() => signOut()}
              sx={{
                backgroundColor: "#6D28D9",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5B21B6",
                },
                m:0
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
