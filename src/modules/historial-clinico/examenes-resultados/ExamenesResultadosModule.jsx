import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CargarResultadosPage from "./pages/CargarResultadosPage";
import HistorialExamenesPage from "./pages/HistorialExamenesPage";
import DiagnosticoPacientePage from "./pages/DiagnosticoPacientePage";

const ExamenesResultadosModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="historial" replace />} />
      <Route path="cargar" element={<CargarResultadosPage />} />
      <Route path="historial" element={<HistorialExamenesPage />} />
      <Route path="diagnostico/:id" element={<DiagnosticoPacientePage />} />
    </Routes>
  );
};

export default ExamenesResultadosModule;
