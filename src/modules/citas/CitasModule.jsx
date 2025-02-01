import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// 📌 Importaciones de las páginas del módulo de citas
import AgendaCitasPage from "./pages/AgendaCitasPage";
import ReasignarCitasPage from "./pages/ReasignarCitasPage";
import HistorialCitasPage from "./pages/HistorialCitasPage";
import ConfirmarCitasPage from "./pages/ConfirmarCitasPage";


const CitasModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="agenda" replace />} />
        <Route path="agenda" element={<AgendaCitasPage />} />
        <Route path="reasignar" element={<ReasignarCitasPage />} />
        <Route path="historial" element={<HistorialCitasPage />} />
        <Route path="confirmar" element={<ConfirmarCitasPage />} />
        
      </Routes>
    </MainLayout>
  );
};

export default CitasModule;
