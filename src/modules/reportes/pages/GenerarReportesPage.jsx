import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; 

const GenerarReportesPage = () => {
  const [tipoReporte, setTipoReporte] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const generarPDF = () => {
    const doc = new jsPDF();

    // Configuración del encabezado
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Reporte de ${tipoReporte.toUpperCase()}`, 105, 25, { align: "center" });

    // Fechas
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Desde: ${fechaInicio} - Hasta: ${fechaFin}`, 105, 35, { align: "center" });

    // Línea divisoria
    doc.setDrawColor(200);
    doc.line(10, 40, 200, 40);

    // Contenido del reporte
    let data = [];
    const headers = [];

    switch (tipoReporte) {
      case "ventas":
        headers.push(["Fecha", "Servicio", "Monto", "Veterinario"]);
        data = [
          ["2024-02-01", "Consulta", "$120", "Dr. Juan Pérez"],
          ["2024-02-02", "Vacunación", "$80", "Dra. Ana López"],
        ];
        break;

      case "pacientes":
        headers.push(["Nombre", "Especie", "Edad", "Dueño"]);
        data = [
          ["Max", "Perro", "3 años", "Carlos Gómez"],
          ["Luna", "Gato", "2 años", "María Rodríguez"],
        ];
        break;

      case "financiero":
        headers.push(["Concepto", "Ingresos", "Egresos", "Balance"]);
        data = [
          ["Febrero 2024", "$15,000", "$8,200", "$6,800"],
          ["Enero 2024", "$14,500", "$7,900", "$6,600"],
        ];
        break;

      default:
        headers.push(["Datos", "Ejemplo"]);
        data = [["No hay datos disponibles", ""]];
    }

    // Tabla con datos
    doc.autoTable({
      startY: 50,
      head: headers,
      body: data,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    // Pie de página con paginación
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${pageCount}`, 200 - 20, 290, { align: "right" });
    }

    // Guardar PDF con nombre personalizado
    doc.save(`reporte_${tipoReporte}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const generarReporte = () => {
    if (!tipoReporte || !fechaInicio || !fechaFin) {
      setError("⚠️ Todos los campos son obligatorios.");
      return;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      setError("⚠️ La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }

    setError("");
    setCargando(true);

    // Simular carga de generación de PDF
    setTimeout(() => {
      generarPDF();
      setCargando(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Generar Reportes</h2>
      <p className="text-gray-600 mb-6">Seleccione los criterios para generar un reporte detallado.</p>

      {/* 🔎 Filtros de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tipo de Reporte */}
        <div>
          <label className="block font-semibold mb-2">📄 Tipo de Reporte</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={tipoReporte}
            onChange={(e) => setTipoReporte(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="ventas">Reporte de Ventas</option>
            <option value="pacientes">Reporte de Pacientes</option>
            <option value="financiero">Reporte Financiero</option>
          </select>
        </div>

        {/* Fecha de Inicio */}
        <div>
          <label className="block font-semibold mb-2">📅 Fecha de Inicio</label>
          <input
            type="date"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        {/* Fecha de Fin */}
        <div>
          <label className="block font-semibold mb-2">📅 Fecha de Fin</label>
          <input
            type="date"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}

      {/* Botón Generar Reporte */}
      <button
        onClick={generarReporte}
        disabled={cargando}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors w-full md:w-auto"
      >
        {cargando ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Generando PDF...
          </span>
        ) : (
          "📥 Generar Reporte PDF"
        )}
      </button>
    </div>
  );
};

export default GenerarReportesPage;
