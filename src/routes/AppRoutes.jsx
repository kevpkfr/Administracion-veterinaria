import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas principales
import RegisterBusinessPage from "../pages/RegisterBusinessPage";
import InitialSetupPage from "../pages/InitialSetupPage";
import Dashboard from "../pages/Dashboard";

// Módulos principales
import AdministracionGeneralModule from "../modules/administracion-general/AdministracionGeneralModule";
import GestionPropietariosMascotasModule from "../modules/gestion-propietarios-mascotas/GestionPropietariosMascotasModule";
import AgendaCitasTurnosModule from "../modules/agenda-citas-turnos/AgendaCitasTurnosModule";
import HistorialClinicoModule from "../modules/historial-clinico/HistorialClinicoModule";
import LogisticaInventariosModule from "../modules/logistica-inventarios/LogisticaInventariosModule";
import RecursosHumanosModule from "../modules/recursos-humanos/RecursosHumanosModule";
import ReportesGeneralesModule from "../modules/reportes-generales/ReportesGeneralesModule";

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
        <Route path="/dashboard/administracion-general/*" element={<AdministracionGeneralModule />} />
        <Route path="/dashboard/gestion-propietarios-mascotas/*" element={<GestionPropietariosMascotasModule />} />
        <Route path="/dashboard/agenda-citas-turnos/*" element={<AgendaCitasTurnosModule />} />
        <Route path="/dashboard/historial-clinico/*" element={<HistorialClinicoModule />} />
        <Route path="/dashboard/logistica-inventarios/*" element={<LogisticaInventariosModule />} />
        <Route path="/dashboard/recursos-humanos/*" element={<RecursosHumanosModule />} />
        <Route path="/dashboard/reportes-generales/*" element={<ReportesGeneralesModule />} />

        {/* 🔹 Página 404 */}
        <Route path="*" element={<div className="p-4 text-center text-red-500 font-bold">404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
