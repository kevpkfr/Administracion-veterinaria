import React, { useState } from "react";

const Step6_Personalizacion = ({ nextStep, prevStep }) => {
  const [color, setColor] = useState("#E76F24");
  const [, setImagenFondo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFondo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (!color) {
      setError("Debes seleccionar un color para el tema.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Título del paso */}
      <h3 className="text-2xl font-bold text-[#E76F24] mb-6">
        Paso 6: Personalización
      </h3>

      {/* Selector de Color */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Color del Tema:
        </label>
        <input
          type="color"
          className="w-16 h-10 border rounded-lg cursor-pointer"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      {/* Selector de Imagen de Fondo (Opcional) */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Imagen de Fondo (Opcional):
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F24]"
          onChange={handleImageChange}
        />
      </div>

      {/* Vista Previa de la Imagen (Solo si el usuario selecciona una) */}
      {preview && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Vista previa:
          </p>
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-48 object-cover rounded-lg border border-gray-300 shadow-md"
          />
        </div>
      )}

      {/* Mensaje de error */}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      {/* Botones de acción */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-[#FF8C42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E76F24] transition duration-300 transform hover:scale-105"
          onClick={prevStep}
        >
          Volver
        </button>
        <button
          className="bg-[#FF8C42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E76F24] transition duration-300 transform hover:scale-105"
          onClick={handleNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Step6_Personalizacion;
