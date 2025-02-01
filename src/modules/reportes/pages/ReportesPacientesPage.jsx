import React, { useState } from "react";

const ReportesPacientesPage = () => {
  const [pacientes] = useState([
    { id: 1, nombre: "Max", especie: "Perro", dueño: "Juan Pérez" },
    { id: 2, nombre: "Mia", especie: "Gato", dueño: "Ana López" },
    { id: 3, nombre: "Rocky", especie: "Perro", dueño: "Carlos Ramírez" },
    { id: 4, nombre: "Luna", especie: "Gato", dueño: "Laura Gómez" },
    { id: 5, nombre: "Rex", especie: "Perro", dueño: "David Martínez" },
    { id: 6, nombre: "Bella", especie: "Conejo", dueño: "Sofía Herrera" },
    { id: 7, nombre: "Kira", especie: "Gato", dueño: "Martín Rodríguez" },
    { id: 8, nombre: "Bruno", especie: "Perro", dueño: "Elena Fernández" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [especieFiltro, setEspecieFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const pacientesPorPagina = 5;

  // Filtrar pacientes por búsqueda y especie seleccionada
  const pacientesFiltrados = pacientes.filter((paciente) => {
    const cumpleBusqueda = busqueda === "" || paciente.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleEspecie = especieFiltro === "" || paciente.especie === especieFiltro;
    return cumpleBusqueda && cumpleEspecie;
  });

  // Calcular la paginación
  const totalPaginas = Math.ceil(pacientesFiltrados.length / pacientesPorPagina);
  const inicio = (paginaActual - 1) * pacientesPorPagina;
  const pacientesPaginados = pacientesFiltrados.slice(inicio, inicio + pacientesPorPagina);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🐾 Reporte de Pacientes</h2>
      <p className="text-gray-600 mb-6">Listado de pacientes registrados en la veterinaria.</p>

      {/* 🔎 Filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <select
          value={especieFiltro}
          onChange={(e) => setEspecieFiltro(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        >
          <option value="">Todas las especies</option>
          <option value="Perro">Perros</option>
          <option value="Gato">Gatos</option>
          <option value="Conejo">Conejos</option>
        </select>
      </div>

      {/* 📊 Tabla de Pacientes */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-3 text-left">🐶 Nombre</th>
              <th className="border p-3 text-left">🦴 Especie</th>
              <th className="border p-3 text-left">👤 Dueño</th>
            </tr>
          </thead>
          <tbody>
            {pacientesPaginados.length > 0 ? (
              pacientesPaginados.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-gray-100">
                  <td className="border p-3">{paciente.nombre}</td>
                  <td className="border p-3">{paciente.especie}</td>
                  <td className="border p-3">{paciente.dueño}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No hay resultados para los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 mx-1 rounded ${paginaActual === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            ⬅️ Anterior
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded">
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            className={`px-4 py-2 mx-1 rounded ${paginaActual === totalPaginas ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportesPacientesPage;
