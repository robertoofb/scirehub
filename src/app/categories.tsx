import React from "react";
import Link from "next/link"; // Asegúrate de importar Link si usas Next.js

const categories = [
  { name: "Biotecnología", image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/categories/biotecnologia.png?t=2024-12-06T17%3A22%3A56.079Z", path: "/biotecnologia" },
  { name: "Biomédica", image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/categories/biomedica.png?t=2024-12-06T17%3A23%3A13.790Z", path: "/biomedica" },
  { name: "Terapia Física", image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/categories/terapia-fisica.png?t=2024-12-06T17%3A23%3A29.972Z", path: "/terapia-fisica" },
  { name: "Administración", image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/categories/administracion.png?t=2024-12-06T17%3A23%3A53.985Z", path: "/administracion" },
  { name: "Software", image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/categories/software.png?t=2024-12-06T17%3A24%3A02.612Z", path: "/software" },
  { name: "Finanzas", image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/categories/finanzas.png?t=2024-12-06T17%3A24%3A09.573Z", path: "/finanzas" },
];

export const Categories: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-8 py-6 px-4 sm:px-8 md:px-16 lg:px-20 items-center justify-center">
      {categories.map((category, index) => (
        <Link key={index} href={category.path}>
          <button className="flex flex-col items-center p-3 sm:p-4 md:p-5 hover:bg-[#D98E04] rounded-xl transition-all">
            <img
              src={category.image}
              alt={category.name}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-2 object-contain"
            />
            <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center">
              {category.name}
            </span>
          </button>
        </Link>
      ))}
    </div>
  );
  
};

export default Categories;
