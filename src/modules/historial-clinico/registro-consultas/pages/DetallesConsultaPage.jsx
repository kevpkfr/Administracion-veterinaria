import React from "react";
import { useParams } from "react-router-dom";

const DetallesConsultaPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">📄 Detalles de la Consulta</h2>
      <p>Información detallada de la consulta con ID: {id}</p>
    </div>
  );
};

export default DetallesConsultaPage;
