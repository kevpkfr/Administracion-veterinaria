import React, { useState } from "react";

const ReportesVentasPage = () => {
  const [ventas] = useState([
    { id: 1, fecha: "2025-02-01", total: 150.00, cliente: "Juan Pérez" },
    { id: 2, fecha: "2025-02-02", total: 250.00, cliente: "Ana López" },
    { id: 3, fecha: "2025-02-03", total: 120.00, cliente: "Carlos Ramírez" },
    { id: 4, fecha: "2025-02-05", total: 300.00, cliente: "Laura Gómez" },
    { id: 5, fecha: "2025-02-07", total: 80.00, cliente: "David Martínez" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Filtrar ventas según la búsqueda y el rango de fechas
  const ventasFiltradas = ventas.filter((venta) => {
    const cumpleBusqueda = busqueda === "" || venta.cliente.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleFechaInicio = fechaInicio === "" || venta.fecha >= fechaInicio;
    const cumpleFechaFin = fechaFin === "" || venta.fecha <= fechaFin;
    return cumpleBusqueda && cumpleFechaInicio && cumpleFechaFin;
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📈 Reporte de Ventas</h2>
      <p className="text-gray-600 mb-6">Historial de ventas realizadas en la veterinaria.</p>

      {/* 🔎 Filtros de búsqueda */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Buscar por cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        />
      </div>

      {/* 📊 Tabla de Reportes */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-3 text-left">📅 Fecha</th>
              <th className="border p-3 text-left">👤 Cliente</th>
              <th className="border p-3 text-left">💰 Total</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.length > 0 ? (
              ventasFiltradas.map((venta) => (
                <tr key={venta.id} className="hover:bg-gray-100">
                  <td className="border p-3">{venta.fecha}</td>
                  <td className="border p-3">{venta.cliente}</td>
                  <td className="border p-3 font-semibold text-green-600">
                    ${venta.total.toFixed(2)}
                  </td>
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
    </div>
  );
};

export default ReportesVentasPage;
