"use client";

import LoginForm from "./sections/LoginForm";
import LoggedMsg from "./sections/LoggedMsg";

interface LoginClientProps {
  session: { user?: { email?: string } } | null;
}

function LoginClient({ session }: LoginClientProps) {
  return session ? <LoggedMsg /> : <LoginForm />;
}

export default LoginClient;
