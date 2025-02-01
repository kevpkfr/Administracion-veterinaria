import React from "react";
import { Link } from "react-router-dom";

const ConfiguracionPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">⚙️ Configuración General</h2>
      <p className="mb-4">Administra las configuraciones generales de la clínica veterinaria.</p>
      <ul className="grid grid-cols-2 gap-4">
        <li><Link to="preferencias" className="block bg-blue-600 text-white p-4 rounded">🎨 Preferencias</Link></li>
        <li><Link to="seguridad" className="block bg-blue-600 text-white p-4 rounded">🔒 Seguridad</Link></li>
        <li><Link to="notificaciones" className="block bg-blue-600 text-white p-4 rounded">📩 Notificaciones</Link></li>
        <li><Link to="backup" className="block bg-blue-600 text-white p-4 rounded">💾 Respaldo de Datos</Link></li>
        <li><Link to="usuarios-acceso" className="block bg-blue-600 text-white p-4 rounded">👤 Usuarios y Accesos</Link></li>
      </ul>
    </div>
  );
};

export default ConfiguracionPage;
