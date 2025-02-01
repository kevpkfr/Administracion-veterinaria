import React, { useState } from "react";

const CapacitacionesUsuariosPage = () => {
  const [capacitaciones] = useState([
    { id: 1, titulo: "Manejo de Emergencias", fecha: "2024-02-15", instructor: "Dr. Fernández" },
    { id: 2, titulo: "Actualización en Cirugías", fecha: "2024-03-10", instructor: "Dra. Ramírez" },
  ]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">📚 Capacitaciones</h2>
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition-colors">
        ➕ Agregar Capacitación
      </button>

      {/* Tabla para pantallas grandes */}
      <div className="hidden sm:block">
        <table className="w-full bg-white border shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Título</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Instructor</th>
            </tr>
          </thead>
          <tbody>
            {capacitaciones.map((capacitacion) => (
              <tr key={capacitacion.id} className="border-b">
                <td className="p-2">{capacitacion.titulo}</td>
                <td className="p-2">{capacitacion.fecha}</td>
                <td className="p-2">{capacitacion.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista de tarjetas para pantallas pequeñas */}
      <div className="block sm:hidden">
        {capacitaciones.map((capacitacion) => (
          <div key={capacitacion.id} className="bg-white border shadow-md rounded-lg p-4 mb-4">
            <div className="mb-2">
              <span className="font-semibold">Título:</span> {capacitacion.titulo}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Fecha:</span> {capacitacion.fecha}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Instructor:</span> {capacitacion.instructor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapacitacionesUsuariosPage;