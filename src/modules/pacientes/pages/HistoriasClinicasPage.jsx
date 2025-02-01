import React, { useState } from "react";
import { Link } from "react-router-dom";
import pacientesMockData from "../../../data/pacientesData";

const HistoriasClinicasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("Todas");

  // Filtrar pacientes por nombre y especie
  const filteredPacientes = pacientesMockData.filter((paciente) => {
    const coincideNombre = paciente.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const coincideEspecie =
      filtroEspecie === "Todas" || paciente.especie === filtroEspecie;
    return coincideNombre && coincideEspecie;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">📖 Historias Clínicas</h2>
      <p className="text-gray-600 mb-6">Lista de pacientes y sus historias clínicas.</p>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Buscar paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroEspecie}
          onChange={(e) => setFiltroEspecie(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todas">Todas las especies</option>
          {[...new Set(pacientesMockData.map((p) => p.especie))].map(
            (especie, index) => (
              <option key={index} value={especie}>
                {especie}
              </option>
            )
          )}
        </select>
      </div>

      {/* Tabla de pacientes */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full bg-white">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                ID
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Nombre
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Especie
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Última Consulta
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPacientes.length > 0 ? (
              filteredPacientes.map((paciente) => (
                <tr
                  key={paciente.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {paciente.id}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {paciente.nombre}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {paciente.especie}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {paciente.ultimaConsulta}
                  </td>
                  <td className="p-2 md:p-3">
                    <Link
                      to={`/dashboard/pacientes/detalle/${paciente.id}`}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Ver Detalles
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">
                  No se encontraron pacientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Pacientes</p>
          <p className="text-2xl font-bold">{pacientesMockData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Perros</p>
          <p className="text-2xl font-bold">
            {pacientesMockData.filter((p) => p.especie === "Perro").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Gatos</p>
          <p className="text-2xl font-bold">
            {pacientesMockData.filter((p) => p.especie === "Gato").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Otras Especies</p>
          <p className="text-2xl font-bold">
            {
              pacientesMockData.filter(
                (p) => p.especie !== "Perro" && p.especie !== "Gato"
              ).length
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoriasClinicasPage;