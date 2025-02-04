import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import RegistroConsultasModule from "./registro-consultas/RegistroConsultasModule";
import ExamenesResultadosModule from "./examenes-resultados/ExamenesResultadosModule";

const HistorialClinicoModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="registro-consultas" replace />} />
        <Route path="registro-consultas/*" element={<RegistroConsultasModule />} />
        <Route path="examenes-resultados/*" element={<ExamenesResultadosModule />} />
      </Routes>
    </MainLayout>
  );
};

export default HistorialClinicoModule;
