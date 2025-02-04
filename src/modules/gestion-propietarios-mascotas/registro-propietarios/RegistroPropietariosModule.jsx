import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NuevoPropietarioPage from "./pages/NuevoPropietarioPage";
import ListadoPropietariosPage from "./pages/ListadoPropietariosPage";
import DatosPropietarioPage from "./pages/DatosPropietarioPage";

const RegistroPropietariosModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="listado-propietarios" replace />} />
      <Route path="nuevo" element={<NuevoPropietarioPage />} />
      <Route path="listado-propietarios" element={<ListadoPropietariosPage />} />
      <Route path="datos/:id" element={<DatosPropietarioPage />} />
    </Routes>
  );
};

export default RegistroPropietariosModule;
