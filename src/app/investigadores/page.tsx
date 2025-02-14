"use client";
import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";
import Footer from "../footer";
import Investigadores from "./investigador";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInvestigadores = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(`
            id,
            full_name,
            bio,
            avatar_url
          `);

        if (error) {
          console.error("Error fetching profiles data:", error);
          return;
        }
        setData(data);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchInvestigadores();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenido principal */}
      <main className="flex-grow text-white">
        <Investigadores data={data} />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
