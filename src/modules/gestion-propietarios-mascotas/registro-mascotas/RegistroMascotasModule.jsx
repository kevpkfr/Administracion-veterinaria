import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NuevaMascotaPage from "./pages/NuevaMascotaPage";
import ListadoMascotasPage from "./pages/ListadoMascotasPage";
import HistorialMascotaPage from "./pages/HistorialMascotaPage";

const RegistroMascotasModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="listado-mascotas" replace />} />
      <Route path="nueva" element={<NuevaMascotaPage />} />
      <Route path="listado-mascotas" element={<ListadoMascotasPage />} />
      <Route path="historial/:id" element={<HistorialMascotaPage />} />
    </Routes>
  );
};

export default RegistroMascotasModule;
