import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, BellIcon, UserCircleIcon, ChevronDownIcon, LogoutIcon, CogIcon } from "@heroicons/react/outline";

const moduleGroups = [
  {
    title: "Gestión General",
    modules: [
      { name: "Usuarios", path: "/dashboard/usuarios", icon: "👤" },
      { name: "Empleados", path: "/dashboard/empleados", icon: "🧑‍⚕️" },
      { name: "Configuración", path: "/dashboard/configuracion", icon: "⚙️" },
    ],
  },
  {
    title: "Atención Médica",
    modules: [
      { name: "Pacientes", path: "/dashboard/pacientes", icon: "🐶" },
      { name: "Citas", path: "/dashboard/citas", icon: "📅" },
    ],
  },
  {
    title: "Administración & Finanzas",
    modules: [
      { name: "Facturación", path: "/dashboard/facturacion", icon: "💰" },
      { name: "Reportes", path: "/dashboard/reportes", icon: "📊" },
    ],
  },
  {
    title: "Logística & Recursos",
    modules: [{ name: "Inventario", path: "/dashboard/inventario", icon: "📦" }],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Buscando: ${searchQuery}`);
    setSearchQuery("");
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    alert("Cerrando sesión...");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 📌 Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg p-2 w-96">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar módulos, pacientes, citas..."
            className="ml-2 bg-transparent focus:outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Menú de usuario y notificaciones */}
        <div className="flex items-center space-x-6">
          {/* Notificaciones */}
          <button className="relative text-gray-600 hover:text-blue-600">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>

          {/* Perfil del usuario con menú desplegable */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <UserCircleIcon className="w-8 h-8 text-gray-600" />
              <div className="text-left">
                <p className="font-semibold">Dr. Juan Pérez</p>
                <p className="text-sm text-gray-500">Administrador</p>
              </div>
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            </button>

            {/* Menú desplegable */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => navigate("/dashboard/configuracion")}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <CogIcon className="w-4 h-4" />
                      <span>Configuración</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogoutIcon className="w-4 h-4" />
                      <span>Cerrar sesión</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 📌 Contenido principal del Dashboard */}
      <div className="p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center">
          📌 Panel de Administración
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Selecciona un módulo para comenzar.
        </p>

        {/* 📌 Organización por categorías funcionales */}
        <div className="space-y-10">
          {moduleGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-200 pb-2">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer flex flex-col items-center justify-center text-center"
                    onClick={() => navigate(module.path)}
                  >
                    <span className="text-5xl mb-4">{module.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {module.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;