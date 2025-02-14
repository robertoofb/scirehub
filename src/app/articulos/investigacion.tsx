import Image from "next/image";
import { useState, useEffect } from "react";
import { Badge } from "@/app/articulos/ui/badge";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";

export type InvestigacionType = {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_publicacion: string;
  archivo: string;
  id_autor: string; // Debe ser UUID
  imagen_url: string;
  categoria: string;
};

export interface InvestigacionProps {
  data: InvestigacionType;
}

export const Investigacion = ({ data }: InvestigacionProps) => {
  const {
    archivo,
    descripcion,
    fecha_publicacion,
    nombre,
    imagen_url,
    categoria,
    id_autor,
  } = data;

  const publicImageUrl = `https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/inv/${imagen_url}`;
  const publicPdfUrl = `https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/inv/${archivo}`;

  const [isDownloading, setIsDownloading] = useState(false);
  const [autorData, setAutorData] = useState<{
    nombre: string;
    imagen: string;
    titulo: string;
  } | null>(null);

  useEffect(() => {
    const fetchAutorData = async () => {
      try {
        const { data, error } = await supabase
          .from("investigadores") // Asegúrate de que esta es la tabla correcta
          .select("nombre, imagen") // Campos que necesitas obtener
          .eq("id_cuenta", id_autor) // Relación con id_autor
          .single(); // Esperas un único resultado

        if (error) {
          console.error("Error al obtener datos del autor:", error.message);
          return;
        }

        if (!data) {
          console.warn("No se encontraron datos para el autor con id_cuenta:", id_autor);
          return;
        }

        console.log("Datos del autor obtenidos:", data);
        setAutorData(data); // Almacena los datos obtenidos
      } catch (err) {
        console.error("Error inesperado al obtener datos del autor:", err);
      }
    };

    if (id_autor) {
      fetchAutorData();
    }
  }, [id_autor]);


  const handleDownload = () => {
    setIsDownloading(true);
    window.open(publicPdfUrl, "_blank");
    setIsDownloading(false);
  };

  return (
    <div className="shadow-lg rounded-lg p-3 gap-x-6 h-full bg-[#1C323D] flex flex-col">
      {/* Contenido principal */}
      <div className="flex-1 flex-col gap-2 text-lg">
        <div className="max-h-[300px] overflow-hidden rounded-lg">
          <Image
            className="rounded-lg"
            src={publicImageUrl}
            alt={nombre}
            width={900}
            height={300}
          />
        </div>
        <div className="font-bold">{nombre}</div>
        <div className="text-justify">{descripcion}</div>
      </div>
      {/* Sección inferior */}
      <div className="mt-4">
        <div className="text-gray-300 text-sm text-end">
          {new Date(fecha_publicacion).toDateString()}
        </div>
        <div className="text-black text-end">
          <Badge variant="secondary">{categoria}</Badge>
        </div>
        <div className="flex justify-start">
          {autorData ? (
            <div className="mt-4 flex items-center gap-4 pt-3">
              <Link href={`/profiles/${id_autor}`} passHref>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={autorData.imagen}
                  alt={autorData.nombre}
                  width={32}
                  height={32}
                />
              </Link>
              <Link href={`/profiles/${id_autor}`} passHref>
                <div className="font-bold">{autorData.nombre}</div>
              </Link>
            </div>
          ) : (
            <div className="mt-4 text-center text-gray-400">
              Información del autor no disponible.
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center border-t border-slate-700 pt-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="text-black bg-[#4C8CA5] hover:bg-[#D98E04] text-center flex px-3 py-2 rounded-md text-nowrap text-white"
          >
            {isDownloading ? "Abriendo..." : "Abrir PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};
