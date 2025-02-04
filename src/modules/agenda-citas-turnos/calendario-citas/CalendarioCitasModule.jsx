import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VerCalendarioPage from "./pages/VerCalendarioPage";
import EventosCitasPage from "./pages/EventosCitasPage";
import NotificacionesCitasPage from "./pages/NotificacionesCitasPage";

const CalendarioCitasModule = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="ver" replace />} />
      <Route path="ver" element={<VerCalendarioPage />} />
      <Route path="eventos" element={<EventosCitasPage />} />
      <Route path="notificaciones" element={<NotificacionesCitasPage />} />
    </Routes>
  );
};

export default CalendarioCitasModule;
