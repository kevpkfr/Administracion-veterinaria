import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, XIcon, BellIcon, UserCircleIcon, CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const moduleName = location.pathname.split("/")[2] || "";
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: "Nueva cita programada", leida: false },
    { id: 2, mensaje: "Recordatorio: Revisar inventario", leida: false },
  ]);

  // Módulos principales y subrutas adaptadas al dashboard
  const moduleNamesMap = {
    "datos-clinica": "🏥 Administración General",
    "roles-permisos": "🔑 Roles y Permisos",
    "gestion-usuarios": "👤 Gestión de Usuarios",
    "registro-propietarios": "👨👩👧👦 Propietarios y Mascotas",
    "registro-mascotas": "🐾 Registro de Mascotas",
    "calendario-citas": "📅 Agenda de Citas",
    "historial-clinico": "📋 Historial Clínico",
    "inventario-productos": "📦 Logística e Inventarios",
    "gestion-personal": "👥 Recursos Humanos",
    "panel-control": "📊 Reportes Generales"
  };

  // Submódulos jerárquicos según la estructura del dashboard
  const submodules = {
    "datos-clinica": [
      { name: "Configuración General", path: "configuracion" },
      { name: "Diseño e Identidad", path: "diseno" },
      { name: "Accesibilidad", path: "accesibilidad" }
    ],
    "registro-propietarios": [
      { name: "Listado de Propietarios", path: "listado" },
      { name: "Perfil de Propietario", path: "perfil" },
      { name: "Vinculación de Mascotas", path: "mascotas" }
    ],
    "calendario-citas": [
      { name: "Creación de Citas", path: "crear" },
      { name: "Reprogramaciones", path: "reprogramar" },
      { name: "Asignación de Turnos", path: "turnos" }
    ],
    "historial-clinico": [
      { name: "Registro de Consultas", path: "consultas" },
      { name: "Exámenes Médicos", path: "examenes" },
      { name: "Cirugías", path: "cirugias" }
    ],
    "inventario-productos": [
      { name: "Control de Stock", path: "stock" },
      { name: "Proveedores", path: "proveedores" },
      { name: "Alertas", path: "alertas" }
    ],
    "gestion-personal": [
      { name: "Horarios", path: "horarios" },
      { name: "Asistencia", path: "asistencia" },
      { name: "Nómina", path: "nomina" }
    ]
  };

  // Efectos y funciones auxiliares
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsHeaderExpanded(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNotificaciones = () => {
    setNotificacionesAbiertas(!notificacionesAbiertas);
    setPerfilAbierto(false);
  };

  const togglePerfil = () => {
    setPerfilAbierto(!perfilAbierto);
    setNotificacionesAbiertas(false);
  };

  const marcarComoLeida = (id) => {
    setNotificaciones(notificaciones.map(notif => 
      notif.id === id ? { ...notif, leida: true } : notif
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Cabecera principal */}
      <header className="bg-orange-400 text-white shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
                className="text-white p-2 rounded-md hover:bg-orange-600 transition"
              >
                {isHeaderExpanded ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            )}
            <span className="text-xl font-bold capitalize ml-2">
              {moduleNamesMap[moduleName] || "VetAdmin Dashboard"}
            </span>
          </div>

          {/* Controles de usuario */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={toggleNotificaciones} className="flex items-center text-white hover:text-gray-200 transition">
                <BellIcon className="w-6 h-6" />
                {!isMobile && <span className="ml-1">Notificaciones</span>}
                {notificaciones.some(notif => !notif.leida) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notificaciones.filter(notif => !notif.leida).length}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {notificacionesAbiertas && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg"
                  >
                    {notificaciones.map(notif => (
                      <div key={notif.id} className={`p-3 border-b ${notif.leida ? "bg-gray-50" : "bg-white"}`}>
                        <p>{notif.mensaje}</p>
                        {!notif.leida && (
                          <button
                            className="text-orange-500 text-sm mt-1"
                            onClick={() => marcarComoLeida(notif.id)}
                          >
                            Marcar como leída
                          </button>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button onClick={togglePerfil} className="flex items-center text-white hover:text-gray-200 transition">
                <UserCircleIcon className="w-6 h-6" />
                {!isMobile && <span className="ml-1">Perfil</span>}
              </button>
              
              <AnimatePresence>
                {perfilAbierto && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg"
                  >
                    <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-100">
                      Ver Perfil
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        console.log("Sesión cerrada");
                        setPerfilAbierto(false);
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navegación de submódulos */}
        <nav className={`mt-4 transition-all duration-300 ${isHeaderExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} md:max-h-full md:opacity-100`}>
          <ul className="flex flex-col md:flex-row gap-4">
            {submodules[moduleName]?.map((sub, index) => (
              <li key={index}>
                <Link
                  to={`/dashboard/${moduleName}/${sub.path}`}
                  className="flex items-center py-2 px-4 hover:bg-orange-600 transition rounded-md"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-4 bg-gray-50">{children}</main>

      {/* Pie de página */}
      <footer className="p-4 bg-orange-400 text-white">
        <Link
          to="/dashboard"
          className="flex items-center justify-center py-2 px-4 bg-orange-600 rounded-md hover:bg-orange-400 transition"
        >
          🏠 Volver al Dashboard Principal
        </Link>
      </footer>
    </div>
  );
};

export default MainLayout;