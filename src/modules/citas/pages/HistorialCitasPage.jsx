import React, { useState } from "react";
import citasMockData from "../../../data/citasData";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

const ModalDetalles = ({ cita, onClose }) => {
  if (!cita) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-600">
          📋 Detalles de la Cita
        </h3>
        <div className="space-y-3 text-sm md:text-base">
          <p>
            <strong className="text-gray-800">Paciente:</strong> {cita.paciente}
          </p>
          <p>
            <strong className="text-gray-800">Fecha:</strong> {cita.fecha}
          </p>
          <p>
            <strong className="text-gray-800">Hora:</strong> {cita.hora}
          </p>
          <p>
            <strong className="text-gray-800">Veterinario:</strong>{" "}
            {cita.veterinario}
          </p>
          <p>
            <strong className="text-gray-800">Motivo:</strong> {cita.motivo}
          </p>
          <p>
            <strong className="text-gray-800">Estado:</strong> {cita.estado}
          </p>
        </div>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors w-full md:w-auto"
          onClick={onClose}
        >
          ❌ Cerrar
        </button>
      </div>
    </div>
  );
};

const HistorialCitasPage = () => {
  const [historial] = useState(citasMockData);
  const [filtro, setFiltro] = useState({
    paciente: "",
    veterinario: "",
    fecha: "",
  });
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const citasFiltradas = historial.filter((cita) => {
    return (
      (filtro.paciente === "" ||
        cita.paciente.toLowerCase().includes(filtro.paciente.toLowerCase())) &&
      (filtro.veterinario === "" ||
        cita.veterinario
          .toLowerCase()
          .includes(filtro.veterinario.toLowerCase())) &&
      (filtro.fecha === "" || cita.fecha === filtro.fecha)
    );
  });

  const exportarCSV = () => {
    const csv = Papa.unparse(citasFiltradas);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historial_citas.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("📜 Historial de Citas", 10, 10);
    doc.autoTable({
      head: [["Paciente", "Fecha", "Hora", "Veterinario", "Estado"]],
      body: citasFiltradas.map((cita) => [
        cita.paciente,
        cita.fecha,
        cita.hora,
        cita.veterinario,
        cita.estado,
      ]),
    });
    doc.save("historial_citas.pdf");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
        📜 Historial de Citas
      </h2>

      {/* Filtros */}
      <div className="bg-white p-4 md:p-6 mb-6 shadow rounded-lg">
        <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-700">
          🔍 Filtrar Historial
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="paciente"
            value={filtro.paciente}
            onChange={handleFiltroChange}
            placeholder="Filtrar por Paciente"
            className="border p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="veterinario"
            value={filtro.veterinario}
            onChange={handleFiltroChange}
            placeholder="Filtrar por Veterinario"
            className="border p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="fecha"
            value={filtro.fecha}
            onChange={handleFiltroChange}
            className="border p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabla de Historial */}
      <div className="bg-white p-4 md:p-6 shadow rounded-lg">
        {/* Versión móvil */}
        <div className="md:hidden">
          {citasFiltradas.length > 0 ? (
            citasFiltradas.map((cita) => (
              <div
                key={cita.id}
                className="border-b p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="space-y-2">
                  <p className="font-semibold">{cita.paciente}</p>
                  <p className="text-sm text-gray-600">
                    {cita.fecha} - {cita.hora}
                  </p>
                  <p className="text-sm text-gray-600">{cita.veterinario}</p>
                  <p className="text-sm">
                    Estado: <span className="font-medium">{cita.estado}</span>
                  </p>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors w-full"
                    onClick={() => setCitaSeleccionada(cita)}
                  >
                    📄 Ver Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-4">
              ❌ No hay citas con los filtros aplicados
            </p>
          )}
        </div>

        {/* Versión escritorio */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Paciente</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Hora</th>
                <th className="p-3">Veterinario</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((cita) => (
                <tr
                  key={cita.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-center">{cita.paciente}</td>
                  <td className="p-3 text-center">{cita.fecha}</td>
                  <td className="p-3 text-center">{cita.hora}</td>
                  <td className="p-3 text-center">{cita.veterinario}</td>
                  <td className="p-3 text-center">{cita.estado}</td>
                  <td className="p-3 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      onClick={() => setCitaSeleccionada(cita)}
                    >
                      📄 Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
              {citasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    ❌ No hay citas en el historial con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botones de Exportación */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <button
          onClick={exportarCSV}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors w-full md:w-auto"
        >
          📊 Exportar CSV
        </button>
        <button
          onClick={exportarPDF}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors w-full md:w-auto"
        >
          📄 Exportar PDF
        </button>
      </div>

      {/* Modal de Detalles */}
      {citaSeleccionada && (
        <ModalDetalles
          cita={citaSeleccionada}
          onClose={() => setCitaSeleccionada(null)}
        />
      )}
    </div>
  );
};

export default HistorialCitasPage;
