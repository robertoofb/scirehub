"use server";

import { supabase } from "../../../lib/supabase";

export async function subirImagen(formData: FormData): Promise<void> {
  try {
    const file = formData.get("imagen") as File;
    if (!file) throw new Error("No se ha proporcionado una imagen.");

    const normalizedFileName = file.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    // Cambia "pruebas" por el nombre del bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("pruebas")
      .upload(`imagenes/${normalizedFileName}`, file, { upsert: true });

    if (uploadError) {
      console.error("Error subiendo la imagen:", uploadError);
      throw uploadError;
    }

    console.log("Imagen subida correctamente:", uploadData);
  } catch (error) {
    console.error("Error subiendo la imagen:", error);
    throw error;
  }
}
