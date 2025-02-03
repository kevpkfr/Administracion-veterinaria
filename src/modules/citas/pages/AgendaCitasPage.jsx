import React, { useState } from "react";
import citasMockData from "../../../data/citasData"; // 📌 Importar mock data

const AgendaCitasPage = () => {
  const [citas, setCitas] = useState(citasMockData); // 📌 Simular base de datos
  const [form, setForm] = useState({ paciente: "", fecha: "", hora: "", veterinario: "" });
  const [errors, setErrors] = useState({}); // 📌 Errores de validación

  // 📌 Validar campos del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!form.paciente) newErrors.paciente = "Paciente es obligatorio.";
    if (!form.fecha) newErrors.fecha = "Fecha es obligatoria.";
    if (!form.hora) newErrors.hora = "Hora es obligatoria.";
    if (!form.veterinario) newErrors.veterinario = "Veterinario es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 📌 Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpiar errores al escribir
  };

  // 📌 Agregar nueva cita
  const handleGuardar = () => {
    if (validateForm()) {
      const nuevaCita = { id: Date.now(), ...form };
      setCitas([...citas, nuevaCita]);
      // 📌 Limpiar formulario
      setForm({ paciente: "", fecha: "", hora: "", veterinario: "" });
    }
  };

  // 📌 Eliminar cita
  const handleEliminar = (id) => {
    setCitas(citas.filter((cita) => cita.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">📅 Agenda de Citas</h2>

      {/* 📌 Formulario para Agendar Citas */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">➕ Agendar Nueva Cita</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="paciente"
              value={form.paciente}
              onChange={handleChange}
              placeholder="Nombre del Paciente"
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.paciente ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.paciente && <p className="text-red-500 text-sm mt-1">{errors.paciente}</p>}
          </div>
          <div>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.fecha ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fecha && <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>}
          </div>
          <div>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.hora ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.hora && <p className="text-red-500 text-sm mt-1">{errors.hora}</p>}
          </div>
          <div>
            <input
              type="text"
              name="veterinario"
              value={form.veterinario}
              onChange={handleChange}
              placeholder="Nombre del Veterinario"
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.veterinario ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.veterinario && <p className="text-red-500 text-sm mt-1">{errors.veterinario}</p>}
          </div>
        </div>
        <button
          onClick={handleGuardar}
          className="bg-orange hover:bg-darkOrange text-white px-4 py-2 rounded"
        >
          📌 Agendar Cita
        </button>
      </div>

      {/* 📌 Tabla de Citas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🗓️ Citas Programadas</h3>
        {/* 📌 Versión para móviles: Lista de tarjetas */}
        <div className="md:hidden">
          {citas.length === 0 ? (
            <p className="text-center text-gray-500">No hay citas programadas.</p>
          ) : (
            citas.map((cita) => (
              <div key={cita.id} className="border-b p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{cita.paciente}</p>
                    <p className="text-sm text-gray-600">{cita.fecha} - {cita.hora}</p>
                    <p className="text-sm text-gray-600">{cita.veterinario}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => handleEliminar(cita.id)}
                  >
                    ❌ Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 📌 Versión para escritorio: Tabla tradicional */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Paciente</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Hora</th>
                <th className="p-3 text-left">Veterinario</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">{cita.paciente}</td>
                  <td className="p-3">{cita.fecha}</td>
                  <td className="p-3">{cita.hora}</td>
                  <td className="p-3">{cita.veterinario}</td>
                  <td className="p-3 flex justify-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => handleEliminar(cita.id)}
                    >
                      ❌ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {citas.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-3">
                    No hay citas programadas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgendaCitasPage;