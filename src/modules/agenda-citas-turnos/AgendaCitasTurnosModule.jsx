import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import CalendarioCitasModule from "./calendario-citas/CalendarioCitasModule";
import TurnosPersonalModule from "./turnos-personal/TurnosPersonalModule";

const AgendaCitasTurnosModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="calendario-citas" replace />} />
        <Route path="calendario-citas/*" element={<CalendarioCitasModule />} />
        <Route path="turnos-personal/*" element={<TurnosPersonalModule />} />
      </Routes>
    </MainLayout>
  );
};

export default AgendaCitasTurnosModule;
