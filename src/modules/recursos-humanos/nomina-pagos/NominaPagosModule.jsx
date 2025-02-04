import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GenerarNominaPage from "./pages/GenerarNominaPage";
import HistorialPagosPage from "./pages/HistorialPagosPage";
import BonificacionesPage from "./pages/BonificacionesPage";

const NominaPagosModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="generar" replace />} />
      <Route path="generar" element={<GenerarNominaPage />} />
      <Route path="historial" element={<HistorialPagosPage />} />
      <Route path="bonificaciones" element={<BonificacionesPage />} />
    </Routes>
  );
};

export default NominaPagosModule;
