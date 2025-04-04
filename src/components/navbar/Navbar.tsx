'use client';
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // status será "loading", "authenticated" o "unauthenticated".
  // session será la sesión actual si el usuario está autenticado.

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  const LogOutHandler = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };


  return (
    <div className=" w-full bg-slate-300 -30/80 backdrop-blur-lg py-2 px-4 z-50">
      <div className="flex items-center justify-between">
        <div>{session?.user?.email ?? "No user"}</div>
        <div className="flex space-x-4">
          {session?.user && (
            <Button
              variant="contained"
              onClick={LogOutHandler}
              sx={{
                backgroundColor: "#1f2f79",
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
