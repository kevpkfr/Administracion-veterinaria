import React from "react";
import { useParams } from "react-router-dom";

const HistorialMascotaPage = () => {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">📖 Historial de la Mascota</h2>
      <p>Consulta el historial clínico y de visitas de la mascota con ID: {id}</p>
    </div>
  );
};

export default HistorialMascotaPage;
