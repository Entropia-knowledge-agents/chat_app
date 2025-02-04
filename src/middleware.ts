// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Lista de orígenes permitidos (puedes usar variables de entorno en producción)
const allowedOrigins = [
  "https://rag-agent-dgcda0ekcphcgcc8.eastus-01.azurewebsites.net",
  "https://dev-iadb.pantheonsite.io",
  "http://localhost:3000",
  "http://localhost:4200"
];

/**
 * Añade los encabezados CORS a la respuesta.
 * @param {NextResponse} response 
 * @param {string | null} origin 
 * @returns {NextResponse}
 */
function setCorsHeaders(response:NextResponse, origin:(string | null)):NextResponse {
  // Siempre se deben permitir las credenciales (cookies, etc.)
  response.headers.set("Access-Control-Allow-Credentials", "true");
  // Métodos permitidos (incluye OPTIONS para preflight)
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  // Encabezados que se pueden enviar en la petición
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-CSRF-Token, X-Requested-With"
  );
  // Si el origin de la petición está permitido, lo agregamos.
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  return response;
}

export default withAuth(
  (request) => {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;
    const origin = request.headers.get("origin");

    // 1) Si es preflight (OPTIONS), responder sin redirigir
    if (request.method === "OPTIONS") {
      const response = NextResponse.next(); // Respuesta 200 por defecto
      return setCorsHeaders(response, origin);
    }

    // 2) Si la ruta es /login y el usuario YA está autenticado, redirigirlo a "/"
    if (pathname.startsWith("/login") && token) {
      const response = NextResponse.redirect(new URL("/", request.url));
      return setCorsHeaders(response, origin);
    }

    // 3) Si la ruta es /login y NO está autenticado, permitir acceso
    if (pathname.startsWith("/login")) {
      const response = NextResponse.next();
      return setCorsHeaders(response, origin);
    }

    // 4) Si la ruta empieza con /api
    if (pathname.startsWith("/api")) {
      // Si NO hay token, devolver 401 en vez de redirigir
      if (!token) {
        const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        return setCorsHeaders(response, origin);
      }
      // Si hay token, continúa
      const response = NextResponse.next();
      return setCorsHeaders(response, origin);
    }

    // 5) Resto de rutas (no /login y no /api):
    //    Si NO hay token, redirigir al login
    if (!token) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      return setCorsHeaders(response, origin);
    }

    // 6) Si hay token, permitir
    const response = NextResponse.next();
    return setCorsHeaders(response, origin);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Verifica que exista un token
    },
    pages: {
      signIn: "/login", // Ruta personalizada para login
    },
  }
);

/**
 * Ajusta el matcher si deseas incluir (o excluir) rutas específicas.
 * En este ejemplo se aplica a todas las rutas excepto /api/chat y /login:
 */
export const config = {
  matcher: ["/((?!api/chat|login).*)"],
};
