import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CrearReportePage from "./pages/CrearReportePage";
import HistorialReportesPage from "./pages/HistorialReportesPage";
import ExportarDatosPage from "./pages/ExportarDatosPage";

const ReportesPersonalizadosModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="crear" replace />} />
      <Route path="crear" element={<CrearReportePage />} />
      <Route path="historial" element={<HistorialReportesPage />} />
      <Route path="exportar" element={<ExportarDatosPage />} />
    </Routes>
  );
};

export default ReportesPersonalizadosModule;
