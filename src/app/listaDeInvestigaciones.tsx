"use client";
import { Investigacion, InvestigacionType } from "./investigacion";

export type InvestigacionesType = Array<InvestigacionType>;

export interface ListaDeInvestigacionesProps {
  investigaciones: InvestigacionesType | null;
  error: Error | null;
}

export const ListaDeInvestigaciones = ({
  error,
  investigaciones,
}: ListaDeInvestigacionesProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-2 gap-8 justify-start items-start w-full">
        {investigaciones != null &&
          investigaciones
          .sort(
            (a, b) =>
              new Date(b.fecha_publicacion).getTime() -
              new Date(a.fecha_publicacion).getTime()
          ) // Ordenar del más reciente al más antiguo
          .map((data, i) => (
            <Investigacion data={data} key={`investigacion-${i}`} />
          ))}
        {error != null && error.message}
      </div>
    </div>
  );
};
