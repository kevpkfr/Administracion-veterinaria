import React, { useState } from "react";

const ConfiguracionInventarioPage = () => {
  const [configuracion, setConfiguracion] = useState({
    umbralMinimo: 10,
    umbralMaximo: 100,
    notificaciones: true,
    metodoInventario: "FIFO", // FIFO (Primero en entrar, primero en salir) o LIFO (Último en entrar, primero en salir)
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracion({
      ...configuracion,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const guardarConfiguracion = (e) => {
    e.preventDefault();
    alert("Configuración guardada correctamente.");
    // Aquí podrías enviar la configuración a una API o almacenarla en un estado global
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">⚙️ Configuración de Inventario</h2>
      <p className="text-gray-600 mb-8">
        Administra las preferencias de inventario, umbrales de stock y configuraciones generales.
      </p>

      {/* Formulario de configuración */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={guardarConfiguracion} className="space-y-6">
          {/* Umbral mínimo de stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Umbral Mínimo de Stock
            </label>
            <input
              type="number"
              name="umbralMinimo"
              value={configuracion.umbralMinimo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              El sistema notificará cuando el stock esté por debajo de este valor.
            </p>
          </div>

          {/* Umbral máximo de stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Umbral Máximo de Stock
            </label>
            <input
              type="number"
              name="umbralMaximo"
              value={configuracion.umbralMaximo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              El sistema notificará cuando el stock supere este valor.
            </p>
          </div>

          {/* Método de inventario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Inventario
            </label>
            <select
              name="metodoInventario"
              value={configuracion.metodoInventario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="FIFO">FIFO (Primero en entrar, primero en salir)</option>
              <option value="LIFO">LIFO (Último en entrar, primero en salir)</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Selecciona el método para gestionar el inventario.
            </p>
          </div>

          {/* Notificaciones */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notificaciones"
                checked={configuracion.notificaciones}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Habilitar Notificaciones de Stock
              </span>
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Recibe alertas cuando el stock esté por debajo o por encima de los umbrales.
            </p>
          </div>

          {/* Botón de guardar */}
          <div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfiguracionInventarioPage;