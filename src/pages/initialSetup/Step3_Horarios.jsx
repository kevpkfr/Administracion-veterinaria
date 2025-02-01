import React, { useState } from "react";

const Step3_Horarios = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [apertura, setApertura] = useState(formData.horarioApertura || "");
  const [cierre, setCierre] = useState(formData.horarioCierre || "");
  const [dias, setDias] = useState(formData.diasAtencion || []);
  const [errors, setErrors] = useState({});

  const toggleDia = (dia) => {
    setDias(dias.includes(dia) ? dias.filter((d) => d !== dia) : [...dias, dia]);
  };

  const handleNext = () => {
    if (!apertura || !cierre || dias.length === 0) {
      setErrors({ message: "Todos los campos son obligatorios." });
      return;
    }
    updateFormData({ horarioApertura: apertura, horarioCierre: cierre, diasAtencion: dias });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Paso 3: Horarios de Atención</h3>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Horario de Apertura:</label>
        <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={apertura} onChange={(e) => setApertura(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Horario de Cierre:</label>
        <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={cierre} onChange={(e) => setCierre(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Días de Atención:</label>
        <div className="flex gap-4 flex-wrap">
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia) => (
            <label key={dia} className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
              <input type="checkbox" checked={dias.includes(dia)} onChange={() => toggleDia(dia)} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
              <span>{dia}</span>
            </label>
          ))}
        </div>
      </div>

      {errors.message && <p className="text-sm text-red-500 mt-2">{errors.message}</p>}

      <div className="flex justify-between mt-8">
        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300" onClick={prevStep}>Volver</button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Step3_Horarios;
