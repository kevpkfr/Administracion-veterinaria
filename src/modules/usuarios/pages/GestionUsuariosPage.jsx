import React, { useState } from "react";

const GestionUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Dr. Juan Pérez", cargo: "Veterinario", email: "juan@example.com" },
    { id: 2, nombre: "Ana López", cargo: "Recepcionista", email: "ana@example.com" },
  ]);

  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", cargo: "", email: "" });
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const agregarUsuario = () => {
    if (nuevoUsuario.nombre && nuevoUsuario.cargo && nuevoUsuario.email) {
      setUsuarios([...usuarios, { id: Date.now(), ...nuevoUsuario }]);
      setNuevoUsuario({ nombre: "", cargo: "", email: "" });
    }
  };

  const editarUsuario = (usuario) => {
    setEditandoUsuario(usuario);
    setNuevoUsuario({ nombre: usuario.nombre, cargo: usuario.cargo, email: usuario.email });
  };

  const guardarEdicion = () => {
    setUsuarios(usuarios.map((usuario) => (usuario.id === editandoUsuario.id ? { ...usuario, ...nuevoUsuario } : usuario)));
    setEditandoUsuario(null);
    setNuevoUsuario({ nombre: "", cargo: "", email: "" });
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">👥 Gestión de Usuarios</h2>

      {/* Formulario para agregar/editar usuario */}
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
          className="p-2 border rounded-lg mr-2"
        />
        <input
          type="text"
          placeholder="Cargo"
          value={nuevoUsuario.cargo}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, cargo: e.target.value })}
          className="p-2 border rounded-lg mr-2"
        />
        <input
          type="email"
          placeholder="Correo"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
          className="p-2 border rounded-lg mr-2"
        />
        {editandoUsuario ? (
          <button
            onClick={guardarEdicion}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            💾 Guardar Cambios
          </button>
        ) : (
          <button
            onClick={agregarUsuario}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            ➕ Agregar Usuario
          </button>
        )}
      </div>

      {/* Tabla para pantallas grandes */}
      <div className="hidden sm:block">
        <table className="w-full bg-white border shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Cargo</th>
              <th className="p-2 text-left">Correo</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b">
                <td className="p-2">{usuario.nombre}</td>
                <td className="p-2">{usuario.cargo}</td>
                <td className="p-2">{usuario.email}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => editarUsuario(usuario)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => eliminarUsuario(usuario.id)}
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

      {/* Lista de tarjetas para pantallas pequeñas */}
      <div className="block sm:hidden">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="bg-white border shadow-md rounded-lg p-4 mb-4">
            <div className="mb-2">
              <span className="font-semibold">Nombre:</span> {usuario.nombre}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Cargo:</span> {usuario.cargo}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Correo:</span> {usuario.email}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editarUsuario(usuario)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg flex-1 hover:bg-blue-600 transition-colors"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => eliminarUsuario(usuario.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg flex-1 hover:bg-red-600 transition-colors"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionUsuariosPage;