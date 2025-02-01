import React, { useState } from "react";

const ReportesFinancierosPage = () => {
  const [reportes] = useState([
    { id: 1, mes: "Enero", ingresos: 2000.00, egresos: 500.00 },
    { id: 2, mes: "Febrero", ingresos: 1800.00, egresos: 450.00 },
    { id: 3, mes: "Marzo", ingresos: 2200.00, egresos: 600.00 },
    { id: 4, mes: "Abril", ingresos: 2100.00, egresos: 550.00 },
    { id: 5, mes: "Mayo", ingresos: 1950.00, egresos: 700.00 },
  ]);

  const [mesSeleccionado, setMesSeleccionado] = useState("");

  // Filtrar por mes si se selecciona alguno
  const reportesFiltrados = mesSeleccionado
    ? reportes.filter((reporte) => reporte.mes === mesSeleccionado)
    : reportes;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">💰 Reporte Financiero</h2>
      <p className="text-gray-600 mb-6">Resumen financiero de la veterinaria.</p>

      {/* 🔎 Filtro por Mes */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-semibold">Filtrar por mes:</label>
        <select
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        >
          <option value="">Todos los meses</option>
          {reportes.map((reporte) => (
            <option key={reporte.id} value={reporte.mes}>
              {reporte.mes}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Tabla de Reportes Financieros */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-3 text-left">📅 Mes</th>
              <th className="border p-3 text-left">💰 Ingresos</th>
              <th className="border p-3 text-left">💸 Egresos</th>
              <th className="border p-3 text-left">📊 Balance</th>
            </tr>
          </thead>
          <tbody>
            {reportesFiltrados.length > 0 ? (
              reportesFiltrados.map((reporte) => {
                const balance = reporte.ingresos - reporte.egresos;
                return (
                  <tr key={reporte.id} className="hover:bg-gray-100">
                    <td className="border p-3">{reporte.mes}</td>
                    <td className="border p-3 font-semibold text-green-600">
                      ${reporte.ingresos.toFixed(2)}
                    </td>
                    <td className="border p-3 font-semibold text-red-600">
                      ${reporte.egresos.toFixed(2)}
                    </td>
                    <td
                      className={`border p-3 font-semibold ${
                        balance >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      ${balance.toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No hay datos para el mes seleccionado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportesFinancierosPage;
