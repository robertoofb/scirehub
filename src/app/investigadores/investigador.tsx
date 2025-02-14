import Link from "next/link";
import { Card } from "@/app/articulos/ui/card";
import { UserCircle2 } from "lucide-react";

export default function Investigadores({ data }) {
  if (!data) {
    return <p className="text-center text-gray-400">Cargando datos...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0c2430] text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold border-none pb-2">
          Investigadores Destacados
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((investigador) => (
            <Card
              key={investigador.id}
              className="bg-white border-none bg-opacity-10 p-6 rounded-lg space-y-4"
            >
              <Link href={`/profiles/${investigador.id}`} passHref>
                <div className="cursor-pointer">
                  <div className="flex flex-col text-white items-center space-y-4">
                    {/* Imagen del Investigador */}
                    <div className="relative w-32 h-32">
                      {investigador.avatar_url ? (
                        <img
                          src={investigador.avatar_url}
                          alt={investigador.full_name}
                          className="rounded-full object-cover w-32 h-32" // Asegura que las dimensiones sean iguales
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-600 flex items-center justify-center rounded-full">
                          <UserCircle2 className="text-white w-16 h-16" />
                        </div>
                      )}
                    </div>
                    {/* Nombre e Icono */}
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">
                        {investigador.full_name}
                      </h3>
                      <UserCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
