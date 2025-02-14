"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; // Asegúrate de importar tu instancia de Supabase
import { Pencil, Trash2 } from "lucide-react";

type Investigacion = {
  id: number;
  nombre: string;
  categoria: string;
  fecha_publicacion: string;
};

const ManagePosts = () => {
  const [posts, setPosts] = useState<Investigacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null); // Estado para almacenar el ID del usuario logueado

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setLoading(true);

      try {
        // Obtén la sesión del usuario logueado
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error al obtener la sesión:", sessionError.message);
          return;
        }

        const currentUser = session?.user;

        if (!currentUser) {
          console.warn("No hay un usuario logueado");
          return;
        }

        // Almacena el ID del usuario logueado
        setUserId(currentUser.id);

        // Filtra las investigaciones por id_autor
        const { data, error } = await supabase
          .from("investigaciones")
          .select("id, nombre, categoria, fecha_publicacion")
          .eq("id_autor", currentUser.id); // Filtra por id_autor que coincida con el usuario logueado

        if (error) {
          console.error("Error al obtener investigaciones:", error.message);
          return;
        }

        if (data) {
          setPosts(data); // Actualiza el estado con los datos obtenidos
        }
      } catch (err) {
        console.error("Error inesperado:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta investigación?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("investigaciones")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error al eliminar la investigación:", error.message);
        return;
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      alert("Investigación eliminada con éxito");
    } catch (err) {
      console.error("Error inesperado al eliminar:", err);
    }
  };

  if (loading) {
    return <div>Cargando investigaciones...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tus Investigaciones</h2>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4">Título</th>
            <th className="py-2 px-4">Categoría</th>
            <th className="py-2 px-4">Fecha</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t">
              <td className="py-2 px-4">{post.nombre}</td>
              <td className="py-2 px-4">{post.categoria}</td>
              <td className="py-2 px-4">
                {new Date(post.fecha_publicacion).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 flex gap-2">
                {/* <button className="text-blue-500 hover:underline">
                  <Pencil className="inline w-4 h-4 mr-1" />
                  Editar
                </button> */}
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:underline"
                >
                  <Trash2 className="inline w-4 h-4 mr-1" />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {posts.length === 0 && <p className="text-center mt-4">No tienes investigaciones disponibles.</p>}
    </div>
  );
};

export default ManagePosts;
