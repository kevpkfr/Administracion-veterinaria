import React, { useState } from "react";

const LogsUsuariosPage = () => {
  const logs = [
    { id: 1, usuario: "Juan Pérez", accion: "Editó una cita", fecha: "2024-02-01 14:30" },
    { id: 2, usuario: "Ana López", accion: "Generó una factura", fecha: "2024-02-02 10:15" },
    { id: 3, usuario: "Carlos Gómez", accion: "Eliminó un registro", fecha: "2024-02-03 09:45" },
    { id: 4, usuario: "María Rodríguez", accion: "Agregó un nuevo cliente", fecha: "2024-02-04 16:20" },
  ];

  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const logsPorPagina = 5;

  // Filtrar logs
  const logsFiltrados = logs.filter((log) => {
    return (
      log.usuario.toLowerCase().includes(filtroUsuario.toLowerCase()) &&
      log.fecha.includes(filtroFecha)
    );
  });

  // Paginación
  const indiceUltimoLog = paginaActual * logsPorPagina;
  const indicePrimerLog = indiceUltimoLog - logsPorPagina;
  const logsActuales = logsFiltrados.slice(indicePrimerLog, indiceUltimoLog);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">📜 Logs de Usuarios</h2>

      {/* Filtros */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Filtrar por usuario"
          value={filtroUsuario}
          onChange={(e) => setFiltroUsuario(e.target.value)}
          className="p-2 border rounded-lg flex-1"
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="p-2 border rounded-lg flex-1"
        />
      </div>

      {/* Versión para pantallas grandes */}
      <div className="hidden sm:block">
        <table className="w-full bg-white border shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Usuario</th>
              <th className="p-2 text-left">Acción</th>
              <th className="p-2 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {logsActuales.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-2">{log.usuario}</td>
                <td className="p-2">{log.accion}</td>
                <td className="p-2">{log.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versión para móviles */}
      <div className="block sm:hidden">
        {logsActuales.map((log) => (
          <div key={log.id} className="bg-white border shadow-md rounded-lg p-4 mb-4">
            <div className="mb-2">
              <span className="font-semibold">Usuario:</span> {log.usuario}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Acción:</span> {log.accion}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Fecha:</span> {log.fecha}
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 sm:mt-6">
        {Array.from({ length: Math.ceil(logsFiltrados.length / logsPorPagina) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => cambiarPagina(i + 1)}
            className={`mx-1 px-3 py-1 rounded-lg ${
              paginaActual === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LogsUsuariosPage;