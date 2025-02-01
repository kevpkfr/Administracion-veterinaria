import React, { useState } from "react";
import pagosPendientesData from "../../../data/pagosPendientesData";

const PagosPendientesPage = () => {
  const [pagosPendientes, setPagosPendientes] = useState(pagosPendientesData);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [orden, setOrden] = useState("asc");

  // Filtrar pagos pendientes por cliente
  const pagosFiltrados = pagosPendientes.filter((pago) =>
    pago.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
  );

  // Ordenar pagos pendientes por fecha de vencimiento
  const pagosOrdenados = pagosFiltrados.sort((a, b) => {
    const fechaA = new Date(a.fechaVencimiento);
    const fechaB = new Date(b.fechaVencimiento);
    return orden === "asc" ? fechaA - fechaB : fechaB - fechaA;
  });

  // Calcular total de pagos pendientes
  const totalPagosPendientes = pagosPendientes.reduce(
    (sum, pago) => sum + pago.monto,
    0
  );

  // Eliminar un pago pendiente
  const eliminarPago = (id) => {
    setPagosPendientes(pagosPendientes.filter((pago) => pago.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold mb-6">💰 Pagos Pendientes</h2>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por cliente..."
          value={filtroCliente}
          onChange={(e) => setFiltroCliente(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
        />
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="asc">Más antiguo primero</option>
          <option value="desc">Más reciente primero</option>
        </select>
      </div>

      {/* Tabla de pagos pendientes */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Cliente
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Monto
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Fecha Vencimiento
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pagosOrdenados.map((pago) => (
              <tr key={pago.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {pago.cliente}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  ${pago.monto.toFixed(2)}
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {pago.fechaVencimiento}
                </td>
                <td className="p-2 md:p-3">
                  <button
                    onClick={() => eliminarPago(pago.id)}
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

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Pagos Pendientes</p>
          <p className="text-2xl font-bold">${totalPagosPendientes.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Cantidad de Pagos</p>
          <p className="text-2xl font-bold">{pagosPendientes.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Próximo Vencimiento</p>
          <p className="text-xl font-bold">
            {pagosOrdenados.length > 0
              ? pagosOrdenados[0].fechaVencimiento
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Formulario para agregar nuevo pago pendiente */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">➕ Agregar Nuevo Pago Pendiente</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const nuevoPago = {
              id: pagosPendientes.length + 1,
              cliente: e.target.cliente.value,
              monto: parseFloat(e.target.monto.value),
              fechaVencimiento: e.target.fechaVencimiento.value,
            };
            setPagosPendientes([...pagosPendientes, nuevoPago]);
            e.target.reset();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="cliente"
            placeholder="Nombre del cliente"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <input
            type="number"
            name="monto"
            placeholder="Monto"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <input
            type="date"
            name="fechaVencimiento"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Agregar Pago
          </button>
        </form>
      </div>
    </div>
  );
};

export default PagosPendientesPage;