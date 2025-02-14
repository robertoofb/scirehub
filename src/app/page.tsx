"use client";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import {
  InvestigacionesType,
  ListaDeInvestigaciones,
} from "./listaDeInvestigaciones";
import Footer from "./footer";
import Hero from "./hero";
import Categories from "./categories";

export default function Investigaciones() {
  const [investigaciones, setInvestigaciones] = useState<InvestigacionesType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvestigaciones = async () => {
    try {
      const { data, error } = await supabase.from("investigaciones").select("*");

      if (error) {
        console.error("Error al obtener investigaciones:", error);
        setError(new Error("Hubo un error."));
        return;
      }

      setInvestigaciones(data);
    } catch (error) {
      console.error(error);
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
      {/* Contenido principal */}
      <main className="flex-grow text-white">
        <div className="w-[1920px] max-w-full overflow-hidden mx-auto">
          <Hero />
          <Categories/>
          <ListaDeInvestigaciones error={error} investigaciones={investigaciones} />
        </div>
      </main>
      <br></br>
      {/* Footer */}
      <Footer />
    </div>
  );
}
