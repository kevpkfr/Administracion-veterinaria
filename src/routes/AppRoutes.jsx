import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas principales
import RegisterBusinessPage from "../pages/RegisterBusinessPage";
import InitialSetupPage from "../pages/InitialSetupPage";
import Dashboard from "../pages/Dashboard";

// Módulos principales
import AdministracionGeneral from "../modules/administracion-general/AdministracionGeneral";
import GestionPropietariosMascotas from "../modules/gestion-propietarios-mascotas/GestionPropietariosMascotas";
import AgendaCitasTurnos from "../modules/agenda-citas-turnos/AgendaCitasTurnos";
import HistorialClinico from "../modules/historial-clinico/HistorialClinico";
import LogisticaInventarios from "../modules/logistica-inventarios/LogisticaInventarios";
import RecursosHumanos from "../modules/recursos-humanos/RecursosHumanos";
import ReportesGenerales from "../modules/reportes-generales/ReportesGenerales";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 🔹 Flujo inicial */}
        <Route path="/" element={<Navigate to="/register-business" replace />} />
        <Route path="/register-business" element={<RegisterBusinessPage />} />
        <Route path="/initial-setup" element={<InitialSetupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🔹 Módulos principales */}
        <Route path="/dashboard/administracion-general/*" element={<AdministracionGeneral />} />
        <Route path="/dashboard/gestion-propietarios-mascotas/*" element={<GestionPropietariosMascotas />} />
        <Route path="/dashboard/agenda-citas-turnos/*" element={<AgendaCitasTurnos />} />
        <Route path="/dashboard/historial-clinico/*" element={<HistorialClinico />} />
        <Route path="/dashboard/logistica-inventarios/*" element={<LogisticaInventarios />} />
        <Route path="/dashboard/recursos-humanos/*" element={<RecursosHumanos />} />
        <Route path="/dashboard/reportes-generales/*" element={<ReportesGenerales />} />

        {/* 🔹 Página 404 */}
        <Route path="*" element={<div className="p-4 text-center text-red-500 font-bold">404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;