import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    // Si está en /login y está autenticado, redirigir a /
    if (pathname.startsWith("/login") && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Permitir acceso a /login si no está autenticado
    if (pathname.startsWith("/login")) {
      return NextResponse.next();
    }

    // Permitir acceso a otras rutas solo si está autenticado
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/", "/api/:path*", "/login"],
};