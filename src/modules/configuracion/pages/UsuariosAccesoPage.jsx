import React, { useState } from "react";

const UsuariosAccesoPage = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Admin", rol: "Administrador" },
    { id: 2, nombre: "Recepcionista", rol: "Empleado" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">👤 Usuarios y Accesos</h2>
      <ul className="bg-white shadow-md p-4 rounded-lg">
        {usuarios.map(usuario => (
          <li key={usuario.id} className="border-b p-2 flex justify-between">
            {usuario.nombre} - {usuario.rol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosAccesoPage;
