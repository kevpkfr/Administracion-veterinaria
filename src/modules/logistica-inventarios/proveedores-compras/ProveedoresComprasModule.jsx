import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistroProveedoresPage from "./pages/RegistroProveedoresPage";
import HistorialComprasPage from "./pages/HistorialComprasPage";
import OrdenesPendientesPage from "./pages/OrdenesPendientesPage";

const ProveedoresComprasModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="registro" replace />} />
      <Route path="registro" element={<RegistroProveedoresPage />} />
      <Route path="historial" element={<HistorialComprasPage />} />
      <Route path="ordenes" element={<OrdenesPendientesPage />} />
    </Routes>
  );
};

export default ProveedoresComprasModule;
