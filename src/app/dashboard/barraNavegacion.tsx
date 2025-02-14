"use client";
import React from "react";
import { Layout, Upload, FileText } from "lucide-react";

const Sidebar = ({
  onNavigate,
  userRole,
}: {
  onNavigate: (page: string) => void;
  userRole: number | null; // Recibimos el rol del usuario como prop
}) => {
  return (
    <div className="min-h-screen w-64 bg-[#0C2430] text-white p-6 flex flex-col">
      <div className="w-full flex items-center rounded-lg gap-3 mb-10 px-4 py-3">
        <Layout className="w-8 h-8 text-blue-400" />
        <span>Mis cosas</span>
      </div>

      <nav className="flex-1">
        <button
          onClick={() => onNavigate("upload")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#d98e04a5] transition-colors mb-2"
        >
          <Upload className="w-5 h-5 text-blue-400" />
          <span>Subir investigaciones</span>
        </button>

        <button
          onClick={() => onNavigate("manage")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#d98e04a5] transition-colors"
        >
          <FileText className="w-5 h-5 text-blue-400" />
          <span>Administrar investigaciones</span>
        </button>

        {/* Mostrar el botón solo si el rol del usuario es 1 */}
        {userRole === 1 && (
          <button
            onClick={() => onNavigate("manageU")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#d98e04a5] transition-colors"
          >
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Administrar usuarios</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
