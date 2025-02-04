import React from "react";
import { useParams } from "react-router-dom";

const DiagnosticoPacientePage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">🩺 Diagnóstico del Paciente</h2>
      <p>Detalles del diagnóstico médico con ID: {id}</p>
    </div>
  );
};

export default DiagnosticoPacientePage;
