"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../utils/supabase/client";

const Header: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Obtener usuario actual al cargar la página
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData?.user || null);
    };

    fetchUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Limpieza
    return () => {
      data.subscription.unsubscribe();
    };

  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
<header className="bg-[#285568] text-white fixed top-0 left-0 w-full z-50 shadow-md">
  <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
    {/* Logos alineados a la izquierda */}
    <div className="flex items-center space-x-4 z-20"> {/* Añadimos z-20 aquí */}
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <img
            src="https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/header/ciencia.png?t=2024-12-06T17%3A17%3A34.360Z"
            width={40}
            height={40}
            alt="Logo"
            className="rounded-lg"
          />
          <span className="ml-3 text-lg font-semibold">ScireHub</span>
        </div>
      </Link>
    </div>
    
    {/* Logo en el centro */}
    <div className="absolute inset-x-0 flex justify-center items-center z-10">
      <Link href="https://upqroo.edu.mx">
        <img
          src="https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/hero's/LogoUpqroo.png?t=2024-12-09T03%3A02%3A34.739Z"
          width={120}
          height={40}
          alt="LogoUpqroo"
          className="rounded-lg"
        />
      </Link>
    </div>

    {/* Botón hamburguesa y menú alineados a la derecha */}
    <div className="flex items-center z-20"> {/* Añadimos z-20 aquí también */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden focus:outline-none"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menú */}
      <nav
        className={`${menuOpen ? "block" : "hidden"
          } lg:block absolute lg:relative bg-[#285568] lg:bg-transparent top-full left-0 w-full lg:w-auto p-6 lg:p-0 z-40 lg:z-auto`}
      >
        <ul className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <li>
            <Link href="/articulos" className="hover:text-slate-300">
              Artículos
            </Link>
          </li>
          <li>
            <Link href="/investigadores" className="hover:text-slate-300">
              Investigadores
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/profile" className="hover:text-slate-300">
                  Perfil
                </Link>
              </li>
              <li>
                <Link href="/">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    Cerrar sesión
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-slate-300">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link href="/access">
                  <button className="bg-[#4C8CA5] hover:bg-[#D98E04] text-white px-4 py-2 rounded-md font-semibold">
                    Regístrate
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  </div>
</header>

  );
};

export default Header;
