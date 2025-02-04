import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import GestionPersonalModule from "./gestion-personal/GestionPersonalModule";
import NominaPagosModule from "./nomina-pagos/NominaPagosModule";

const RecursosHumanosModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="gestion-personal" replace />} />
        <Route path="gestion-personal/*" element={<GestionPersonalModule />} />
        <Route path="nomina-pagos/*" element={<NominaPagosModule />} />
      </Routes>
    </MainLayout>
  );
};

export default RecursosHumanosModule;
