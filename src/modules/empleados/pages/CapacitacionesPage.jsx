import React, { useState } from "react";

const CapacitacionesPage = () => {
  const [capacitaciones, setCapacitaciones] = useState([
    { id: 1, tema: "Manejo de Emergencias Veterinarias", fecha: "2024-02-10", instructor: "Dr. López" },
    { id: 2, tema: "Uso de Software de Gestión", fecha: "2024-03-05", instructor: "Ing. Herrera" },
    { id: 3, tema: "Atención al Cliente en Clínicas", fecha: "2024-04-12", instructor: "Lic. Jiménez" },
  ]);

  const [filtroInstructor, setFiltroInstructor] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar capacitaciones según el instructor y la búsqueda
  const capacitacionesFiltradas = capacitaciones.filter((cap) => {
    const coincideInstructor =
      filtroInstructor === "Todos" || cap.instructor === filtroInstructor;
    const coincideBusqueda = cap.tema
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideInstructor && coincideBusqueda;
  });

  // Agregar una nueva capacitación
  const agregarCapacitacion = (nuevaCapacitacion) => {
    setCapacitaciones([...capacitaciones, nuevaCapacitacion]);
  };

  // Eliminar una capacitación
  const eliminarCapacitacion = (id) => {
    setCapacitaciones(capacitaciones.filter((cap) => cap.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        📚 Capacitaciones del Personal
      </h3>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por tema..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroInstructor}
          onChange={(e) => setFiltroInstructor(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos los instructores</option>
          {[...new Set(capacitaciones.map((cap) => cap.instructor))].map(
            (instructor, index) => (
              <option key={index} value={instructor}>
                {instructor}
              </option>
            )
          )}
        </select>
      </div>

      {/* Tabla de capacitaciones */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Tema
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Fecha
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Instructor
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {capacitacionesFiltradas.map((cap) => (
              <tr key={cap.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {cap.tema}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {cap.fecha}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {cap.instructor}
                </td>
                <td className="p-2 md:p-3">
                  <button
                    onClick={() => eliminarCapacitacion(cap.id)}
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

      {/* Formulario para agregar nueva capacitación */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">➕ Agregar Nueva Capacitación</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const nuevaCapacitacion = {
              id: capacitaciones.length + 1,
              tema: e.target.tema.value,
              fecha: e.target.fecha.value,
              instructor: e.target.instructor.value,
            };
            agregarCapacitacion(nuevaCapacitacion);
            e.target.reset();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="tema"
            placeholder="Tema de la capacitación"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="fecha"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="instructor"
            placeholder="Nombre del instructor"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Agregar Capacitación
          </button>
        </form>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Capacitaciones</p>
          <p className="text-2xl font-bold">{capacitaciones.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Próxima Capacitación</p>
          <p className="text-xl font-bold">
            {capacitaciones.length > 0
              ? new Date(
                  Math.min(
                    ...capacitaciones.map((cap) => new Date(cap.fecha).getTime())
                  )
                ).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Instructores Activos</p>
          <p className="text-2xl font-bold">
            {[...new Set(capacitaciones.map((cap) => cap.instructor))].length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CapacitacionesPage;