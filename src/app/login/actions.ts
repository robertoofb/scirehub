
"use server";

import { supabaseServer } from "../../../utils/supabase/server";

export async function login(formData: FormData): Promise<{ success: boolean }> {
  const supabase = supabaseServer();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Error en inicio de sesión:", error.message);
    return { success: false };
  }

  return { success: true };
}

export async function signup(formData: FormData): Promise<{ success: boolean }> {
  const supabase = supabaseServer();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Error en registro:", error.message);
    return { success: false };
  }

  return { success: true };
}
