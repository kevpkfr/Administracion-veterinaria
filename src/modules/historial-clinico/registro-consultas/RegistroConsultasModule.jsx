import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NuevaConsultaPage from "./pages/NuevaConsultaPage";
import ListadoConsultasPage from "./pages/ListadoConsultasPage";
import DetallesConsultaPage from "./pages/DetallesConsultaPage";

const RegistroConsultasModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="listado" replace />} />
      <Route path="nueva" element={<NuevaConsultaPage />} />
      <Route path="listado" element={<ListadoConsultasPage />} />
      <Route path="detalles/:id" element={<DetallesConsultaPage />} />
    </Routes>
  );
};

export default RegistroConsultasModule;
