import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PersonalizacionUIPage from "./pages/PersonalizacionUIPage";
import ConfiguracionLogosPage from "./pages/ConfiguracionLogosPage";
import PaletaColoresPage from "./pages/PaletaColoresPage";

const DisenoIdentidadModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="personalizacion-ui" replace />} />
      <Route path="personalizacion-ui" element={<PersonalizacionUIPage />} />
      <Route path="configuracion-logos" element={<ConfiguracionLogosPage />} />
      <Route path="paleta-colores" element={<PaletaColoresPage />} />
    </Routes>
  );
};

export default DisenoIdentidadModule;
