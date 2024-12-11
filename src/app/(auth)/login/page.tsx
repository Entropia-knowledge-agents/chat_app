import { getServerSession } from "next-auth/next";
import { authConfig } from "../auth.config";
import InfoSide from "./sections/InfoSide";
import LoginClient from "./LoginClient";

export default async function Login() {
  const session = await getServerSession(authConfig);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-tl from-indigo-950 via-indigo-800 to-indigo-300 md:w-[60%] z-1 shadow-[rgba(99,99,99,0.5)_0px_7px_13px_8px] z-10">
        <InfoSide />
      </div>

      <div className="flex flex-col md:h-screen items-center justify-center bg-blue-50 md:w-[40%] shadow-inner z-11">
        {/* Pasar la sesión como prop */}
        <LoginClient session={session} />
      </div>
    </div>
  );
}
