import React, { useState } from "react";

const Step1_InfoNegocio = ({ nextStep, updateFormData, formData }) => {
  const [nombre, setNombre] = useState(formData.nombreNegocio || "");
  const [descripcion, setDescripcion] = useState(formData.descripcion || "");
  const [rubro, setRubro] = useState(formData.rubro || "");

  const handleNext = () => {
    if (!nombre || !descripcion || !rubro) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    updateFormData({ nombreNegocio: nombre, descripcion, rubro });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#E76F24] mb-6">Paso 1: Información del Negocio</h3>

      <div>
        <label className="block text-sm font-semibold text-[#FF8C42] mb-2">Nombre del Negocio:</label>
        <input 
          type="text" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]" 
          placeholder="Ej: Mi Veterinaria" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#FF8C42] mb-2">Descripción:</label>
        <textarea 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]" 
          placeholder="Describe tu negocio..." 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          rows="4"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#FF8C42] mb-2">Rubro:</label>
        <select 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]" 
          value={rubro} 
          onChange={(e) => setRubro(e.target.value)}
        >
          <option value="">Selecciona un rubro...</option>
          <option value="Veterinaria">Veterinaria</option>
          <option value="Tienda de Mascotas">Tienda de Mascotas</option>
          <option value="Peluquería Canina">Peluquería Canina</option>
        </select>
      </div>

      <div className="flex justify-end mt-8">
        <button 
          className="bg-[#FF8C42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E76F24] transition duration-300" 
          onClick={handleNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Step1_InfoNegocio;
