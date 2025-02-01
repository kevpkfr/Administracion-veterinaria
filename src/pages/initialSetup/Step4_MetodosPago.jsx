import React, { useState } from "react";

const Step4_MetodosPago = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [metodos, setMetodos] = useState(formData.metodosPago);

  const handleNext = () => {
    updateFormData({ metodosPago: metodos });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Paso 4: Métodos de Pago Aceptados</h3>

      <div className="space-y-4">
        {["tarjeta", "efectivo", "transferencia"].map((metodo) => (
          <label key={metodo} className="flex items-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <input type="checkbox" checked={metodos[metodo]} onChange={() => setMetodos({ ...metodos, [metodo]: !metodos[metodo] })}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
            <span>{metodo.charAt(0).toUpperCase() + metodo.slice(1)}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300" onClick={prevStep}>Volver</button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Step4_MetodosPago;
