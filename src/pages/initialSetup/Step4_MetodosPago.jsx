import React, { useState } from "react";

const Step4_MetodosPago = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [metodos, setMetodos] = useState(formData.metodosPago);

  const handleNext = () => {
    updateFormData({ metodosPago: metodos });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#E76F24] mb-6">Paso 4: Métodos de Pago Aceptados</h3>

      <div className="space-y-4">
        {["tarjeta", "efectivo", "transferencia"].map((metodo) => (
          <label key={metodo} className="flex items-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <input 
              type="checkbox" 
              checked={metodos[metodo]} 
              onChange={() => setMetodos({ ...metodos, [metodo]: !metodos[metodo] })}
              className="form-checkbox h-5 w-5 text-[#E76F24] rounded focus:ring-[#E76F24]" 
            />
            <span>{metodo.charAt(0).toUpperCase() + metodo.slice(1)}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button className="bg-[#FF8C42] text-white px-6 py-3 rounded-lg hover:bg-[#E76F24] transition duration-300" onClick={prevStep}>Volver</button>
        <button className="bg-[#FF8C42] text-white px-6 py-3 rounded-lg hover:bg-[#E76F24] transition duration-300" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Step4_MetodosPago;
