import React, { useState } from "react";

const HorariosUsuariosPage = () => {
  const [horarios, setHorarios] = useState([
    { id: 1, nombre: "Dr. Juan Pérez", horario: "08:00 - 16:00" },
    { id: 2, nombre: "Ana López", horario: "10:00 - 18:00" },
  ]);

  const [nuevoHorario, setNuevoHorario] = useState({ nombre: "", horario: "" });
  const [editandoHorario, setEditandoHorario] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [horarioAEliminar, setHorarioAEliminar] = useState(null);

  const abrirModal = (horario = null) => {
    if (horario) {
      setEditandoHorario(horario);
      setNuevoHorario({ nombre: horario.nombre, horario: horario.horario });
    } else {
      setEditandoHorario(null);
      setNuevoHorario({ nombre: "", horario: "" });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditandoHorario(null);
    setNuevoHorario({ nombre: "", horario: "" });
  };

  const guardarHorario = () => {
    if (nuevoHorario.nombre.trim() === "" || nuevoHorario.horario.trim() === "") return;

    if (editandoHorario) {
      setHorarios(horarios.map((horario) => (horario.id === editandoHorario.id ? { ...horario, ...nuevoHorario } : horario)));
    } else {
      setHorarios([...horarios, { id: Date.now(), ...nuevoHorario }]);
    }
    cerrarModal();
  };

  const confirmarEliminarHorario = (horario) => {
    setHorarioAEliminar(horario);
  };

  const eliminarHorario = () => {
    setHorarios(horarios.filter((horario) => horario.id !== horarioAEliminar.id));
    setHorarioAEliminar(null);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">🕒 Horarios de Usuarios</h2>
      <button
        onClick={() => abrirModal()}
        className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto px-4 py-3 md:py-2 rounded-lg mb-4 transition-colors"
      >
        ➕ Agregar Horario
      </button>

      {/* Versión móvil */}
      <div className="md:hidden space-y-4">
        {horarios.length > 0 ? (
          horarios.map((horario) => (
            <div key={horario.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">{horario.nombre}</p>
                <p className="text-sm text-gray-600">{horario.horario}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => abrirModal(horario)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg flex-1 hover:bg-blue-600 transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => confirmarEliminarHorario(horario)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg flex-1 hover:bg-red-600 transition-colors"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay horarios registrados.</p>
        )}
      </div>

      {/* Versión escritorio */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Horario</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr key={horario.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3">{horario.nombre}</td>
                <td className="p-3">{horario.horario}</td>
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => abrirModal(horario)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => confirmarEliminarHorario(horario)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {horarios.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No hay horarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar horarios */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editandoHorario ? "Editar Horario" : "Agregar Horario"}
            </h3>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoHorario.nombre}
              onChange={(e) => setNuevoHorario({ ...nuevoHorario, nombre: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Horario (ej. 08:00 - 16:00)"
              value={nuevoHorario.horario}
              onChange={(e) => setNuevoHorario({ ...nuevoHorario, horario: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={cerrarModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarHorario}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar horario */}
      {horarioAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">¿Eliminar Horario?</h3>
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar el horario de <strong>{horarioAEliminar.nombre}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setHorarioAEliminar(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarHorario}
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

export default HorariosUsuariosPage;