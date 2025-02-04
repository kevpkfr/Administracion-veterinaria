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

  // 📌 Detectar tamaño de pantalla para ajustar el header
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsHeaderExpanded(false); // Cerrar el menú en pantallas grandes
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📌 Mapear nombres de módulos
  const moduleNamesMap = {
    usuarios: "👥 Usuarios",
    citas: "📅 Citas",
    pacientes: "🐾 Pacientes",
    facturacion: "💰 Facturación",
    inventario: "📦 Inventario",
    empleados: "👔 Empleados",
    reportes: "📑 Reportes",
    configuracion: "⚙️ Configuración",
  };

  // 📌 Definir submódulos para cada módulo
  const submodules = {
    usuarios: [
      { name: "Gestión de Usuarios", path: "gestion" },
      { name: "Logs de Usuarios", path: "logs" },
      { name: "Roles y Permisos", path: "roles" },
      { name: "Horarios", path: "horarios" },
      { name: "Evaluación", path: "evaluacion" },
      { name: "Capacitaciones", path: "capacitaciones" },
      { name: "Asistencia", path: "asistencia" },
    ],
    citas: [
      { name: "Agenda de Citas", path: "agenda" },
      { name: "Reasignar Citas", path: "reasignar" },
      { name: "Historial de Citas", path: "historial" },
      { name: "Confirmar Citas", path: "confirmar" },
    ],
    pacientes: [
      { name: "Historias Clínicas", path: "historias" },
      { name: "Detalle de Paciente", path: "detalle/1" },
      { name: "Vacunaciones", path: "vacunaciones" },
      { name: "Exámenes Médicos", path: "examenes" },
      { name: "Tratamientos", path: "tratamientos" },
    ],
    facturacion: [
      { name: "Facturas", path: "facturas" },
      { name: "Reportes Financieros", path: "reportes" },
      { name: "Pagos Pendientes", path: "pagos" },
      { name: "Historial de Transacciones", path: "historial-transacciones" },
    ],
    inventario: [
      { name: "Control de Inventario", path: "control" },
      { name: "Historial de Movimientos", path: "historial" },
      { name: "Pedidos", path: "pedidos" },
      { name: "Categorías de Productos", path: "categorias" },
      { name: "Configuración", path: "configuracion" },
    ],
    empleados: [
      { name: "Gestión de Personal", path: "gestion" },
      { name: "Horarios y Turnos", path: "horarios" },
      { name: "Evaluaciones", path: "evaluaciones" },
      { name: "Capacitaciones", path: "capacitaciones" },
      { name: "Asistencia", path: "asistencia" },
    ],
    reportes: [
      { name: "Generar Reportes", path: "generar" },
      { name: "Reportes de Ventas", path: "ventas" },
      { name: "Reportes de Pacientes", path: "pacientes" },
      { name: "Reportes Financieros", path: "financieros" },
      { name: "Configuración", path: "configuracion" },
    ],
    configuracion: [
      { name: "Datos Generales", path: "datos-generales" },
      { name: "Preferencias", path: "preferencias" },
      { name: "Seguridad", path: "seguridad" },
      { name: "Notificaciones", path: "notificaciones" },
      { name: "Backup", path: "backup" },
    ],
  };

  // 📌 Funciones para manejar notificaciones y perfil
  const toggleNotificaciones = () => {
    setNotificacionesAbiertas(!notificacionesAbiertas);
    setPerfilAbierto(false); // Cerrar el panel de perfil si está abierto
  };

  const togglePerfil = () => {
    setPerfilAbierto(!perfilAbierto);
    setNotificacionesAbiertas(false); // Cerrar el panel de notificaciones si está abierto
  };

  // 📌 Marcar notificación como leída
  const marcarComoLeida = (id) => {
    setNotificaciones(
      notificaciones.map((notif) =>
        notif.id === id ? { ...notif, leida: true } : notif
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 📌 Header */}
      <header className="bg-orange-400 text-white shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* 📌 Botón para abrir/cerrar el menú en móviles */}
            {isMobile && (
              <button
                onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
                className="text-white p-2 rounded-md hover:bg-orange-600 transition"
                aria-label={isHeaderExpanded ? "Cerrar menú" : "Abrir menú"}
              >
                {isHeaderExpanded ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            )}
            <span className="text-xl font-bold capitalize ml-2">
              {moduleNamesMap[moduleName] || "VetAdmin"}
            </span>
          </div>

          {/* 📌 Botones de Notificaciones y Perfil */}
          <div className="flex items-center gap-4">
            {/* Notificaciones */}
            <div className="relative">
              <button
                onClick={toggleNotificaciones}
                className="flex items-center text-white hover:text-gray-200 transition"
                aria-label="Notificaciones"
              >
                <BellIcon className="w-6 h-6" />
                {!isMobile && <span className="ml-1">Notificaciones</span>}
                {notificaciones.some((notif) => !notif.leida) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notificaciones.filter((notif) => !notif.leida).length}
                  </span>
                )}
              </button>
              {/* Lista de Notificaciones */}
              <AnimatePresence>
                {notificacionesAbiertas && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg"
                  >
                    {notificaciones.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b ${
                          notif.leida ? "bg-gray-50" : "bg-white"
                        }`}
                      >
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

            {/* Perfil */}
            <div className="relative">
              <button
                onClick={togglePerfil}
                className="flex items-center text-white hover:text-gray-200 transition"
                aria-label="Perfil"
              >
                <UserCircleIcon className="w-6 h-6" />
                {!isMobile && <span className="ml-1">Perfil</span>}
              </button>
              {/* Menú de Perfil */}
              <AnimatePresence>
                {perfilAbierto && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg"
                  >
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Ver Perfil
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        // Lógica para cerrar sesión
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

        {/* 📌 Submódulos */}
        <nav
          className={`mt-4 transition-all duration-300 ${
            isHeaderExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:max-h-full md:opacity-100 overflow-hidden md:overflow-visible`}
        >
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

      {/* 📌 Contenido Principal */}
      <main className="flex-1 p-4 bg-gray-50">{children}</main>

      {/* 📌 Botón para volver al Dashboard */}
      <footer className="p-4 bg-orange-400 text-white">
        <Link
          to="/dashboard"
          className="flex items-center justify-center py-2 px-4 bg-orange-600 rounded-md hover:bg-orange-400 transition"
        >
          🏠 Volver al Dashboard
        </Link>
      </footer>
    </div>
  );
};

export default MainLayout;