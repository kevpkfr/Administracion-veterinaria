import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// 📌 Importaciones de las páginas del módulo de empleados
import GestionPersonalPage from "./pages/GestionPersonalPage";
import HorariosTurnosPage from "./pages/HorariosTurnosPage";
import EvaluacionesPage from "./pages/EvaluacionesPage";
import CapacitacionesPage from "./pages/CapacitacionesPage";
import AsistenciaPage from "./pages/AsistenciaPage";

const EmpleadosModule = () => {
  return (
    <MainLayout>
      <Routes>
        {/* 📌 Redirigir a la página inicial del módulo */}
        <Route index element={<Navigate to="gestion" replace />} />

        {/* 📌 Definir rutas para los submódulos */}
        <Route path="gestion" element={<GestionPersonalPage />} />
        <Route path="horarios" element={<HorariosTurnosPage />} />
        <Route path="evaluaciones" element={<EvaluacionesPage />} />
        <Route path="capacitaciones" element={<CapacitacionesPage />} />
        <Route path="asistencia" element={<AsistenciaPage />} />
      </Routes>
    </MainLayout>
  );
};

export default EmpleadosModule;
