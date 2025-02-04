import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GestionTurnosPage from "./pages/GestionTurnosPage";
import DisponibilidadPersonalPage from "./pages/DisponibilidadPersonalPage";
import ReasignarTurnosPage from "./pages/ReasignarTurnosPage";

const TurnosPersonalModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="gestion" replace />} />
      <Route path="gestion" element={<GestionTurnosPage />} />
      <Route path="disponibilidad" element={<DisponibilidadPersonalPage />} />
      <Route path="reasignar" element={<ReasignarTurnosPage />} />
    </Routes>
  );
};

export default TurnosPersonalModule;
