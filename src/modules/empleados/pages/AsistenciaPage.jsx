import React, { useState } from "react";

const AsistenciaPage = () => {
  const [asistencia, setAsistencia] = useState([
    { id: 1, nombre: "Carlos Gómez", estado: "Presente", fecha: "2024-02-01" },
    { id: 2, nombre: "Ana Pérez", estado: "Ausente", fecha: "2024-02-01" },
    { id: 3, nombre: "Luis Ramírez", estado: "Presente", fecha: "2024-02-01" },
  ]);

  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar asistencia según el estado y la búsqueda
  const asistenciaFiltrada = asistencia.filter((reg) => {
    const coincideEstado =
      filtroEstado === "Todos" || reg.estado === filtroEstado;
    const coincideBusqueda = reg.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });

  // Cambiar el estado de un empleado
  const cambiarEstado = (id, nuevoEstado) => {
    setAsistencia(
      asistencia.map((reg) =>
        reg.id === id ? { ...reg, estado: nuevoEstado } : reg
      )
    );
  };

  // Agregar un nuevo registro de asistencia
  const agregarAsistencia = (nuevoRegistro) => {
    setAsistencia([...asistencia, nuevoRegistro]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        📝 Registro de Asistencia
      </h3>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar empleado..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos</option>
          <option value="Presente">Presente</option>
          <option value="Ausente">Ausente</option>
        </select>
      </div>

      {/* Tabla de asistencia */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Empleado
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Estado
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600 hidden sm:table-cell">
                Fecha
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {asistenciaFiltrada.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {reg.nombre}
                </td>
                <td className="p-2 md:p-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium 
                      ${
                        reg.estado === "Presente"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    {reg.estado}
                  </span>
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800 hidden sm:table-cell">
                  {reg.fecha}
                </td>
                <td className="p-2 md:p-3 flex gap-2">
                  <button
                    onClick={() =>
                      cambiarEstado(
                        reg.id,
                        reg.estado === "Presente" ? "Ausente" : "Presente"
                      )
                    }
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Cambiar Estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario para agregar nueva asistencia */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">➕ Agregar Nueva Asistencia</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const nuevoRegistro = {
              id: asistencia.length + 1,
              nombre: e.target.nombre.value,
              estado: "Presente",
              fecha: new Date().toISOString().split("T")[0],
            };
            agregarAsistencia(nuevoRegistro);
            e.target.reset();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del empleado"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Registrar Asistencia
          </button>
        </form>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Empleados</p>
          <p className="text-2xl font-bold">{asistencia.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Presentes</p>
          <p className="text-2xl font-bold text-green-600">
            {asistencia.filter((reg) => reg.estado === "Presente").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Ausentes</p>
          <p className="text-2xl font-bold text-red-600">
            {asistencia.filter((reg) => reg.estado === "Ausente").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Última Actualización</p>
          <p className="text-xl font-bold">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AsistenciaPage;