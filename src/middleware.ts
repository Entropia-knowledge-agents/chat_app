import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    // Redirigir usuarios autenticados que intentan acceder a /login
    if (pathname.startsWith("/login") && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Permitir acceso a /login si no está autenticado
    if (pathname.startsWith("/login")) {
      return NextResponse.next();
    }

    // Redirigir usuarios no autenticados al login
    if (!token) {

      if (pathname.startsWith("/api")) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Usa el token para verificar autenticación
    },
    pages: {
      signIn: "/login", // Ruta personalizada para login
    },
  }
);

export const config = {
  // Aplica el middleware a todas las rutas excepto a /api/chat, /login y /api/auth/[...nextauth]
  matcher: ["/((?!api/chat|login|api/auth/.*).*)"],
};
