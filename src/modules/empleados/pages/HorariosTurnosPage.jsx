import React, { useState } from "react";

const HorariosTurnosPage = () => {
  const [horarios, setHorarios] = useState([
    { id: 1, nombre: "Carlos Gómez", turno: "Mañana (08:00 - 14:00)" },
    { id: 2, nombre: "Ana Pérez", turno: "Tarde (14:00 - 20:00)" },
    { id: 3, nombre: "Luis Ramírez", turno: "Mañana (08:00 - 14:00)" },
  ]);

  const [filtroTurno, setFiltroTurno] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar horarios según el turno y la búsqueda
  const horariosFiltrados = horarios.filter((horario) => {
    const coincideTurno =
      filtroTurno === "Todos" || horario.turno.includes(filtroTurno);
    const coincideBusqueda = horario.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideTurno && coincideBusqueda;
  });

  // Agregar un nuevo horario
  const agregarHorario = (nuevoHorario) => {
    setHorarios([...horarios, nuevoHorario]);
  };

  // Eliminar un horario
  const eliminarHorario = (id) => {
    setHorarios(horarios.filter((horario) => horario.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        ⏰ Gestión de Horarios y Turnos
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
          value={filtroTurno}
          onChange={(e) => setFiltroTurno(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos los turnos</option>
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
        </select>
      </div>

      {/* Tabla de horarios */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Empleado
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Turno
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {horariosFiltrados.map((horario) => (
              <tr key={horario.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {horario.nombre}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {horario.turno}
                </td>
                <td className="p-2 md:p-3">
                  <button
                    onClick={() => eliminarHorario(horario.id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario para agregar nuevo horario */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">➕ Agregar Nuevo Horario</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const nuevoHorario = {
              id: horarios.length + 1,
              nombre: e.target.nombre.value,
              turno: e.target.turno.value,
            };
            agregarHorario(nuevoHorario);
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
          <select
            name="turno"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Mañana (08:00 - 14:00)">Mañana (08:00 - 14:00)</option>
            <option value="Tarde (14:00 - 20:00)">Tarde (14:00 - 20:00)</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Agregar Horario
          </button>
        </form>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Empleados</p>
          <p className="text-2xl font-bold">{horarios.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Turno Mañana</p>
          <p className="text-2xl font-bold">
            {horarios.filter((horario) => horario.turno.includes("Mañana")).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Turno Tarde</p>
          <p className="text-2xl font-bold">
            {horarios.filter((horario) => horario.turno.includes("Tarde")).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HorariosTurnosPage;