import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PanelControlModule from "./panel-control/PanelControlModule";
import ReportesPersonalizadosModule from "./reportes-personalizados/ReportesPersonalizadosModule";

const ReportesGeneralesModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="panel-control" replace />} />
        <Route path="panel-control/*" element={<PanelControlModule />} />
        <Route path="reportes-personalizados/*" element={<ReportesPersonalizadosModule />} />
      </Routes>
    </MainLayout>
  );
};

export default ReportesGeneralesModule;
