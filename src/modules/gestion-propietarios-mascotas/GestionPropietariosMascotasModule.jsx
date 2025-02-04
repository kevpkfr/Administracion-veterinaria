import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import RegistroPropietariosModule from "./registro-propietarios/RegistroPropietariosModule";
import RegistroMascotasModule from "./registro-mascotas/RegistroMascotasModule";

const GestionPropietariosMascotasModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="registro-propietarios" replace />} />
        <Route path="registro-propietarios/*" element={<RegistroPropietariosModule />} />
        <Route path="registro-mascotas/*" element={<RegistroMascotasModule />} />
      </Routes>
    </MainLayout>
  );
};

export default GestionPropietariosMascotasModule;
