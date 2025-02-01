import React, { useState } from "react";

const ConfiguracionReportesPage = () => {
  const [formato, setFormato] = useState("PDF");
  const [frecuencia, setFrecuencia] = useState("diaria");
  const [horaEnvio, setHoraEnvio] = useState("08:00");
  const [destinatarios, setDestinatarios] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");

  // Validar formato de correos electrónicos
  const validarCorreos = (correos) => {
    const correoArray = correos.split(",").map((correo) => correo.trim());
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const correosInvalidos = correoArray.filter((correo) => !regexCorreo.test(correo));
    if (correosInvalidos.length > 0) {
      setErrorCorreo(`Correos inválidos: ${correosInvalidos.join(", ")}`);
    } else {
      setErrorCorreo("");
    }
  };

  // Guardar configuración
  const guardarConfiguracion = () => {
    if (!errorCorreo) {
      alert(`✅ Configuración guardada:\n\n📄 Formato: ${formato}\n📆 Frecuencia: ${frecuencia}\n⏰ Hora de envío: ${horaEnvio}\n📩 Destinatarios: ${destinatarios}`);
    } else {
      alert("❌ No se puede guardar la configuración debido a errores.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Configuración de Reportes</h2>
      <p className="text-gray-600 mb-6">Configura los parámetros y formatos de exportación para los reportes de la veterinaria.</p>

      {/* Configuración de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formato de Reporte */}
        <div>
          <label className="block font-semibold mb-2">📄 Formato de Exportación</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
          >
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
            <option value="CSV">CSV</option>
          </select>
        </div>

        {/* Frecuencia de Generación */}
        <div>
          <label className="block font-semibold mb-2">📆 Frecuencia de Reportes</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}
          >
            <option value="diaria">Diaria</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
          </select>
        </div>

        {/* Hora de Envío */}
        <div>
          <label className="block font-semibold mb-2">⏰ Hora de Envío</label>
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded"
            value={horaEnvio}
            onChange={(e) => setHoraEnvio(e.target.value)}
          />
        </div>

        {/* Destinatarios */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">📩 Destinatarios de Reportes</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ingrese correos electrónicos separados por comas"
            value={destinatarios}
            onChange={(e) => {
              setDestinatarios(e.target.value);
              validarCorreos(e.target.value);
            }}
          />
          {errorCorreo && <p className="text-red-600 text-sm mt-1">{errorCorreo}</p>}
        </div>
      </div>

      {/* Previsualización de Configuración */}
      <div className="bg-gray-100 p-4 mt-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">🔍 Previsualización</h3>
        <p><strong>📄 Formato:</strong> {formato}</p>
        <p><strong>📆 Frecuencia:</strong> {frecuencia}</p>
        <p><strong>⏰ Hora de Envío:</strong> {horaEnvio}</p>
        <p><strong>📩 Destinatarios:</strong> {destinatarios || "No ingresado"}</p>
      </div>

      {/* Botón Guardar */}
      <button
        onClick={guardarConfiguracion}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Guardar Configuración
      </button>
    </div>
  );
};

export default ConfiguracionReportesPage;
