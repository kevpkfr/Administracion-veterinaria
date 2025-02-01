import React, { useState, useEffect } from "react";
import { movimientosMockData } from "../../../data/inventarioData";

const HistorialMovimientosPage = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    setMovimientos(movimientosMockData || []);
  }, []);

  // Filtrar movimientos por tipo y búsqueda
  const movimientosFiltrados = movimientos.filter((mov) => {
    const coincideTipo =
      filtroTipo === "Todos" || mov.tipo === filtroTipo;
    const coincideBusqueda = mov.producto
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideTipo && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalMovimientos = movimientos.length;
  const totalEntradas = movimientos.filter(
    (mov) => mov.tipo === "Entrada"
  ).length;
  const totalSalidas = movimientos.filter(
    (mov) => mov.tipo === "Salida"
  ).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">📜 Historial de Movimientos</h2>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todos los tipos</option>
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>
      </div>

      {/* Tabla de movimientos */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Fecha
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Producto
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Cantidad
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {movimientosFiltrados.length > 0 ? (
              movimientosFiltrados.map((mov) => (
                <tr key={mov.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {mov.fecha}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {mov.producto}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {mov.cantidad}
                  </td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs md:text-sm ${
                        mov.tipo === "Entrada"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {mov.tipo}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-600">
                  No se encontraron movimientos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Movimientos</p>
          <p className="text-2xl font-bold">{totalMovimientos}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Entradas</p>
          <p className="text-2xl font-bold text-green-600">{totalEntradas}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Salidas</p>
          <p className="text-2xl font-bold text-red-600">{totalSalidas}</p>
        </div>
      </div>
    </div>
  );
};

export default HistorialMovimientosPage;