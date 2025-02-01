import React, { useState } from "react";
import empleados from "../../../data/empleados";

const GestionPersonalPage = () => {
  const [listaEmpleados, setListaEmpleados] = useState(empleados);
  const [filtroCargo, setFiltroCargo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar empleados según el cargo y la búsqueda
  const empleadosFiltrados = listaEmpleados.filter((empleado) => {
    const coincideCargo =
      filtroCargo === "Todos" || empleado.cargo === filtroCargo;
    const coincideBusqueda = empleado.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCargo && coincideBusqueda;
  });

  // Agregar un nuevo empleado
  const agregarEmpleado = (nuevoEmpleado) => {
    setListaEmpleados([...listaEmpleados, nuevoEmpleado]);
  };

  // Eliminar un empleado
  const eliminarEmpleado = (id) => {
    setListaEmpleados(listaEmpleados.filter((empleado) => empleado.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        👔 Lista de Empleados
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
          value={filtroCargo}
          onChange={(e) => setFiltroCargo(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos los cargos</option>
          {[...new Set(listaEmpleados.map((empleado) => empleado.cargo))].map(
            (cargo, index) => (
              <option key={index} value={cargo}>
                {cargo}
              </option>
            )
          )}
        </select>
      </div>

      {/* Tabla de empleados */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Nombre
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Cargo
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Teléfono
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {empleadosFiltrados.map((empleado) => (
              <tr key={empleado.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {empleado.nombre}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {empleado.cargo}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {empleado.telefono}
                </td>
                <td className="p-2 md:p-3">
                  <button
                    onClick={() => eliminarEmpleado(empleado.id)}
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

      {/* Formulario para agregar nuevo empleado */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">➕ Agregar Nuevo Empleado</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const nuevoEmpleado = {
              id: listaEmpleados.length + 1,
              nombre: e.target.nombre.value,
              cargo: e.target.cargo.value,
              telefono: e.target.telefono.value,
            };
            agregarEmpleado(nuevoEmpleado);
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
          <input
            type="text"
            name="cargo"
            placeholder="Cargo del empleado"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono del empleado"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Agregar Empleado
          </button>
        </form>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Empleados</p>
          <p className="text-2xl font-bold">{listaEmpleados.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Cargos Únicos</p>
          <p className="text-2xl font-bold">
            {[...new Set(listaEmpleados.map((empleado) => empleado.cargo))].length}
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

export default GestionPersonalPage;