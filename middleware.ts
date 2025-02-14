import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Crear cliente Supabase con soporte para cookies
  const supabase = createMiddlewareClient({ req, res });

  // Sincronizar sesión
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si no hay sesión, redirigir al login
  if (!session && req.nextUrl.pathname.startsWith("/dashboardd")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

// Configuración de rutas protegidas
export const config = {
  matcher: ["/dashboardd/:path*"], // Protege todas las rutas bajo `/dashboard`
};
