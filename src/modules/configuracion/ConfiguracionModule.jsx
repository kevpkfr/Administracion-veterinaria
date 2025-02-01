import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ConfiguracionPage from "./pages/ConfiguracionPage";
import PreferenciasPage from "./pages/PreferenciasPage";
import SeguridadPage from "./pages/SeguridadPage";
import NotificacionesPage from "./pages/NotificacionesPage";
import BackupPage from "./pages/BackupPage";
import DatosGeneralesPage from "./pages/DatosGeneralesPage"; // 📌 Nueva importación

const ConfiguracionModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="general" replace />} />
        <Route path="general" element={<ConfiguracionPage />} />
        <Route path="preferencias" element={<PreferenciasPage />} />
        <Route path="seguridad" element={<SeguridadPage />} />
        <Route path="notificaciones" element={<NotificacionesPage />} />
        <Route path="backup" element={<BackupPage />} />
        <Route path="datos-generales" element={<DatosGeneralesPage />} /> {/* 📌 Nueva ruta */}
      </Routes>
    </MainLayout>
  );
};

export default ConfiguracionModule;
