import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// 📌 Importaciones de las páginas del módulo de facturación
import FacturasPage from "./pages/FacturasPage";
import ReportesFinancierosPage from "./pages/ReportesFinancierosPage";
import PagosPendientesPage from "./pages/PagosPendientesPage";
import HistorialTransaccionesPage from "./pages/HistorialTransaccionesPage";
import ConfiguracionFacturacionPage from "./pages/ConfiguracionFacturacionPage";

const FacturacionModule = () => {
  return (
    <MainLayout>
      <Routes>
        {/* 📌 Redirigir a la página inicial del módulo */}
        <Route index element={<Navigate to="facturas" replace />} />

        {/* 📌 Definir rutas para los submódulos */}
        <Route path="facturas" element={<FacturasPage />} />
        <Route path="reportes" element={<ReportesFinancierosPage />} />
        <Route path="pagos" element={<PagosPendientesPage />} />
        <Route path="historial-transacciones" element={<HistorialTransaccionesPage />} />
        <Route path="configuracion" element={<ConfiguracionFacturacionPage />} />
      </Routes>
    </MainLayout>
  );
};

export default FacturacionModule;
