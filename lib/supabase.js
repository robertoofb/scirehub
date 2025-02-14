import { createClient } from "@supabase/supabase-js";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para manejar la sesión en middleware
export async function updateSession(request) {
  const response = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req: request, res: response });

  // Actualiza la sesión desde Supabase
  await supabase.auth.getSession();
  return response;
}
