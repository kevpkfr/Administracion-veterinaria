import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  LogoutIcon,
  CogIcon,
  MenuIcon,
} from "@heroicons/react/outline";

const moduleGroups = [
  {
    title: "Administración General",
    modules: [
      { name: "Roles y Permisos", path: "/dashboard/administracion-general/roles-permisos", icon: "🔑" },
      { name: "Gestión de Usuarios", path: "/dashboard/administracion-general/gestion-usuarios", icon: "👤" },
      { name: "Diseño e Identidad", path: "/dashboard/administracion-general/diseno-identidad", icon: "🎨" },
    ],
  },
  {
    title: "Gestión de Propietarios y Mascotas",
    modules: [
      { name: "Registro de Propietarios", path: "/dashboard/gestion-propietarios-mascotas/registro-propietarios", icon: "👨‍👩‍👧‍👦" },
      { name: "Registro de Mascotas", path: "/dashboard/gestion-propietarios-mascotas/registro-mascotas", icon: "🐶" },
    ],
  },
  {
    title: "Agenda de Citas y Turnos",
    modules: [
      { name: "Calendario de Citas", path: "/dashboard/agenda-citas-turnos/calendario-citas", icon: "📅" },
      { name: "Turnos de Personal", path: "/dashboard/agenda-citas-turnos/turnos-personal", icon: "👩‍⚕️" },
    ],
  },
  {
    title: "Historial Clínico",
    modules: [
      { name: "Registro de Consultas", path: "/dashboard/historial-clinico/registro-consultas", icon: "📝" },
      { name: "Exámenes y Resultados", path: "/dashboard/historial-clinico/examenes-resultados", icon: "🔬" },
    ],
  },
  {
    title: "Logística e Inventarios",
    modules: [
      { name: "Inventario de Productos", path: "/dashboard/logistica-inventarios/inventario-productos", icon: "📦" },
      { name: "Proveedores y Compras", path: "/dashboard/logistica-inventarios/proveedores-compras", icon: "🚚" },
    ],
  },
  {
    title: "Recursos Humanos",
    modules: [
      { name: "Gestión de Personal", path: "/dashboard/recursos-humanos/gestion-personal", icon: "👥" },
      { name: "Nómina y Pagos", path: "/dashboard/recursos-humanos/nomina-pagos", icon: "💰" },
    ],
  },
  {
    title: "Reportes Generales y Estadísticas",
    modules: [
      { name: "Panel de Control", path: "/dashboard/reportes-generales/panel-control", icon: "📊" },
      { name: "Reportes Personalizados", path: "/dashboard/reportes-generales/reportes-personalizados", icon: "📑" },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Función para manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Buscando: ${searchQuery}`);
    setSearchQuery("");
  };

  // Función para manejar la expansión de los módulos
  const toggleGroup = (title) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md w-64 p-5 fixed h-full transition-transform duration-300 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-gray-800">VetAdmin</h1>
        </div>

        {/* Módulos en el Sidebar */}
        <nav className="space-y-2">
          {moduleGroups.map((group, idx) => (
            <div key={idx} className="mb-4">
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between p-2 rounded-lg text-gray-700 hover:bg-orange-50 transition-colors"
              >
                <h3 className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                  {group.title}
                </h3>
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    expandedGroups[group.title] ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expandedGroups[group.title] && (
                <ul className="mt-2 space-y-1 pl-4">
                  {group.modules.map((module, index) => (
                    <li key={index}>
                      <button
                        onClick={() => navigate(module.path)}
                        className="w-full flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-orange-50 transition-colors"
                      >
                        <span className="text-xl">{module.icon}</span>
                        <span className="text-sm">{module.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className={`flex-1 transition-margin duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <header className="bg-white shadow-sm p-5 flex justify-between items-center sticky top-0 z-50">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-orange-500">
            <MenuIcon className="w-6 h-6" />
          </button>

          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg p-3 w-96 transition-all duration-300">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="ml-3 bg-transparent focus:outline-none w-full text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center space-x-6">
            <button className="relative text-gray-500 hover:text-orange-500 transition-colors">
              <BellIcon className="w-6 h-6" />
            </button>

            <div className="relative">
              <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-3">
                <UserCircleIcon className="w-9 h-9 text-gray-500" />
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido al Panel de Administración</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
