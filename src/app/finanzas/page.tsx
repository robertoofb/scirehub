"use client";
import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";
import {
  InvestigacionesType,
  ListaDeInvestigaciones,
} from "../../app/listaDeInvestigaciones";
import Footer from "../../app/footer";

export default function InvestigacionesBiotecnologia() {
  const [investigaciones, setInvestigaciones] = useState<InvestigacionesType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvestigaciones = async () => {
    try {
      const { data, error } = await supabase
        .from("investigaciones")
        .select("*")
        .eq("categoria", "Finanzas");

      if (error) {
        console.error("Error al obtener investigaciones:", error);
        setError(new Error("Hubo un error al obtener los datos."));
        return;
      }

      setInvestigaciones(data);
    } catch (error) {
      console.error("Error inesperado:", error);
      setError(new Error("Hubo un error inesperado."));
    }
  };

  useEffect(() => {
    fetchInvestigaciones();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[400px] bg-black mb-10">
        <img  
          src="https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/hero's/finanzas.jpg"
          alt="Finanzas Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute top-80 z-10 items-center justify-center h-full pl-6">
          <h1 className="text-4xl font-bold text-white text-start">
             Lista de Artículos de Finanzas
          </h1>
          <p className="text-start font-thin text-white">
          Analiza los avances y las investigaciones más relevantes en el 
          campo de las finanzas, donde el conocimiento impulsa decisiones 
          estratégicas para construir un futuro económico sólido y sostenible.
          </p>
        </div>
      </div>
      {/* Contenido principal */}
      <main className="flex-grow text-white">
        <div className="w-[1920px] max-w-full overflow-hidden mx-auto">
          {/* Pasar las investigaciones filtradas a ListaDeInvestigaciones */}
          <ListaDeInvestigaciones error={error} investigaciones={investigaciones} />
        </div>
      </main>
      <br></br>
      {/* Footer */}
      <Footer />
    </div>
  );
}
