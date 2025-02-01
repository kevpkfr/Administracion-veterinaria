import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// 📌 Importaciones de las páginas del módulo de Inventario
import ControlInventarioPage from "./pages/ControlInventarioPage";
import HistorialMovimientosPage from "./pages/HistorialMovimientosPage";
import PedidosPage from "./pages/PedidosPage";
import CategoriasPage from "./pages/CategoriasPage";
import ConfiguracionInventarioPage from "./pages/ConfiguracionInventarioPage";

const InventarioModule = () => {
  return (
    <MainLayout>
      <Routes>
        {/* 📌 Redirigir a la página inicial del módulo */}
        <Route index element={<Navigate to="control" replace />} />

        {/* 📌 Definir rutas para los submódulos */}
        <Route path="control" element={<ControlInventarioPage />} />
        <Route path="historial" element={<HistorialMovimientosPage />} />
        <Route path="pedidos" element={<PedidosPage />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="configuracion" element={<ConfiguracionInventarioPage />} />
      </Routes>
    </MainLayout>
  );
};

export default InventarioModule;
