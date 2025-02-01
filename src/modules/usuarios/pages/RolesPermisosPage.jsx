import React, { useState } from "react";

const RolesPermisosPage = () => {
  const [roles, setRoles] = useState([
    { id: 1, nombre: "Administrador", permisos: ["Gestionar usuarios", "Editar citas", "Ver reportes"] },
    { id: 2, nombre: "Veterinario", permisos: ["Editar citas", "Ver reportes"] },
    { id: 3, nombre: "Recepcionista", permisos: ["Crear citas", "Ver citas"] },
    { id: 4, nombre: "Auxiliar", permisos: ["Ver citas"] },
  ]);

  const [nuevoRol, setNuevoRol] = useState({ nombre: "", permisos: [] });
  const [editandoRol, setEditandoRol] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [rolAEliminar, setRolAEliminar] = useState(null);

  const permisosDisponibles = [
    "Gestionar usuarios",
    "Editar citas",
    "Crear citas",
    "Ver citas",
    "Ver reportes",
  ];

  const abrirModal = (rol = null) => {
    if (rol) {
      setEditandoRol(rol);
      setNuevoRol({ nombre: rol.nombre, permisos: rol.permisos });
    } else {
      setEditandoRol(null);
      setNuevoRol({ nombre: "", permisos: [] });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditandoRol(null);
    setNuevoRol({ nombre: "", permisos: [] });
  };

  const guardarRol = () => {
    if (nuevoRol.nombre.trim() === "") return;

    if (editandoRol) {
      setRoles(roles.map((rol) => (rol.id === editandoRol.id ? { ...rol, ...nuevoRol } : rol)));
    } else {
      setRoles([...roles, { id: Date.now(), ...nuevoRol }]);
    }
    cerrarModal();
  };

  const confirmarEliminarRol = (rol) => {
    setRolAEliminar(rol);
  };

  const eliminarRol = () => {
    setRoles(roles.filter((rol) => rol.id !== rolAEliminar.id));
    setRolAEliminar(null);
  };

  const togglePermiso = (permiso) => {
    if (nuevoRol.permisos.includes(permiso)) {
      setNuevoRol({ ...nuevoRol, permisos: nuevoRol.permisos.filter((p) => p !== permiso) });
    } else {
      setNuevoRol({ ...nuevoRol, permisos: [...nuevoRol.permisos, permiso] });
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">🔐 Roles y Permisos</h2>
      <button
        onClick={() => abrirModal()}
        className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg mb-4 transition-colors"
      >
        ➕ Agregar Rol
      </button>

      {/* Lista de roles */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {roles.map((rol, index) => (
          <div
            key={rol.id}
            className={`p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 ${
              index !== roles.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex-1">
              <span className="font-medium text-sm sm:text-base">{rol.nombre}</span>
              <div className="text-xs text-gray-600 mt-1">
                Permisos: {rol.permisos.join(", ")}
              </div>
            </div>

            <div className="w-full sm:w-auto flex gap-2">
              <button
                onClick={() => abrirModal(rol)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:py-1 rounded-lg w-full sm:w-auto transition-colors text-sm"
              >
                ✏️ Editar Permisos
              </button>
              <button
                onClick={() => confirmarEliminarRol(rol)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:py-1 rounded-lg w-full sm:w-auto transition-colors text-sm"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar/editar roles */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editandoRol ? "Editar Rol" : "Agregar Rol"}
            </h3>
            <input
              type="text"
              placeholder="Nombre del rol"
              value={nuevoRol.nombre}
              onChange={(e) => setNuevoRol({ ...nuevoRol, nombre: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="mb-4">
              <h4 className="font-medium mb-2">Permisos:</h4>
              {permisosDisponibles.map((permiso) => (
                <label key={permiso} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={nuevoRol.permisos.includes(permiso)}
                    onChange={() => togglePermiso(permiso)}
                    className="form-checkbox"
                  />
                  <span>{permiso}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={cerrarModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarRol}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar rol */}
      {rolAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">¿Eliminar Rol?</h3>
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar el rol <strong>{rolAEliminar.nombre}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRolAEliminar(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarRol}
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

export default RolesPermisosPage;