"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../dashboard/barraNavegacion";
import UploadPost from "../dashboard/publicarInvestigacion";
import ManagePosts from "../dashboard/administradorInvestigaciones";
import ManageUPosts from "./administrarUsuarios";
import { supabase } from "../../../lib/supabase";

function App() {
  const [currentPage, setCurrentPage] = useState("upload");
  const [userRole, setUserRole] = useState<number | null>(null); // Estado para el rol
  const [loading, setLoading] = useState(true); // Estado de carga

  // Obtener el rol del usuario desde Supabase
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData?.user) {
          console.error("Error obteniendo el usuario autenticado:", userError);
          setLoading(false);
          return;
        }

        const userId = userData.user.id;

        // Consultar la tabla investigadores para obtener el rol
        const { data, error } = await supabase
          .from("investigadores")
          .select("rol")
          .eq("id_cuenta", userId)
          .single();

        if (error || !data) {
          console.error("Error obteniendo el rol del usuario:", error);
          setLoading(false);
          return;
        }

        setUserRole(data.rol); // Guardar el rol
      } catch (err) {
        console.error("Error inesperado:", err);
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se obtiene el rol
  }

  return (
    <div className="flex min-h-screen bg-[#e9f2f6]">
      {/* Pasar el rol del usuario al Sidebar */}
      <Sidebar onNavigate={setCurrentPage} userRole={userRole} />
      <main className="flex-1">
        {currentPage === "upload" && <UploadPost />}
        {currentPage === "manage" && <ManagePosts />}
        {/* Mostrar la página solo si el rol es 1 */}
        {currentPage === "manageU" && userRole === 1 && <ManageUPosts />}
      </main>
    </div>
  );
}

export default App;
