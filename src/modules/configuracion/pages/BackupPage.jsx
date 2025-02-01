import React, { useState } from "react";

const BackupPage = () => {
  const [historial, setHistorial] = useState([
    { id: 1, fecha: "2024-01-30", tamaño: "25MB", tipo: "Manual" },
    { id: 2, fecha: "2024-01-28", tamaño: "24MB", tipo: "Automático" },
  ]);

  const [programado, setProgramado] = useState(false);
  const [frecuencia, setFrecuencia] = useState("diario");

  // 📌 Simular la creación de un respaldo
  const handleRespaldo = () => {
    const nuevoRespaldo = {
      id: historial.length + 1,
      fecha: new Date().toISOString().split("T")[0],
      tamaño: "26MB",
      tipo: "Manual",
    };
    setHistorial([nuevoRespaldo, ...historial]);
    alert("✅ Respaldo realizado con éxito.");
  };

  // 📌 Simular la restauración de un respaldo
  const handleRestaurar = (id) => {
    alert(`🔄 Restaurando respaldo ID ${id}...`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">💾 Respaldo de Datos</h2>
      <p className="text-gray-600 mb-4">
        Mantén segura tu información realizando copias de seguridad periódicas.
      </p>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        {/* 📌 Botón para realizar respaldo manual */}
        <h3 className="text-lg font-bold mb-2">📁 Realizar Respaldo</h3>
        <button onClick={handleRespaldo} className="bg-blue-600 text-white p-3 rounded">
          💾 Realizar Respaldo Ahora
        </button>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        {/* 📌 Configuración de respaldos automáticos */}
        <h3 className="text-lg font-bold mb-2">⏳ Respaldo Automático</h3>
        <label className="block mb-2">
          <input type="checkbox" checked={programado} onChange={() => setProgramado(!programado)} />
          <span className="ml-2">Activar Respaldo Automático</span>
        </label>
        {programado && (
          <select
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          >
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
          </select>
        )}
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* 📌 Historial de respaldos */}
        <h3 className="text-lg font-bold mb-2">📜 Historial de Respaldos</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2">ID</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Tamaño</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((respaldo) => (
              <tr key={respaldo.id} className="border-b text-center">
                <td className="p-2">{respaldo.id}</td>
                <td className="p-2">{respaldo.fecha}</td>
                <td className="p-2">{respaldo.tamaño}</td>
                <td className="p-2">{respaldo.tipo}</td>
                <td className="p-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRestaurar(respaldo.id)}
                  >
                    🔄 Restaurar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BackupPage;
