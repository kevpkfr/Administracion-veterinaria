import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ListadoRolesPage from "./pages/ListadoRolesPage";
import AsignarPermisosPage from "./pages/AsignarPermisosPage";
import AuditoriaSeguridadPage from "./pages/AuditoriaSeguridadPage";

const RolesPermisosModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="listado-roles" replace />} />
      <Route path="listado-roles" element={<ListadoRolesPage />} />
      <Route path="asignar-permisos" element={<AsignarPermisosPage />} />
      <Route path="auditoria-seguridad" element={<AuditoriaSeguridadPage />} />
    </Routes>
  );
};

export default RolesPermisosModule;
