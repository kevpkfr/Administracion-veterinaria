import React, { useState } from "react";

const AsistenciaUsuariosPage = () => {
  const [asistencia, setAsistencia] = useState([
    { id: 1, nombre: "Dr. Juan Pérez", estado: "Presente" },
    { id: 2, nombre: "Ana López", estado: "Ausente" },
  ]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">📅 Asistencia del Personal</h2>

      {/* Tabla para pantallas grandes */}
      <div className="hidden sm:block">
        <table className="w-full bg-white border shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencia.map((empleado) => (
              <tr key={empleado.id} className="border-b">
                <td className="p-2">{empleado.nombre}</td>
                <td className="p-2">{empleado.estado}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg">✔️ Marcar Presente</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg">❌ Marcar Ausente</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista de tarjetas para pantallas pequeñas */}
      <div className="block sm:hidden">
        {asistencia.map((empleado) => (
          <div key={empleado.id} className="bg-white border shadow-md rounded-lg p-4 mb-4">
            <div className="mb-2">
              <span className="font-semibold">Nombre:</span> {empleado.nombre}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Estado:</span> {empleado.estado}
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg flex-1">✔️ Presente</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg flex-1">❌ Ausente</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsistenciaUsuariosPage;