import React, { useState } from "react";

const Step5_RedesSociales = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [redes, setRedes] = useState(formData);

  const handleNext = () => {
    updateFormData(redes);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Paso 5: Redes Sociales</h3>

      {["facebook", "instagram", "twitter", "sitioWeb", "whatsapp", "telegram"].map((red) => (
        <div key={red}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{red.charAt(0).toUpperCase() + red.slice(1)}:</label>
          <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={redes[red]} onChange={(e) => setRedes({ ...redes, [red]: e.target.value })} placeholder={`Ej: ${red}.com/tunegocio`}
          />
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300" onClick={prevStep}>Volver</button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Step5_RedesSociales;
