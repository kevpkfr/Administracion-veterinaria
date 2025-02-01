import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas principales
import RegisterBusinessPage from "../pages/RegisterBusinessPage";
import InitialSetupPage from "../pages/InitialSetupPage";
import Dashboard from "../pages/Dashboard";

// Módulos principales
import UsuariosModule from "../modules/usuarios/UsuariosModule";
import CitasModule from "../modules/citas/CitasModule";
import PacientesModule from "../modules/pacientes/PacientesModule";
import FacturacionModule from "../modules/facturacion/FacturacionModule";
import InventarioModule from "../modules/inventario/InventarioModule";
import EmpleadosModule from "../modules/empleados/EmpleadosModule";
import ReportesModule from "../modules/reportes/ReportesModule";
import ConfiguracionModule from "../modules/configuracion/ConfiguracionModule";

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
        <Route path="/dashboard/usuarios/*" element={<UsuariosModule />} />
        <Route path="/dashboard/citas/*" element={<CitasModule />} />
        <Route path="/dashboard/pacientes/*" element={<PacientesModule />} />
        <Route path="/dashboard/facturacion/*" element={<FacturacionModule />} />
        <Route path="/dashboard/inventario/*" element={<InventarioModule />} />
        <Route path="/dashboard/empleados/*" element={<EmpleadosModule />} />
        <Route path="/dashboard/reportes/*" element={<ReportesModule />} />
        <Route path="/dashboard/configuracion/*" element={<ConfiguracionModule />} />

        {/* 🔹 Página 404 */}
        <Route path="*" element={<div className="p-4 text-center text-red-500 font-bold">404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
