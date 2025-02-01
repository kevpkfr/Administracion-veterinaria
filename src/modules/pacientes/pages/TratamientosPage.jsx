import React, { useState } from "react";
import tratamientosMockData from "../../../data/tratamientosData";

const TratamientosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroDiagnostico, setFiltroDiagnostico] = useState("Todos");

  // Filtrar tratamientos por nombre de paciente y diagnóstico
  const filteredTratamientos = tratamientosMockData.filter((tratamiento) => {
    const coincidePaciente = tratamiento.paciente
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const coincideDiagnostico =
      filtroDiagnostico === "Todos" || tratamiento.diagnostico === filtroDiagnostico;
    return coincidePaciente && coincideDiagnostico;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">💊 Tratamientos</h2>
      <p className="text-gray-600 mb-6">Lista de tratamientos aplicados a los pacientes.</p>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Buscar por paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroDiagnostico}
          onChange={(e) => setFiltroDiagnostico(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos los diagnósticos</option>
          {[...new Set(tratamientosMockData.map((t) => t.diagnostico))].map(
            (diagnostico, index) => (
              <option key={index} value={diagnostico}>
                {diagnostico}
              </option>
            )
          )}
        </select>
      </div>

      {/* Tabla de tratamientos */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full bg-white">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                ID
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Paciente
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Diagnóstico
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Tratamiento
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Duración
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTratamientos.length > 0 ? (
              filteredTratamientos.map((tratamiento) => (
                <tr
                  key={tratamiento.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {tratamiento.id}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {tratamiento.paciente}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {tratamiento.diagnostico}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {tratamiento.tratamiento}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {tratamiento.duracion}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">
                  No se encontraron tratamientos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Tratamientos</p>
          <p className="text-2xl font-bold">{tratamientosMockData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Tratamientos Activos</p>
          <p className="text-2xl font-bold text-green-600">
            {
              tratamientosMockData.filter((t) =>
                t.duracion.toLowerCase().includes("activo")
              ).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Tratamientos Completados</p>
          <p className="text-2xl font-bold text-blue-600">
            {
              tratamientosMockData.filter((t) =>
                t.duracion.toLowerCase().includes("completado")
              ).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Otros Tratamientos</p>
          <p className="text-2xl font-bold">
            {
              tratamientosMockData.filter(
                (t) =>
                  !t.duracion.toLowerCase().includes("activo") &&
                  !t.duracion.toLowerCase().includes("completado")
              ).length
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default TratamientosPage;