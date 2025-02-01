import React, { useState } from "react";

const EvaluacionUsuariosPage = () => {
  const [evaluaciones, setEvaluaciones] = useState([
    { id: 1, nombre: "Dr. Juan Pérez", puntuacion: 9, comentarios: "Excelente desempeño" },
    { id: 2, nombre: "Ana López", puntuacion: 7, comentarios: "Buen trabajo, pero mejorar atención al cliente" },
  ]);

  const [nuevaEvaluacion, setNuevaEvaluacion] = useState({ nombre: "", puntuacion: "", comentarios: "" });
  const [editandoEvaluacion, setEditandoEvaluacion] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [evaluacionAEliminar, setEvaluacionAEliminar] = useState(null);

  const abrirModal = (evaluacion = null) => {
    if (evaluacion) {
      setEditandoEvaluacion(evaluacion);
      setNuevaEvaluacion({ nombre: evaluacion.nombre, puntuacion: evaluacion.puntuacion, comentarios: evaluacion.comentarios });
    } else {
      setEditandoEvaluacion(null);
      setNuevaEvaluacion({ nombre: "", puntuacion: "", comentarios: "" });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditandoEvaluacion(null);
    setNuevaEvaluacion({ nombre: "", puntuacion: "", comentarios: "" });
  };

  const guardarEvaluacion = () => {
    if (nuevaEvaluacion.nombre.trim() === "" || nuevaEvaluacion.puntuacion === "" || nuevaEvaluacion.comentarios.trim() === "") return;

    if (editandoEvaluacion) {
      setEvaluaciones(evaluaciones.map((evaluacion) => (evaluacion.id === editandoEvaluacion.id ? { ...evaluacion, ...nuevaEvaluacion } : evaluacion)));
    } else {
      setEvaluaciones([...evaluaciones, { id: Date.now(), ...nuevaEvaluacion }]);
    }
    cerrarModal();
  };

  const confirmarEliminarEvaluacion = (evaluacion) => {
    setEvaluacionAEliminar(evaluacion);
  };

  const eliminarEvaluacion = () => {
    setEvaluaciones(evaluaciones.filter((evaluacion) => evaluacion.id !== evaluacionAEliminar.id));
    setEvaluacionAEliminar(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">📊 Evaluación del Personal</h2>
      <button
        onClick={() => abrirModal()}
        className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg mb-4 transition-colors"
      >
        ➕ Agregar Evaluación
      </button>

      {/* Versión para pantallas grandes */}
      <div className="hidden sm:block">
        <table className="w-full bg-white border shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Puntuación</th>
              <th className="p-2 text-left">Comentarios</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((evaluacion) => (
              <tr key={evaluacion.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-2">{evaluacion.nombre}</td>
                <td className="p-2">{evaluacion.puntuacion} / 10</td>
                <td className="p-2 whitespace-normal break-words max-w-[300px]">
                  {evaluacion.comentarios}
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => abrirModal(evaluacion)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => confirmarEliminarEvaluacion(evaluacion)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versión para móviles */}
      <div className="block sm:hidden">
        {evaluaciones.map((evaluacion) => (
          <div key={evaluacion.id} className="bg-white border shadow-md rounded-lg p-4 mb-4">
            <div className="mb-2">
              <span className="font-semibold">Nombre:</span> {evaluacion.nombre}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Puntuación:</span> {evaluacion.puntuacion}/10
            </div>
            <div className="mb-4">
              <span className="font-semibold">Comentarios:</span>
              <p className="mt-1 whitespace-normal break-words">{evaluacion.comentarios}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => abrirModal(evaluacion)}
                className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => confirmarEliminarEvaluacion(evaluacion)}
                className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar/editar evaluaciones */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editandoEvaluacion ? "Editar Evaluación" : "Agregar Evaluación"}
            </h3>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevaEvaluacion.nombre}
              onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, nombre: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="number"
              placeholder="Puntuación (0-10)"
              min="0"
              max="10"
              value={nuevaEvaluacion.puntuacion}
              onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, puntuacion: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <textarea
              placeholder="Comentarios"
              value={nuevaEvaluacion.comentarios}
              onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, comentarios: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
              rows="3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={cerrarModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEvaluacion}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar evaluación */}
      {evaluacionAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">¿Eliminar Evaluación?</h3>
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar la evaluación de <strong>{evaluacionAEliminar.nombre}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEvaluacionAEliminar(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarEvaluacion}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluacionUsuariosPage;