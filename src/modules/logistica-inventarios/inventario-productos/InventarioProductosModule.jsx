import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistrarProductoPage from "./pages/RegistrarProductoPage";
import ListadoInventarioPage from "./pages/ListadoInventarioPage";
import AlertasStockPage from "./pages/AlertasStockPage";

const InventarioProductosModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="listado" replace />} />
      <Route path="registrar" element={<RegistrarProductoPage />} />
      <Route path="listado" element={<ListadoInventarioPage />} />
      <Route path="alertas" element={<AlertasStockPage />} />
    </Routes>
  );
};

export default InventarioProductosModule;
