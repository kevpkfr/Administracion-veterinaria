import React, { useState } from "react";
import examenesMockData from "../../../data/examenesData";

const ExamenesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  // Filtrar exámenes por nombre de paciente y tipo de examen
  const filteredExamenes = examenesMockData.filter((examen) => {
    const coincidePaciente = examen.paciente
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const coincideTipo =
      filtroTipo === "Todos" || examen.tipo === filtroTipo;
    return coincidePaciente && coincideTipo;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">🩺 Exámenes Médicos</h2>
      <p className="text-gray-600 mb-6">Lista de exámenes médicos realizados a los pacientes.</p>

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
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos los tipos</option>
          {[...new Set(examenesMockData.map((e) => e.tipo))].map(
            (tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            )
          )}
        </select>
      </div>

      {/* Tabla de exámenes */}
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
                Tipo de Examen
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Fecha
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Resultados
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExamenes.length > 0 ? (
              filteredExamenes.map((examen) => (
                <tr
                  key={examen.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {examen.id}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {examen.paciente}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {examen.tipo}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {examen.fecha}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {examen.resultados}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">
                  No se encontraron exámenes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Exámenes</p>
          <p className="text-2xl font-bold">{examenesMockData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Exámenes de Sangre</p>
          <p className="text-2xl font-bold">
            {examenesMockData.filter((e) => e.tipo === "Sangre").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Exámenes de Imágenes</p>
          <p className="text-2xl font-bold">
            {examenesMockData.filter((e) => e.tipo === "Imágenes").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Otros Exámenes</p>
          <p className="text-2xl font-bold">
            {
              examenesMockData.filter(
                (e) => e.tipo !== "Sangre" && e.tipo !== "Imágenes"
              ).length
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamenesPage;