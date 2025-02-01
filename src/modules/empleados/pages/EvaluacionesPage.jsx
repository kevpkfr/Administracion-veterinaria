import React, { useState } from "react";
import evaluaciones from "../../../data/evaluaciones";

const EvaluacionesPage = () => {
  const [filtroPuntuacion, setFiltroPuntuacion] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar evaluaciones según la puntuación y la búsqueda
  const evaluacionesFiltradas = evaluaciones.filter((evaluacion) => {
    const coincidePuntuacion =
      filtroPuntuacion === "Todas" || evaluacion.puntuacion === parseInt(filtroPuntuacion);
    const coincideBusqueda = evaluacion.empleado
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincidePuntuacion && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalEvaluaciones = evaluaciones.length;
  const promedioPuntuacion =
    evaluaciones.reduce((sum, evaluacion) => sum + evaluacion.puntuacion, 0) / totalEvaluaciones;
  const maxPuntuacion = Math.max(...evaluaciones.map((evaluacion) => evaluacion.puntuacion));
  const minPuntuacion = Math.min(...evaluaciones.map((evaluacion) => evaluacion.puntuacion));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        📊 Evaluaciones de Desempeño
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
          value={filtroPuntuacion}
          onChange={(e) => setFiltroPuntuacion(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todas">Todas las puntuaciones</option>
          {[1, 2, 3, 4, 5].map((puntuacion) => (
            <option key={puntuacion} value={puntuacion}>
              {puntuacion} estrella{puntuacion !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de evaluaciones */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Empleado
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Puntuación
              </th>
              <th className="p-2 md:p-3 text-left text-sm md:text-base font-medium text-gray-600">
                Comentarios
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {evaluacionesFiltradas.map((evaluacion) => (
              <tr key={evaluacion.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {evaluacion.empleado}
                </td>
                <td className="p-2 md:p-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < evaluacion.puntuacion
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base text-gray-800">
                  {evaluacion.comentarios}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Evaluaciones</p>
          <p className="text-2xl font-bold">{totalEvaluaciones}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Puntuación Promedio</p>
          <p className="text-2xl font-bold">{promedioPuntuacion.toFixed(1)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Puntuación Máxima</p>
          <p className="text-2xl font-bold">{maxPuntuacion}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Puntuación Mínima</p>
          <p className="text-2xl font-bold">{minPuntuacion}</p>
        </div>
      </div>

      {/* Gráfico de distribución de puntuaciones */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-4">📈 Distribución de Puntuaciones</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((puntuacion) => {
            const count = evaluaciones.filter(
              (evaluacion) => evaluacion.puntuacion === puntuacion
            ).length;
            const porcentaje = ((count / totalEvaluaciones) * 100).toFixed(1);
            return (
              <div key={puntuacion}>
                <div className="text-sm text-gray-600 mb-1">
                  {puntuacion} estrella{puntuacion !== 1 ? "s" : ""}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {count} ({porcentaje}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EvaluacionesPage;