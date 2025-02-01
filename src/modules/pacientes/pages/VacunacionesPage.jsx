import React, { useState } from "react";
import vacunasMockData from "../../../data/vacunasData";

const VacunacionesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [vacunas, setVacunas] = useState(vacunasMockData);
  const [nuevaVacuna, setNuevaVacuna] = useState({
    paciente: "",
    tipo: "",
    fechaAplicacion: "",
    proximaDosis: "",
  });
  const [editando, setEditando] = useState(null);

  // Filtrar vacunas por nombre de paciente y tipo de vacuna
  const filteredVacunas = vacunas.filter((vacuna) => {
    const coincidePaciente = vacuna.paciente
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const coincideTipo =
      filtroTipo === "Todos" || vacuna.tipo === filtroTipo;
    return coincidePaciente && coincideTipo;
  });

  // Agregar una nueva vacuna
  const agregarVacuna = (e) => {
    e.preventDefault();
    if (
      !nuevaVacuna.paciente ||
      !nuevaVacuna.tipo ||
      !nuevaVacuna.fechaAplicacion ||
      !nuevaVacuna.proximaDosis
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const vacuna = {
      id: vacunas.length + 1,
      ...nuevaVacuna,
    };
    setVacunas([...vacunas, vacuna]);
    setNuevaVacuna({ paciente: "", tipo: "", fechaAplicacion: "", proximaDosis: "" });
  };

  // Eliminar una vacuna
  const eliminarVacuna = (id) => {
    setVacunas(vacunas.filter((v) => v.id !== id));
  };

  // Editar una vacuna
  const editarVacuna = (vacuna) => {
    setEditando(vacuna);
    setNuevaVacuna({
      paciente: vacuna.paciente,
      tipo: vacuna.tipo,
      fechaAplicacion: vacuna.fechaAplicacion,
      proximaDosis: vacuna.proximaDosis,
    });
  };

  // Guardar cambios al editar
  const guardarEdicion = (e) => {
    e.preventDefault();
    setVacunas(
      vacunas.map((v) =>
        v.id === editando.id ? { ...v, ...nuevaVacuna } : v
      )
    );
    setEditando(null);
    setNuevaVacuna({ paciente: "", tipo: "", fechaAplicacion: "", proximaDosis: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">💉 Vacunaciones</h2>
      <p className="text-gray-600 mb-6">Registro de vacunaciones de los pacientes.</p>

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
          {[...new Set(vacunas.map((v) => v.tipo))].map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      {/* Formulario para agregar o editar vacunas */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editando ? "✏️ Editar Vacuna" : "➕ Agregar Nueva Vacuna"}
        </h3>
        <form onSubmit={editando ? guardarEdicion : agregarVacuna} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del paciente"
            value={nuevaVacuna.paciente}
            onChange={(e) =>
              setNuevaVacuna({ ...nuevaVacuna, paciente: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Tipo de vacuna"
            value={nuevaVacuna.tipo}
            onChange={(e) =>
              setNuevaVacuna({ ...nuevaVacuna, tipo: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            placeholder="Fecha de aplicación"
            value={nuevaVacuna.fechaAplicacion}
            onChange={(e) =>
              setNuevaVacuna({ ...nuevaVacuna, fechaAplicacion: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            placeholder="Próxima dosis"
            value={nuevaVacuna.proximaDosis}
            onChange={(e) =>
              setNuevaVacuna({ ...nuevaVacuna, proximaDosis: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            {editando ? "Guardar Cambios" : "Agregar Vacuna"}
          </button>
          {editando && (
            <button
              type="button"
              onClick={() => {
                setEditando(null);
                setNuevaVacuna({ paciente: "", tipo: "", fechaAplicacion: "", proximaDosis: "" });
              }}
              className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      {/* Tabla de vacunas */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
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
                Vacuna
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Fecha Aplicada
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Próxima Dosis
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVacunas.length > 0 ? (
              filteredVacunas.map((vacuna) => (
                <tr
                  key={vacuna.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {vacuna.id}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {vacuna.paciente}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {vacuna.tipo}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {vacuna.fechaAplicacion}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {vacuna.proximaDosis}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    <button
                      onClick={() => editarVacuna(vacuna)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarVacuna(vacuna.id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-600">
                  No se encontraron vacunas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Vacunas</p>
          <p className="text-2xl font-bold">{vacunas.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Vacunas Aplicadas</p>
          <p className="text-2xl font-bold text-green-600">
            {vacunas.filter((v) => v.fechaAplicacion).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Próximas Dosis</p>
          <p className="text-2xl font-bold text-yellow-600">
            {vacunas.filter((v) => v.proximaDosis).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Tipos de Vacunas</p>
          <p className="text-2xl font-bold">
            {[...new Set(vacunas.map((v) => v.tipo))].length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacunacionesPage;