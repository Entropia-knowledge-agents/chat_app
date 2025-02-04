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


function setCorsHeaders(response:NextResponse, origin:(string|null)) {
  // Siempre se deben permitir las credenciales (cookies, etc.)
  response.headers.set("Access-Control-Allow-Credentials", "true");
  // Métodos permitidos
  response.headers.set("Access-Control-Allow-Methods", "GET,POST");
  // Encabezados que se pueden enviar en la petición
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-CSRF-Token, X-Requested-With"
  );
  // Si el origin de la petición está permitido, se lo agrega
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

    // Si es una petición preflight, responde de inmediato con los headers de CORS
    if (request.method === "OPTIONS") {
      const response = NextResponse.next(); // Respuesta vacía, status 200 por defecto
      return setCorsHeaders(response, origin);
    }

    // Lógica de autenticación:
    // 1. Redirige usuarios autenticados que intentan acceder a /login
    if (pathname.startsWith("/login") && token) {
      const response = NextResponse.redirect(new URL("/", request.url));
      return setCorsHeaders(response, origin);
    }

    // 2. Permitir acceso a /login (sin autenticar)
    if (pathname.startsWith("/login")) {
      const response = NextResponse.next();
      return setCorsHeaders(response, origin);
    }

    // 3. Si no hay token, redirige al login
    if (!token) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      return setCorsHeaders(response, origin);
    }

    // Si todo está en orden, se continúa con la respuesta
    const response = NextResponse.next();
    return setCorsHeaders(response, origin);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Verifica que exista un token
    },
    pages: {
      signIn: "/login", // Ruta personalizada para el login
    },
  }
);

// Configuración del matcher para determinar en qué rutas se aplica este middleware.
// Ajusta el matcher si deseas incluir (o excluir) rutas específicas.
export const config = {
  // En este ejemplo se aplica a todas las rutas excepto /api/chat y /login
  matcher: ["/((?!api/chat|login).*)"],
};
