import React, { useState, useEffect } from "react";
import { transaccionesMockData } from "../../../data/transaccionesData";

const HistorialTransaccionesPage = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    // Simulamos la carga de datos desde la mockdata
    setTransacciones(transaccionesMockData || []);
  }, []);

  // Filtrar transacciones según el estado y la búsqueda
  const transaccionesFiltradas = transacciones.filter((transaccion) => {
    const coincideEstado =
      filtroEstado === "Todos" || transaccion.estado === filtroEstado;
    const coincideBusqueda = transaccion.usuario
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalTransacciones = transacciones.length;
  const totalMonto = transacciones.reduce(
    (sum, transaccion) => sum + transaccion.monto,
    0
  );
  const transaccionesCompletadas = transacciones.filter(
    (transaccion) => transaccion.estado === "Completado"
  ).length;
  const transaccionesPendientes = transacciones.filter(
    (transaccion) => transaccion.estado === "Pendiente"
  ).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">📜 Historial de Transacciones</h2>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos los estados</option>
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
      </div>

      {/* Tabla de transacciones */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                ID
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Usuario
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Monto
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Fecha
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transaccionesFiltradas.length > 0 ? (
              transaccionesFiltradas.map((transaccion) => (
                <tr
                  key={transaccion.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {transaccion.id}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {transaccion.usuario}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    ${transaccion.monto.toFixed(2)}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {transaccion.fecha}
                  </td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs md:text-sm ${
                        transaccion.estado === "Completado"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {transaccion.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">
                  No se encontraron transacciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Transacciones</p>
          <p className="text-2xl font-bold">{totalTransacciones}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Monto Total</p>
          <p className="text-2xl font-bold">${totalMonto.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Completadas</p>
          <p className="text-2xl font-bold text-green-600">
            {transaccionesCompletadas}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Pendientes</p>
          <p className="text-2xl font-bold text-red-600">
            {transaccionesPendientes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistorialTransaccionesPage;