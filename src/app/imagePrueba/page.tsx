"use client";

import { useState, useEffect } from "react";
import { subirImagen } from "./actions";
import { supabase } from "../../../lib/supabase";

export default function ImagePruebaPage() {
  const [bucketImages, setBucketImages] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await subirImagen(formData);
      alert("Imagen subida con éxito.");
      fetchBucketImages(); // Actualizar la lista de imágenes después de subir
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen.");
    }
  };

  const fetchBucketImages = async () => {
    const { data, error } = await supabase.storage.from("nuevo_bucket").list("imagenes");

    if (error) {
      console.error("Error al obtener imágenes del bucket:", error.message);
      return;
    }

    const urls = data.map((file) => {
      const { data: publicUrlData } = supabase.storage
        .from("nuevo_bucket")
        .getPublicUrl(`imagenes/${file.name}`);
      return publicUrlData?.publicUrl || "";
    });

    setBucketImages(urls);
  };

  useEffect(() => {
    fetchBucketImages(); // Obtener las imágenes al cargar la página
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subir y Listar Imágenes del Bucket</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Subir Imagen</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Subir Imagen
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Imágenes en el Bucket</h2>
        <div className="grid grid-cols-2 gap-4">
          {bucketImages.length === 0 ? (
            <p className="text-gray-600">No hay imágenes en el bucket.</p>
          ) : (
            bucketImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Imagen ${index + 1}`}
                className="rounded shadow-md"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
