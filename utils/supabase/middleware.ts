import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  // Sincroniza la sesión
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirige al login si no hay sesión
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

// Configurar rutas protegidas
export const config = {
  matcher: ["/dashboard/:path*"], // Aplica protección a rutas bajo `/dashboard`
};