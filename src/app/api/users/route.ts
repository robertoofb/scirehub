import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { data: users, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("Error al obtener usuarios:", error.message);
      return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }

    if (!users || !Array.isArray(users.users)) {
      return NextResponse.json({ error: "Formato inesperado de datos" }, { status: 500 });
    }

    return NextResponse.json({ users: users.users });
  } catch (error) {
    console.error("Error del servidor:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
