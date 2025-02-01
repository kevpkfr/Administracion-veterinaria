import React, { useState, useEffect } from "react";
import { inventarioMockData } from "../../../data/inventarioData";

const PedidosPage = () => {
  const [productosAgotados, setProductosAgotados] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [proveedor, setProveedor] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [editingPedidoId, setEditingPedidoId] = useState(null);
  const [editCantidad, setEditCantidad] = useState(0);
  const [editProveedor, setEditProveedor] = useState("");

  // Cargar productos agotados al inicio
  useEffect(() => {
    const productosAgotados = inventarioMockData.filter(
      (producto) => producto.stock === 0
    );
    setProductosAgotados(productosAgotados);
  }, []);

  // Función para realizar un pedido de reabastecimiento
  const realizarPedido = (productoId) => {
    const producto = productosAgotados.find((p) => p.id === productoId);
    if (producto && proveedor && cantidad > 0) {
      const nuevoPedido = {
        id: pedidos.length + 1,
        producto: producto.nombre,
        categoria: producto.categoria,
        cantidad: cantidad,
        proveedor: proveedor,
        fechaPedido: new Date().toLocaleDateString(),
        estado: "Pendiente", // Puede ser "Pendiente", "En camino", "Entregado"
      };
      setPedidos([...pedidos, nuevoPedido]);
      setProductosAgotados(productosAgotados.filter((p) => p.id !== productoId));
      setProveedor("");
      setCantidad(0);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Función para eliminar un pedido
  const eliminarPedido = (id) => {
    setPedidos(pedidos.filter((pedido) => pedido.id !== id));
  };

  // Función para editar un pedido
  const editarPedido = (id) => {
    const pedido = pedidos.find((p) => p.id === id);
    if (pedido) {
      setEditingPedidoId(id);
      setEditCantidad(pedido.cantidad);
      setEditProveedor(pedido.proveedor);
    }
  };

  // Función para guardar los cambios de la edición
  const guardarEdicion = () => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === editingPedidoId
          ? { ...pedido, cantidad: editCantidad, proveedor: editProveedor }
          : pedido
      )
    );
    setEditingPedidoId(null);
    setEditCantidad(0);
    setEditProveedor("");
  };

  // Filtrar pedidos por estado y búsqueda
  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideEstado =
      filtroEstado === "Todos" || pedido.estado === filtroEstado;
    const coincideBusqueda = pedido.producto
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalPedidos = pedidos.length;
  const pedidosPendientes = pedidos.filter(
    (pedido) => pedido.estado === "Pendiente"
  ).length;
  const pedidosEntregados = pedidos.filter(
    (pedido) => pedido.estado === "Entregado"
  ).length;

  // Cambiar el estado de un pedido
  const cambiarEstadoPedido = (id, nuevoEstado) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">📦 Pedidos y Reabastecimiento</h2>
      <p className="text-gray-600 mb-8">
        Aquí podrás gestionar pedidos de productos agotados y solicitar reabastecimiento.
      </p>

      {/* Lista de productos agotados */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Productos Agotados</h3>
        {productosAgotados.length > 0 ? (
          <div className="space-y-4">
            {productosAgotados.map((producto) => (
              <div
                key={producto.id}
                className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <p className="text-lg font-medium">{producto.nombre}</p>
                  <p className="text-sm text-gray-600">{producto.categoria}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                  <input
                    type="text"
                    placeholder="Proveedor"
                    value={proveedor}
                    onChange={(e) => setProveedor(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => realizarPedido(producto.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Solicitar Reabastecimiento
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No hay productos agotados.</p>
        )}
      </div>

      {/* Filtros y búsqueda para el historial de pedidos */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por producto..."
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
          <option value="Pendiente">Pendiente</option>
          <option value="En camino">En camino</option>
          <option value="Entregado">Entregado</option>
        </select>
      </div>

      {/* Lista de pedidos realizados */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Historial de Pedidos</h3>
        {pedidosFiltrados.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left text-sm font-medium text-gray-600">Producto</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-600">Categoría</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-600">Cantidad</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-600">Proveedor</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-600">Fecha Pedido</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-600">Estado</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 text-sm text-gray-800">{pedido.producto}</td>
                    <td className="p-2 text-sm text-gray-800">{pedido.categoria}</td>
                    <td className="p-2 text-sm text-gray-800">
                      {editingPedidoId === pedido.id ? (
                        <input
                          type="number"
                          value={editCantidad}
                          onChange={(e) => setEditCantidad(parseInt(e.target.value))}
                          className="p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        pedido.cantidad
                      )}
                    </td>
                    <td className="p-2 text-sm text-gray-800">
                      {editingPedidoId === pedido.id ? (
                        <input
                          type="text"
                          value={editProveedor}
                          onChange={(e) => setEditProveedor(e.target.value)}
                          className="p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        pedido.proveedor
                      )}
                    </td>
                    <td className="p-2 text-sm text-gray-800">{pedido.fechaPedido}</td>
                    <td className="p-2 text-sm text-gray-800">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          pedido.estado === "Entregado"
                            ? "bg-green-500 text-white"
                            : pedido.estado === "En camino"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="p-2 text-sm text-gray-800">
                      {editingPedidoId === pedido.id ? (
                        <button
                          onClick={guardarEdicion}
                          className="text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Guardar
                        </button>
                      ) : (
                        <>
                          {pedido.estado === "Pendiente" && (
                            <button
                              onClick={() => cambiarEstadoPedido(pedido.id, "En camino")}
                              className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              Enviar
                            </button>
                          )}
                          {pedido.estado === "En camino" && (
                            <button
                              onClick={() => cambiarEstadoPedido(pedido.id, "Entregado")}
                              className="text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors"
                            >
                              Entregar
                            </button>
                          )}
                          <button
                            onClick={() => editarPedido(pedido.id)}
                            className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors ml-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarPedido(pedido.id)}
                            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors ml-2"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No hay pedidos registrados.</p>
        )}
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Pedidos</p>
          <p className="text-2xl font-bold">{totalPedidos}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Pedidos Pendientes</p>
          <p className="text-2xl font-bold text-red-600">{pedidosPendientes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Pedidos Entregados</p>
          <p className="text-2xl font-bold text-green-600">{pedidosEntregados}</p>
        </div>
      </div>
    </div>
  );
};

export default PedidosPage;