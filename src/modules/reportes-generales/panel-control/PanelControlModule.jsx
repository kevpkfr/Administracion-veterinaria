import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EstadisticasGeneralesPage from "./pages/EstadisticasGeneralesPage";
import TendenciasPage from "./pages/TendenciasPage";
import AlertasRelevantesPage from "./pages/AlertasRelevantesPage";

const PanelControlModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="estadisticas" replace />} />
      <Route path="estadisticas" element={<EstadisticasGeneralesPage />} />
      <Route path="tendencias" element={<TendenciasPage />} />
      <Route path="alertas" element={<AlertasRelevantesPage />} />
    </Routes>
  );
};

export default PanelControlModule;
