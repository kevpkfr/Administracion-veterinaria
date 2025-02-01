import React, { useState } from "react";
import citasMockData from "../../../data/citasData"; // 📌 Importar mock data

const ReasignarCitasPage = () => {
  const [citas, setCitas] = useState(citasMockData); // 📌 Simular base de datos
  const [editando, setEditando] = useState(null); // 📌 Estado para editar citas
  const [form, setForm] = useState({ paciente: "", fecha: "", hora: "", veterinario: "" });

  // 📌 Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📌 Guardar cambios en una cita existente
  const handleGuardar = () => {
    setCitas(
      citas.map((cita) => (cita.id === editando ? { ...cita, ...form } : cita))
    );
    setEditando(null);
    setForm({ paciente: "", fecha: "", hora: "", veterinario: "" });
  };

  // 📌 Eliminar cita
  const handleEliminar = (id) => {
    setCitas(citas.filter((cita) => cita.id !== id));
  };

  // 📌 Editar cita (cargar datos en formulario)
  const handleEditar = (cita) => {
    setEditando(cita.id);
    setForm({ paciente: cita.paciente, fecha: cita.fecha, hora: cita.hora, veterinario: cita.veterinario });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🔄 Reasignar Citas</h2>

      {/* 📌 Tabla de Citas */}
      <div className="bg-white p-4 shadow rounded-lg">
        {/* 📌 Versión para móviles: Lista de tarjetas */}
        <div className="md:hidden">
          {citas.length === 0 ? (
            <p className="text-center text-gray-500">No hay citas programadas.</p>
          ) : (
            citas.map((cita) => (
              <div key={cita.id} className="border-b p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold">{cita.paciente}</p>
                  <p className="text-sm text-gray-600">{cita.fecha} - {cita.hora}</p>
                  <p className="text-sm text-gray-600">{cita.veterinario}</p>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors flex-1"
                      onClick={() => handleEditar(cita)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors flex-1"
                      onClick={() => handleEliminar(cita.id)}
                    >
                      ❌ Eliminar
                    </button>
                  </div>
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
                <th className="p-2">Paciente</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Hora</th>
                <th className="p-2">Veterinario</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id} className="border-b text-center hover:bg-gray-50 transition-colors">
                  <td className="p-2">{cita.paciente}</td>
                  <td className="p-2">{cita.fecha}</td>
                  <td className="p-2">{cita.hora}</td>
                  <td className="p-2">{cita.veterinario}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                      onClick={() => handleEditar(cita)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      onClick={() => handleEliminar(cita.id)}
                    >
                      ❌ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📌 Formulario para Editar Citas */}
      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">✏️ Editar Cita</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="paciente"
                value={form.paciente}
                onChange={handleChange}
                placeholder="Paciente"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="veterinario"
                value={form.veterinario}
                onChange={handleChange}
                placeholder="Veterinario"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditando(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardar}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  💾 Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReasignarCitasPage;