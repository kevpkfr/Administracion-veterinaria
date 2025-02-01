import React, { useState } from "react";

const Step2_UbicacionContacto = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [direccion, setDireccion] = useState(formData.direccion || "");
  const [ciudad, setCiudad] = useState(formData.ciudad || "");
  const [telefono, setTelefono] = useState(formData.telefono || "");
  const [correo, setCorreo] = useState(formData.correo || "");

  const handleNext = () => {
    if (!direccion || !ciudad || !telefono || !correo) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    updateFormData({ direccion, ciudad, telefono, correo });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Paso 2: Ubicación y Contacto</h3>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección:</label>
        <input 
          type="text" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Ej: Calle 123, Colonia Centro" 
          value={direccion} 
          onChange={(e) => setDireccion(e.target.value)} 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad:</label>
        <input 
          type="text" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Ej: Ciudad de México, México" 
          value={ciudad} 
          onChange={(e) => setCiudad(e.target.value)} 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono:</label>
        <input 
          type="text" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Ej: +52 55 1234 5678" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico:</label>
        <input 
          type="email" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Ej: contacto@negocio.com" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
        />
      </div>

      <div className="flex justify-between mt-8">
        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300" onClick={prevStep}>Volver</button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Step2_UbicacionContacto;
