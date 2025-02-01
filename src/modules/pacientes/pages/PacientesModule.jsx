import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// 📌 Importaciones de las páginas del módulo de pacientes
import HistoriasClinicasPage from "./pages/HistoriasClinicasPage";
import DetallePacientePage from "./pages/DetallePacientePage";
import VacunacionesPage from "./pages/VacunacionesPage";

const PacientesModule = () => {
  return (
    <MainLayout>
      <Routes>
        {/* 📌 Redirigir a la página inicial del módulo */}
        <Route index element={<Navigate to="historias" replace />} />

        {/* 📌 Definir rutas para los submódulos */}
        <Route path="historias" element={<HistoriasClinicasPage />} />
        <Route path="detalle/:id" element={<DetallePacientePage />} />
        <Route path="vacunaciones" element={<VacunacionesPage />} />
      </Routes>
    </MainLayout>
  );
};

export default PacientesModule;
