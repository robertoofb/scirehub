"use client";
import React from "react";
import { crearInvestigacion } from "./actions";

const UploadPost = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      // Verificar que los campos esenciales estén presentes
      if (!formData.get("nombre") || !formData.get("descripcion") || !formData.get("categoria")) {
        throw new Error("Por favor, complete todos los campos obligatorios.");
      }

      console.log("Datos del formulario antes de enviarlos:", {
        nombre: formData.get("nombre"),
        descripcion: formData.get("descripcion"),
        id_autor: formData.get("id_autor"),
        fechaPublicacion: formData.get("fechaPublicacion"),
        archivo: formData.get("archivo"),
        imagenUrl: formData.get("imagenUrl"),
        categoria: formData.get("categoria"),
      });

      await crearInvestigacion(formData);

      console.log("Investigación creada con éxito.");
      alert("Investigación publicada con éxito");
    } catch (error) {
      console.error("Error al publicar la investigación:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Error desconocido"}`
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Subir una nueva investigación</h2>
      <form
        className="bg-white rounded-lg shadow-md p-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium mb-2 text-blue-600"
          >
            Título
          </label>
          <input
            type="text"
            name="nombre"
            required
            className="bg-[#f9f9f9] w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ingrese el nombre de la investigación"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-blue-600 mb-2"
          >
            Descripción
          </label>
          <textarea
            name="descripcion"
            required
            className="bg-[#f9f9f9] w-full px-4 py-2 border border-gray-300 rounded-lg h-40"
            placeholder="Escribe una breve descripción"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="fechaPublicacion"
            className="block text-sm font-medium text-blue-600 mb-2"
          >
            Fecha de publicación
          </label>
          <input
            type="date"
            name="fechaPublicacion"
            required
            className="bg-[#f9f9f9] w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="autor"
            className="block text-sm font-medium text-blue-600 mb-2"
          >
            Autor
          </label>
          <input
            type="text"
            name="autor"
            required
            className="bg-[#f9f9f9] w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Autor de la investigación"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="archivo"
            className="block text-sm font-medium text-blue-600 mb-2"
          >
            Archivo (PDF)
          </label>
          <input
            type="file"
            name="archivo"
            accept="application/pdf"
            required
            className="block w-full text-sm text-black"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="imagenUrl"
            className="block text-sm font-medium text-blue-600 mb-2"
          >
            Imagen (JPEG)
          </label>
          <input
            type="file"
            name="imagenUrl"
            accept="image/*"
            required
            className="block w-full text-sm text-black"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-blue-600 mb-2"
          >
            Categoría
          </label>
          <select
            name="categoria"
            className="bg-[#f9f9f9] w-full px-4 py-1 border border-gray-300 rounded-lg"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            <option value="Biotecnología">Biotecnología</option>
            <option value="Biomédica">Biomédica</option>
            <option value="Terapia Física">Terapia Física</option>
            <option value="Administración">Administración</option>
            <option value="Software">Software</option>
            <option value="Finanzas">Finanzas</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-[#1C323D] text-white rounded-lg hover:bg-[#D98E04]"
          >
            Publicar investigación
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPost;
