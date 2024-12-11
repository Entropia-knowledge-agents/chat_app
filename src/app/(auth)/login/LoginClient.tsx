"use client";

import LoginForm from "./sections/LoginForm";
import LoggedMsg from "./sections/LoggedMsg";
import { Session } from "next-auth";

interface LoginClientProps {
  session: Session | null;
}

function LoginClient({ session }: LoginClientProps) {
  return session ? <LoggedMsg /> : <LoginForm />;
}

export default LoginClient;