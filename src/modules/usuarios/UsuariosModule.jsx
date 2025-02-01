import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// Submódulos de Usuarios
import GestionUsuariosPage from "./pages/GestionUsuariosPage";
import LogsUsuariosPage from "./pages/LogsUsuariosPage";
import RolesPermisosPage from "./pages/RolesPermisosPage";
import HorariosUsuariosPage from "./pages/HorariosUsuariosPage";
import EvaluacionUsuariosPage from "./pages/EvaluacionUsuariosPage";
import CapacitacionesUsuariosPage from "./pages/CapacitacionesUsuariosPage";
import AsistenciaUsuariosPage from "./pages/AsistenciaUsuariosPage";

const UsuariosModule = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <Routes>
          <Route index element={<Navigate to="gestion" replace />} />
          <Route path="gestion" element={<GestionUsuariosPage />} />
          <Route path="logs" element={<LogsUsuariosPage />} />
          <Route path="roles" element={<RolesPermisosPage />} />
          <Route path="horarios" element={<HorariosUsuariosPage />} />
          <Route path="evaluacion" element={<EvaluacionUsuariosPage />} />
          <Route path="capacitaciones" element={<CapacitacionesUsuariosPage />} />
          <Route path="asistencia" element={<AsistenciaUsuariosPage />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default UsuariosModule;
