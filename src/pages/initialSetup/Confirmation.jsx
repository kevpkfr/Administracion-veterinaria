// src/pages/initialSetup/Confirmation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ formData, prevStep }) => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard"); // Redirigir al Dashboard
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-darkOrange">¡Resumen de Configuración!</h3>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-bold mb-2 text-orange">📌 Información del Negocio</h4>
        <p><strong>Nombre:</strong> {formData.nombreNegocio}</p>
        <p><strong>Descripción:</strong> {formData.descripcionNegocio}</p>
        <p><strong>Rubro:</strong> {formData.rubro}</p>
        <hr className="my-4" />

        <h4 className="text-lg font-bold mb-2 text-orange">📍 Ubicación y Contacto</h4>
        <p><strong>Dirección:</strong> {formData.direccion}</p>
        <p><strong>Ciudad:</strong> {formData.ciudad}</p>
        <p><strong>Teléfono:</strong> {formData.telefono}</p>
        <p><strong>Correo Electrónico:</strong> {formData.correo}</p>
        <hr className="my-4" />

        <h4 className="text-lg font-bold mb-2 text-orange">💳 Métodos de Pago</h4>
        <ul>
          {formData.metodosPago.tarjeta && <li>✔️ Tarjeta</li>}
          {formData.metodosPago.efectivo && <li>✔️ Efectivo</li>}
          {formData.metodosPago.transferencia && <li>✔️ Transferencia</li>}
          {formData.metodosPago.otros && <li>✔️ Otros: {formData.metodosPago.otros}</li>}
        </ul>
      </div>

      <div className="flex justify-between mt-6">
        <button className="bg-darkOrange text-white px-6 py-3 rounded-lg" onClick={prevStep}>
          🔙 Volver
        </button>
        <button className="bg-peach text-darkOrange px-6 py-3 rounded-lg hover:bg-orange" onClick={goToDashboard}>
          🚀 Finalizar y Ir al Dashboard
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
