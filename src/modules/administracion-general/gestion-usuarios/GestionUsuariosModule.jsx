import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ListadoUsuariosPage from "./pages/ListadoUsuariosPage";
import CrearUsuarioPage from "./pages/CrearUsuarioPage";
import RegistroAccesosPage from "./pages/RegistroAccesosPage";

const GestionUsuariosModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="listado-usuarios" replace />} />
      <Route path="listado-usuarios" element={<ListadoUsuariosPage />} />
      <Route path="crear-usuario" element={<CrearUsuarioPage />} />
      <Route path="registro-accesos" element={<RegistroAccesosPage />} />
    </Routes>
  );
};

export default GestionUsuariosModule;
