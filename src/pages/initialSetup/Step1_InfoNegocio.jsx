import React, { useState } from "react";

const Step1_InfoNegocio = ({ nextStep, updateFormData, formData }) => {
  const [nombre, setNombre] = useState(formData.nombreNegocio || "");
  const [descripcion, setDescripcion] = useState(formData.descripcion || "");
  const [rubro, setRubro] = useState(formData.rubro || "");
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = "El nombre del negocio es obligatorio.";
    if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!rubro) nuevosErrores.rubro = "Debes seleccionar un rubro.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleNext = () => {
    if (!validarCampos()) return;

    setCargando(true);
    updateFormData({ nombreNegocio: nombre, descripcion, rubro });

    // Simular una llamada a una API o procesamiento
    setTimeout(() => {
      setCargando(false);
      nextStep();
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 rounded-full p-3">1</span>
        Información del Negocio
      </h3>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Negocio:</label>
        <input 
          type="text" 
          className={`w-full px-4 py-3 border ${
            errores.nombre ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`} 
          placeholder="Ej: Mi Veterinaria" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción:</label>
        <textarea 
          className={`w-full px-4 py-3 border ${
            errores.descripcion ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`} 
          placeholder="Describe tu negocio..." 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          rows="4"
        />
        {errores.descripcion && <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Rubro:</label>
        <select 
          className={`w-full px-4 py-3 border ${
            errores.rubro ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`} 
          value={rubro} 
          onChange={(e) => setRubro(e.target.value)}
        >
          <option value="">Selecciona un rubro...</option>
          <option value="Veterinaria">Veterinaria</option>
          <option value="Tienda de Mascotas">Tienda de Mascotas</option>
          <option value="Peluquería Canina">Peluquería Canina</option>
        </select>
        {errores.rubro && <p className="text-red-500 text-sm mt-1">{errores.rubro}</p>}
      </div>

      <div className="flex justify-end mt-8">
        <button 
          className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold ${
            cargando ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          } transition duration-300 flex items-center gap-2`} 
          onClick={handleNext}
          disabled={cargando}
        >
          {cargando ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Procesando...
            </>
          ) : (
            <>
              Siguiente
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step1_InfoNegocio;