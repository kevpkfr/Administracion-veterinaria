import React, { useState } from "react";
import facturasData from "../../../data/facturasData";

const FacturasPage = () => {
  const [facturas] = useState(facturasData);
  const [filtroEstado, setFiltroEstado] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar facturas según el estado y la búsqueda
  const facturasFiltradas = facturas.filter((factura) => {
    const coincideEstado =
      filtroEstado === "Todas" || factura.estado === filtroEstado;
    const coincideBusqueda = factura.cliente
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalFacturas = facturas.length;
  const totalIngresos = facturas.reduce((sum, factura) => sum + factura.total, 0);
  const facturasPagadas = facturas.filter((factura) => factura.estado === "Pagada").length;
  const facturasPendientes = facturas.filter((factura) => factura.estado === "Pendiente").length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold mb-6">📄 Facturas Emitidas</h2>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todas">Todas las facturas</option>
          <option value="Pagada">Pagada</option>
          <option value="Pendiente">Pendiente</option>
        </select>
      </div>

      {/* Tabla de facturas */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Número
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Cliente
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Fecha
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Total
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {facturasFiltradas.map((factura) => (
              <tr key={factura.numero} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {factura.numero}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {factura.cliente}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {factura.fecha}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  ${factura.total.toFixed(2)}
                </td>
                <td className="p-2 md:p-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium 
                      ${
                        factura.estado === "Pagada"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    {factura.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Facturas</p>
          <p className="text-2xl font-bold">{totalFacturas}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Ingresos</p>
          <p className="text-2xl font-bold">${totalIngresos.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Facturas Pagadas</p>
          <p className="text-2xl font-bold text-green-600">{facturasPagadas}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Facturas Pendientes</p>
          <p className="text-2xl font-bold text-red-600">{facturasPendientes}</p>
        </div>
      </div>

      {/* Gráfico de distribución de estados */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">📈 Distribución de Estados</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Pagada", "Pendiente"].map((estado) => {
            const count = facturas.filter(
              (factura) => factura.estado === estado
            ).length;
            const porcentaje = ((count / totalFacturas) * 100).toFixed(1);
            return (
              <div key={estado}>
                <div className="text-sm text-gray-600 mb-1">
                  {estado} ({count})
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      estado === "Pagada" ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {porcentaje}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FacturasPage;