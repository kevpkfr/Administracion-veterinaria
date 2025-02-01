import React, { useState } from "react";

const PreferenciasPage = () => {
  const [tema, setTema] = useState("light");
  const [color, setColor] = useState("#3498db");
  const [notificaciones, setNotificaciones] = useState(true);
  const [idioma, setIdioma] = useState("es");
  const [formatoFecha, setFormatoFecha] = useState("dd/mm/yyyy");

  // 📌 Guardar preferencias
  const handleGuardar = () => {
    alert("✅ Preferencias guardadas correctamente");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">🎨 Preferencias</h2>

      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* 📌 Selector de Tema */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">🌙 Tema de la Aplicación</label>
          <select value={tema} onChange={(e) => setTema(e.target.value)} className="w-full p-2 border rounded">
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>

        {/* 📌 Selección de Color Principal */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">🎨 Color Principal</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 border rounded cursor-pointer"
          />
        </div>

        {/* 📌 Activar/Desactivar Notificaciones */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">🔔 Notificaciones</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificaciones}
              onChange={() => setNotificaciones(!notificaciones)}
              className="mr-2"
            />
            <span>{notificaciones ? "Activadas" : "Desactivadas"}</span>
          </div>
        </div>

        {/* 📌 Selección de Idioma */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">🌍 Idioma</label>
          <select value={idioma} onChange={(e) => setIdioma(e.target.value)} className="w-full p-2 border rounded">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
          </select>
        </div>

        {/* 📌 Formato de Fecha */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">📅 Formato de Fecha</label>
          <select value={formatoFecha} onChange={(e) => setFormatoFecha(e.target.value)} className="w-full p-2 border rounded">
            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
            <option value="yyyy/mm/dd">YYYY/MM/DD</option>
          </select>
        </div>

        {/* 📌 Botón Guardar */}
        <button onClick={handleGuardar} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          💾 Guardar Preferencias
        </button>
      </div>
    </div>
  );
};

export default PreferenciasPage;
