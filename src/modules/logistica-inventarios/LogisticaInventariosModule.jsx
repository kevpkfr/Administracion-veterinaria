import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import InventarioProductosModule from "./inventario-productos/InventarioProductosModule";
import ProveedoresComprasModule from "./proveedores-compras/ProveedoresComprasModule";

const LogisticaInventariosModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="inventario-productos" replace />} />
        <Route path="inventario-productos/*" element={<InventarioProductosModule />} />
        <Route path="proveedores-compras/*" element={<ProveedoresComprasModule />} />
      </Routes>
    </MainLayout>
  );
};

export default LogisticaInventariosModule;
