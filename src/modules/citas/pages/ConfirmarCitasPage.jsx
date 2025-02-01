import React, { useState } from "react";
import citasMockData from "../../../data/citasData";

const ModalDetalles = ({ cita, onClose, onConfirm }) => {
  if (!cita) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-600">📋 Detalles de la Cita</h3>
        <div className="space-y-3 text-sm md:text-base">
          <p><strong className="text-gray-800">Paciente:</strong> {cita.paciente}</p>
          <p><strong className="text-gray-800">Fecha:</strong> {cita.fecha}</p>
          <p><strong className="text-gray-800">Hora:</strong> {cita.hora}</p>
          <p><strong className="text-gray-800">Veterinario:</strong> {cita.veterinario}</p>
          <p><strong className="text-gray-800">Motivo:</strong> {cita.motivo}</p>
          <p><strong className="text-gray-800">Estado:</strong> {cita.estado}</p>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-3 justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full md:w-auto"
            onClick={onConfirm}
          >
            ✅ Confirmar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors w-full md:w-auto"
            onClick={onClose}
          >
            ❌ Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmarCitasPage = () => {
  const [citas, setCitas] = useState(citasMockData);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const citasPendientes = citas.filter(cita => cita.estado === "Pendiente");

  const confirmarCita = (id) => {
    setCitas(citas.map(cita => 
      cita.id === id ? { ...cita, estado: "Confirmada" } : cita
    ));
    setCitaSeleccionada(null);
  };

  const cancelarCita = (id) => {
    setCitas(citas.filter(cita => cita.id !== id));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800">✅ Confirmar Citas</h2>
        <p className="text-gray-600 mt-2 md:text-lg">Revisa y confirma las citas pendientes.</p>
      </header>

      {/* Versión móvil */}
      <div className="md:hidden bg-white rounded-xl shadow-lg">
        {citasPendientes.length > 0 ? (
          citasPendientes.map((cita) => (
            <div key={cita.id} className="border-b p-4 hover:bg-gray-50 transition-colors">
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">{cita.paciente}</p>
                <div className="text-sm text-gray-600">
                  <p>{cita.fecha}</p>
                  <p>{cita.hora} - {cita.veterinario}</p>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => setCitaSeleccionada(cita)}
                  >
                    ✅ Confirmar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => cancelarCita(cita.id)}
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            🎉 No hay citas pendientes
          </div>
        )}
      </div>

      {/* Versión escritorio */}
      <div className="hidden md:block bg-white p-6 shadow-lg rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Paciente</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Hora</th>
              <th className="p-3">Veterinario</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasPendientes.map((cita) => (
              <tr key={cita.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 text-center">{cita.paciente}</td>
                <td className="p-3 text-center">{cita.fecha}</td>
                <td className="p-3 text-center">{cita.hora}</td>
                <td className="p-3 text-center">{cita.veterinario}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      onClick={() => setCitaSeleccionada(cita)}
                    >
                      ✅ Confirmar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => cancelarCita(cita.id)}
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {citasPendientes.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  🎉 No hay citas pendientes de confirmación
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {citaSeleccionada && (
        <ModalDetalles
          cita={citaSeleccionada}
          onClose={() => setCitaSeleccionada(null)}
          onConfirm={() => confirmarCita(citaSeleccionada.id)}
        />
      )}
    </div>
  );
};

export default ConfirmarCitasPage;