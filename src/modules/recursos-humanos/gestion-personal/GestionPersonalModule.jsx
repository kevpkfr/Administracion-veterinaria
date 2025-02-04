import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ListadoEmpleadosPage from "./pages/ListadoEmpleadosPage";
import RegistrarEmpleadoPage from "./pages/RegistrarEmpleadoPage";
import EvaluacionesPage from "./pages/EvaluacionesPage";

const GestionPersonalModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="listado" replace />} />
      <Route path="listado" element={<ListadoEmpleadosPage />} />
      <Route path="registrar" element={<RegistrarEmpleadoPage />} />
      <Route path="evaluaciones" element={<EvaluacionesPage />} />
    </Routes>
  );
};

export default GestionPersonalModule;
