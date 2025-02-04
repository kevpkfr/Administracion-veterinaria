import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import RolesPermisosModule from "./roles-permisos/RolesPermisosModule";
import GestionUsuariosModule from "./gestion-usuarios/GestionUsuariosModule";
import DisenoIdentidadModule from "./diseno-identidad/DisenoIdentidadModule";

const AdministracionGeneralModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="roles-permisos" replace />} />
        <Route path="roles-permisos/*" element={<RolesPermisosModule />} />
        <Route path="gestion-usuarios/*" element={<GestionUsuariosModule />} />
        <Route path="diseno-identidad/*" element={<DisenoIdentidadModule />} />
      </Routes>
    </MainLayout>
  );
};

export default AdministracionGeneralModule;
