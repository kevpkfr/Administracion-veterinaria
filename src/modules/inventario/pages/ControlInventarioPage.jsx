import React, { useState, useEffect } from "react";
import { inventarioMockData } from "../../../data/inventarioData";

const ControlInventarioPage = () => {
  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    setProductos(inventarioMockData || []);
  }, []);

  // Filtrar productos por categoría y búsqueda
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      filtroCategoria === "Todas" || producto.categoria === filtroCategoria;
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalProductos = productos.length;
  const productosDisponibles = productos.filter(
    (producto) => producto.stock > 0
  ).length;
  const productosAgotados = productos.filter(
    (producto) => producto.stock === 0
  ).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">📦 Control de Inventario</h2>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todas">Todas las categorías</option>
          {[...new Set(productos.map((producto) => producto.categoria))].map(
            (categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            )
          )}
        </select>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Código
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Producto
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Stock
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Categoría
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <tr
                  key={producto.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {producto.codigo}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {producto.nombre}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {producto.stock}
                  </td>
                  <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                    {producto.categoria}
                  </td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs md:text-sm ${
                        producto.stock > 0
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {producto.stock > 0 ? "Disponible" : "Agotado"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Productos</p>
          <p className="text-2xl font-bold">{totalProductos}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Productos Disponibles</p>
          <p className="text-2xl font-bold text-green-600">
            {productosDisponibles}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Productos Agotados</p>
          <p className="text-2xl font-bold text-red-600">{productosAgotados}</p>
        </div>
      </div>
    </div>
  );
};

export default ControlInventarioPage;