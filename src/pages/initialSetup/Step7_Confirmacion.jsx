import React from "react";

const Step7_Confirmacion = ({ nextStep, prevStep, formData }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#E76F24] mb-6">Paso 7: Confirmación</h3>
      <p className="text-gray-700">Revisa todos los datos antes de continuar.</p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
        <h4 className="text-lg font-semibold text-[#E76F24]">Datos ingresados:</h4>
        <p><strong>📌 Negocio:</strong> {formData.nombreNegocio}</p>
        <p><strong>📜 Descripción:</strong> {formData.descripcion}</p>
        <p><strong>🏢 Rubro:</strong> {formData.rubro}</p>
        <p><strong>📍 Ubicación:</strong> {formData.direccion}, {formData.ciudad}</p>
        <p><strong>📞 Teléfono:</strong> {formData.telefono}</p>
        <p><strong>✉️ Correo:</strong> {formData.correo}</p>
        <p><strong>⏰ Horarios:</strong> {formData.horarioApertura} - {formData.horarioCierre}</p>
        <p><strong>📅 Días de Atención:</strong> {formData.diasAtencion.join(", ")}</p>
        <p><strong>💳 Métodos de Pago:</strong> {Object.keys(formData.metodosPago).filter(key => formData.metodosPago[key]).join(", ")}</p>
        <p><strong>🌐 Redes Sociales:</strong> {formData.facebook || formData.instagram || formData.twitter || formData.sitioWeb ? "Sí" : "No especificado"}</p>
        <p><strong>🎨 Color Tema:</strong> <span style={{ backgroundColor: formData.color, padding: "5px 10px", borderRadius: "5px", color: "white" }}>{formData.color}</span></p>
      </div>

      <div className="flex justify-between mt-8">
        <button className="bg-[#FF8C42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E76F24] transition duration-300" onClick={prevStep}>🔙 Volver</button>
        <button className="bg-[#FF8C42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E76F24] transition duration-300" onClick={nextStep}>🚀 Confirmar</button>
      </div>
    </div>
  );
};

export default Step7_Confirmacion;
