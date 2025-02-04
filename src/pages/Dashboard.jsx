import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, BellIcon, UserCircleIcon, ChevronDownIcon, LogoutIcon, CogIcon, MenuIcon } from "@heroicons/react/outline";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Módulos adaptados
const moduleGroups = [
  {
    id: "admin",
    title: "Administración General",
    icon: "⚙️",
    modules: [
      { name: "Datos de la Clínica", path: "/dashboard/datos-clinica" },
      { name: "Roles y Permisos", path: "/dashboard/roles-permisos" },
      { name: "Gestión de Usuarios", path: "/dashboard/gestion-usuarios" },
      { name: "Diseño e Identidad", path: "/dashboard/diseno-identidad" },
      { name: "Accesibilidad", path: "/dashboard/accesibilidad" },
    ],
  },
  {
    id: "gestion",
    title: "Gestión de Propietarios y Mascotas",
    icon: "🐾",
    modules: [
      { name: "Registro de Propietarios", path: "/dashboard/registro-propietarios" },
      { name: "Listado de Propietarios", path: "/dashboard/listado-propietarios" },
      { name: "Registro de Mascotas", path: "/dashboard/registro-mascotas" },
      { name: "Listado de Mascotas", path: "/dashboard/listado-mascotas" },
      { name: "Perfil de Mascota", path: "/dashboard/perfil-mascota" },
    ],
  },
  {
    id: "agenda",
    title: "Agenda de Citas y Turnos",
    icon: "📅",
    modules: [
      { name: "Calendario de Citas", path: "/dashboard/calendario-citas" },
      { name: "Creación de Citas", path: "/dashboard/creacion-citas" },
      { name: "Turnos de Personal", path: "/dashboard/turnos-personal" },
      { name: "Reprogramaciones", path: "/dashboard/reprogramaciones" },
    ],
  },
  {
    id: "historial",
    title: "Historial Clínico",
    icon: "📋",
    modules: [
      { name: "Registro de Consultas", path: "/dashboard/registro-consultas" },
      { name: "Exámenes y Resultados", path: "/dashboard/examenes-resultados" },
      { name: "Cirugías y Hospitalizaciones", path: "/dashboard/cirugias-hospitalizaciones" },
      { name: "Reportes Clínicos", path: "/dashboard/reportes-clinicos" },
    ],
  },
  {
    id: "inventario",
    title: "Logística e Inventarios",
    icon: "📦",
    modules: [
      { name: "Inventario de Productos", path: "/dashboard/inventario-productos" },
      { name: "Proveedores y Compras", path: "/dashboard/proveedores-compras" },
      { name: "Alertas de Stock", path: "/dashboard/alertas-stock" },
      { name: "Reportes de Inventario", path: "/dashboard/reportes-inventario" },
    ],
  },
  {
    id: "rh",
    title: "Recursos Humanos",
    icon: "👥",
    modules: [
      { name: "Gestión de Personal", path: "/dashboard/gestion-personal" },
      { name: "Horarios y Turnos", path: "/dashboard/horarios-turnos" },
      { name: "Nómina y Pagos", path: "/dashboard/nomina-pagos" },
    ],
  },
  {
    id: "reportes",
    title: "Reportes Generales",
    icon: "📊",
    modules: [
      { name: "Panel de Control", path: "/dashboard/panel-control" },
      { name: "Reportes Personalizados", path: "/dashboard/reportes-personalizados" },
      { name: "Análisis de Ingresos", path: "/dashboard/analisis-ingresos" },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState(moduleGroups.map(group => group.id));

  // Funciones
  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Datos para gráficos
  const pacientesData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Mascotas atendidas",
        data: [120, 190, 300, 250, 400, 350],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const citasData = {
    labels: ["Confirmadas", "Pendientes", "Canceladas"],
    datasets: [
      {
        label: "Citas",
        data: [300, 50, 20],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
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
          <div className="p-3 bg-orange-500 rounded-lg shadow-md">
            <span className="text-white text-2xl">🏥</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">VetAdmin</h1>
        </div>

        {/* Módulos en el Sidebar */}
        <nav className="space-y-2">
          {moduleGroups.map((group) => (
            <div key={group.id} className="mb-2">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{group.icon}</span>
                  <span className="text-sm font-medium text-gray-800">{group.title}</span>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform ${
                    expandedGroups.includes(group.id) ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {expandedGroups.includes(group.id) && (
                <ul className="ml-8 mt-1 space-y-1">
                  {group.modules.map((module, index) => (
                    <li key={index}>
                      <button
                        onClick={() => navigate(module.path)}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        {module.name}
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
        {/* Header */}
        <header className="bg-white shadow-sm p-5 flex justify-between items-center sticky top-0 z-50">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-orange-500">
            <MenuIcon className="w-6 h-6" />
          </button>

          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg p-3 w-96 transition-all duration-300 focus-within:ring-2 ring-orange-300">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar módulos, propietarios, mascotas..."
              className="ml-3 bg-transparent focus:outline-none w-full placeholder-gray-400 text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center space-x-6">
            <button className="relative text-gray-500 hover:text-orange-500 transition-colors">
              <BellIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>

            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-3 group focus:outline-none"
              >
                <UserCircleIcon className="w-9 h-9 text-gray-500 group-hover:text-orange-500 transition-colors" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Dr. Juan Pérez</p>
                  <p className="text-sm text-gray-500">Administrador</p>
                </div>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-100">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => navigate("/dashboard/configuracion")}
                        className="w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                      >
                        <CogIcon className="w-5 h-5 text-gray-500" />
                        <span>Configuración</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                      >
                        <LogoutIcon className="w-5 h-5 text-gray-500" />
                        <span>Cerrar sesión</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="p-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido, Dr. Juan Pérez</h2>
            <p className="text-lg text-gray-500">Gestiona tu clínica veterinaria de manera eficiente.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <span className="text-3xl">🐶</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">120</p>
                <p className="text-sm text-gray-500">Mascotas este mes</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <span className="text-3xl">📅</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">45</p>
                <p className="text-sm text-gray-500">Citas hoy</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <span className="text-3xl">💰</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">$12,340</p>
                <p className="text-sm text-gray-500">Ingresos este mes</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <span className="text-3xl">⭐</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">4.8</p>
                <p className="text-sm text-gray-500">Calificación promedio</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mascotas atendidas (últimos 6 meses)</h3>
              <Bar data={pacientesData} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Estado de citas</h3>
              <Pie data={citasData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;