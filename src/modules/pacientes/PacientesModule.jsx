import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// 📌 Importaciones de las páginas del módulo de pacientes
import HistoriasClinicasPage from "./pages/HistoriasClinicasPage";
import DetallePacientePage from "./pages/DetallePacientePage";
import VacunacionesPage from "./pages/VacunacionesPage";
import ExamenesPage from "./pages/ExamenesPage";
import TratamientosPage from "./pages/TratamientosPage";

const PacientesModule = () => {
  return (
    <MainLayout>
      <Routes>
        {/* 📌 Redirigir a la página principal del módulo */}
        <Route index element={<Navigate to="historias" replace />} />

        {/* 📌 Submódulos */}
        <Route path="historias" element={<HistoriasClinicasPage />} />
        <Route path="vacunaciones" element={<VacunacionesPage />} />
        <Route path="examenes" element={<ExamenesPage />} />
        <Route path="tratamientos" element={<TratamientosPage />} />

        {/* 📌 Ruta dinámica para ver detalle del paciente */}
        <Route path="detalle/:id" element={<DetallePacientePage />} />
      </Routes>
    </MainLayout>
  );
};

export default PacientesModule;
