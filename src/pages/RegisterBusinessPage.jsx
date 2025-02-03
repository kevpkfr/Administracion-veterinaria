/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterBusinessPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/initial-setup"); // Redirigir a la configuración inicial después del registro
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf5f0]">
      {/* Contenedor principal */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Título y descripción */}
        <h2 className="text-3xl font-bold text-center text-[#E76F24] mb-4">Registro del Negocio</h2>
        <p className="text-center text-gray-600 mb-6">
          Completa este registro para comenzar a usar la aplicación.
        </p>

        {/* Formulario de registro */}
        <form className="space-y-6">
          {/* Nombre del Negocio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Negocio:</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-[#FF8C42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]"
              placeholder="Ej: Mi Veterinaria"
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico:</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#FF8C42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]"
              placeholder="Ej: contacto@vet.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono:</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-[#FF8C42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]"
              placeholder="Ej: +52 123 456 7890"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección:</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-[#FF8C42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]"
              placeholder="Ej: Calle 123, Ciudad"
            />
          </div>

          {/* Botón de registro */}
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-[#FF8C42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E76F24] transition duration-300 transform hover:scale-105"
          >
            Registrar Negocio
          </button>
        </form>
      </div>

      {/* Enlace de ayuda o soporte */}
      <p className="mt-6 text-sm text-gray-600">
        ¿Necesitas ayuda?{" "}
        <a href="#" className="text-[#FF8C42] hover:underline">
          Contáctanos
        </a>
      </p>
    </div>
  );
};

export default RegisterBusinessPage;
