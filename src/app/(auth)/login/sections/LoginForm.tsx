"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from '@mui/icons-material/Lock';


export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });


    if (!res || res.error) {
      setError("Credenciales no encontradas.");
      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center mb-10">
      <h1 className="text-3xl font-bold text-indigo-700">Iniciar sesión</h1>
    </div>
      {error && (
        <p
          style={{
            backgroundColor: "#f87171",
            fontSize: "1rem",
            color: "#fff",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}

        >
          {error}
        </p>
      )}
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          style={{ width: "500px", marginBottom: "15px" }}
          type="email"
          placeholder="tucorreo@dominio.com"
          label="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          style={{ width: "500px", marginBottom: "25px" }}
          type="password"
          placeholder="•••••••••"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !email || !password}
          style={{ width: "30%",
          backgroundColor: "#4338ca",
          color: "#f1f5f9",
          }}
        >
          {isLoading ? "Cargando..." : "Entrar!"}
        </Button>
      </form>
    </>
  );
}
