import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, XIcon, BellIcon, UserCircleIcon, ChevronDownIcon, HomeIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const subModuleName = location.pathname.split("/")[3] || "";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 📌 Mapeo de todas las pages dentro de cada módulo padre
  const modulePages = {
    "roles-permisos": [
      { name: "Listado de Roles", path: "/dashboard/administracion-general/roles-permisos/listado" },
      { name: "Asignar Permisos", path: "/dashboard/administracion-general/roles-permisos/asignar" },
      { name: "Auditoría de Seguridad", path: "/dashboard/administracion-general/roles-permisos/auditoria" },
    ],
    "gestion-usuarios": [
      { name: "Listado de Usuarios", path: "/dashboard/administracion-general/gestion-usuarios/listado" },
      { name: "Crear Usuario", path: "/dashboard/administracion-general/gestion-usuarios/crear" },
      { name: "Registro de Accesos", path: "/dashboard/administracion-general/gestion-usuarios/registros" },
    ],
    "diseno-identidad": [
      { name: "Personalización UI", path: "/dashboard/administracion-general/diseno-identidad/ui" },
      { name: "Configuración de Logos", path: "/dashboard/administracion-general/diseno-identidad/logos" },
      { name: "Paleta de Colores", path: "/dashboard/administracion-general/diseno-identidad/paleta" },
    ],
    "registro-propietarios": [
      { name: "Nuevo Propietario", path: "/dashboard/gestion-propietarios-mascotas/registro-propietarios/nuevo" },
      { name: "Listado de Propietarios", path: "/dashboard/gestion-propietarios-mascotas/registro-propietarios/listado" },
      { name: "Datos del Propietario", path: "/dashboard/gestion-propietarios-mascotas/registro-propietarios/datos" },
    ],
    "registro-mascotas": [
      { name: "Nueva Mascota", path: "/dashboard/gestion-propietarios-mascotas/registro-mascotas/nueva" },
      { name: "Listado de Mascotas", path: "/dashboard/gestion-propietarios-mascotas/registro-mascotas/listado" },
      { name: "Historial de Mascota", path: "/dashboard/gestion-propietarios-mascotas/registro-mascotas/historial" },
    ],
    "calendario-citas": [
      { name: "Ver Calendario", path: "/dashboard/agenda-citas-turnos/calendario-citas/ver" },
      { name: "Eventos de Citas", path: "/dashboard/agenda-citas-turnos/calendario-citas/eventos" },
      { name: "Notificaciones de Citas", path: "/dashboard/agenda-citas-turnos/calendario-citas/notificaciones" },
    ],
    "turnos-personal": [
      { name: "Gestión de Turnos", path: "/dashboard/agenda-citas-turnos/turnos-personal/gestion" },
      { name: "Disponibilidad de Personal", path: "/dashboard/agenda-citas-turnos/turnos-personal/disponibilidad" },
      { name: "Reasignar Turnos", path: "/dashboard/agenda-citas-turnos/turnos-personal/reasignar" },
    ],
    "historial-clinico": [
      { name: "Registro de Consultas", path: "/dashboard/historial-clinico/registro-consultas" },
      { name: "Exámenes y Resultados", path: "/dashboard/historial-clinico/examenes-resultados" },
      { name: "Cirugías y Hospitalizaciones", path: "/dashboard/historial-clinico/cirugias-hospitalizaciones" },
    ],
    "inventario-productos": [
      { name: "Registrar Producto", path: "/dashboard/logistica-inventarios/inventario-productos/registrar" },
      { name: "Listado de Inventario", path: "/dashboard/logistica-inventarios/inventario-productos/listado" },
      { name: "Alertas de Stock", path: "/dashboard/logistica-inventarios/inventario-productos/alertas" },
    ],
    "gestion-personal": [
      { name: "Listado de Empleados", path: "/dashboard/recursos-humanos/gestion-personal/listado" },
      { name: "Registrar Empleado", path: "/dashboard/recursos-humanos/gestion-personal/registrar" },
      { name: "Evaluaciones", path: "/dashboard/recursos-humanos/gestion-personal/evaluaciones" },
    ],
    "panel-control": [
      { name: "Estadísticas Generales", path: "/dashboard/reportes-generales/panel-control/estadisticas" },
      { name: "Tendencias", path: "/dashboard/reportes-generales/panel-control/tendencias" },
      { name: "Alertas Relevantes", path: "/dashboard/reportes-generales/panel-control/alertas" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 📌 Header Principal */}
      <header className="bg-orange-400 text-white shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white p-2 rounded-md hover:bg-orange-600 transition"
              >
                {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            )}
            <h1 className="text-xl font-bold capitalize ml-2">VetAdmin Dashboard</h1>
          </div>

          {/* Menú de usuario */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-200">
              <BellIcon className="w-6 h-6" />
            </button>
            <div className="relative">
              <button className="flex items-center text-white hover:text-gray-200">
                <UserCircleIcon className="w-6 h-6" />
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* 📌 Pages en el Header con "Volver al Dashboard" */}
        <nav className="mt-4 flex items-center space-x-4">
          <Link to="/dashboard" className="text-sm bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition">
            <HomeIcon className="w-4 h-4 inline-block mr-1" /> Volver al Dashboard
          </Link>
          {modulePages[subModuleName]?.map((page, index) => (
            <Link
              key={index}
              to={page.path}
              className="text-sm bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition"
            >
              {page.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* 📌 Contenido principal */}
      <main className="flex-1 p-4 bg-gray-50">{children}</main>
    </div>
  );
};

export default MainLayout;
