import React from "react";
import { Link } from "react-router-dom";

const UsuariosHomePage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">👥 Gestión de Usuarios</h2>
      <p className="mb-4">Administra a los empleados de la veterinaria y gestiona sus permisos.</p>

      <div className="grid grid-cols-2 gap-4">
        <Link to="gestion" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
          Gestión de Usuarios
        </Link>
        <Link to="logs" className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600">
          Logs de Usuarios
        </Link>
        <Link to="roles" className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600">
          Roles y Permisos
        </Link>
        <Link to="horarios" className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600">
          Horarios de Usuarios
        </Link>
        <Link to="evaluacion" className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600">
          Evaluación del Personal
        </Link>
        <Link to="capacitaciones" className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">
          Capacitaciones
        </Link>
        <Link to="asistencia" className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600">
          Asistencia
        </Link>
      </div>
    </div>
  );
};

export default UsuariosHomePage;
