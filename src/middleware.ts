import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        const isLoggedIn = !!token;

        // Si está en /login y está autenticado, redirigir a /
        if (pathname.startsWith("/login") && isLoggedIn) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        // Permitir acceso a /login si no está autenticado
        if (pathname.startsWith("/login")) {
          return true;
        }

        // Permitir acceso a otras rutas solo si está autenticado
        return isLoggedIn;
      },
    },
  },
  {
    pages: {
      signIn: "/login", // Redirige a /login si no está autenticado
    },
  }
);

export const config = {
  matcher: ["/", "/api/:path*", "/login"],
};
