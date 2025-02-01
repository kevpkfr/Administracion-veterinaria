import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// 📌 Importaciones de las páginas del módulo de Reportes
import GenerarReportesPage from "./pages/GenerarReportesPage";
import ReportesVentasPage from "./pages/ReportesVentasPage";
import ReportesPacientesPage from "./pages/ReportesPacientesPage";
import ReportesFinancierosPage from "./pages/ReportesFinancierosPage";
import ConfiguracionReportesPage from "./pages/ConfiguracionReportesPage";

const ReportesModule = () => {
  return (
    <MainLayout>
      <Routes>
        {/* 📌 Redirigir a la página inicial del módulo */}
        <Route index element={<Navigate to="generar" replace />} />

        {/* 📌 Definir rutas para los submódulos */}
        <Route path="generar" element={<GenerarReportesPage />} />
        <Route path="ventas" element={<ReportesVentasPage />} />
        <Route path="pacientes" element={<ReportesPacientesPage />} />
        <Route path="financieros" element={<ReportesFinancierosPage />} />
        <Route path="configuracion" element={<ConfiguracionReportesPage />} />
      </Routes>
    </MainLayout>
  );
};

export default ReportesModule;
