import React from "react";
import { useParams } from "react-router-dom";

const DatosPropietarioPage = () => {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">👤 Datos del Propietario</h2>
      <p>Información detallada del propietario con ID: {id}</p>
    </div>
  );
};

export default DatosPropietarioPage;
