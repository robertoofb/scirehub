import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Configuración del cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Obtener investigadores
export async function GET() {
  try {
    const { data: investigators, error } = await supabase
      .from("investigadores")
      .select("id_cuenta");

    if (error) throw new Error(error.message);

    return NextResponse.json({ investigators });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Agregar investigador
export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    // Obtener datos del perfil del usuario
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, title, bio, avatar_url, email, phone, image_url")
      .eq("id", userId)
      .single();

    if (profileError) throw new Error("Error al obtener datos del perfil: " + profileError.message);

    // Insertar el investigador con datos del perfil
    const { error: insertError } = await supabase.from("investigadores").insert({
      id_cuenta: userId,
      nombre: profile.full_name || "Sin nombre",
      descripcion: profile.bio || "Sin descripción",
      imagen: profile.image_url || profile.avatar_url || null,
      email: profile.email || null,
      rol: 2, // Rol de investigador
      fecha_creacion: new Date().toISOString(), // Fecha actual
    });

    if (insertError) throw new Error("Error al insertar investigador: " + insertError.message);

    return NextResponse.json({ message: "Investigador agregado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Eliminar investigador
export async function DELETE(req: Request) {
  const { userId } = await req.json();

  try {
    const { error } = await supabase.from("investigadores").delete().eq("id_cuenta", userId);

    if (error) throw new Error(error.message);

    return NextResponse.json({ message: "Investigador eliminado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
