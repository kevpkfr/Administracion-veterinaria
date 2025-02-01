import React, { useState } from "react";

const NotificacionesPage = () => {
  const [emailNotificaciones, setEmailNotificaciones] = useState(true);
  const [smsNotificaciones, setSmsNotificaciones] = useState(false);
  const [appNotificaciones, setAppNotificaciones] = useState(true);
  const [frecuencia, setFrecuencia] = useState("inmediato");

  const [eventosNotificaciones, setEventosNotificaciones] = useState({
    citas: true,
    recordatorios: true,
    facturas: false,
    promociones: false,
    seguridad: true,
  });

  // 📌 Manejar cambios en eventos de notificación
  const handleEventoChange = (evento) => {
    setEventosNotificaciones((prev) => ({
      ...prev,
      [evento]: !prev[evento],
    }));
  };

  // 📌 Guardar Configuración
  const handleGuardarConfiguracion = () => {
    alert("✅ Configuración de notificaciones guardada con éxito.");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📩 Notificaciones</h2>
      <p className="text-gray-600 mb-4">Configura las notificaciones que deseas recibir y su frecuencia.</p>

      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* 📌 Tipos de Notificaciones */}
        <h3 className="text-lg font-bold mb-2">📢 Tipos de Notificaciones</h3>
        <div className="mb-4">
          <label className="block mb-2">
            <input type="checkbox" checked={emailNotificaciones} onChange={() => setEmailNotificaciones(!emailNotificaciones)} />
            <span className="ml-2">Activar Notificaciones por Email</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" checked={smsNotificaciones} onChange={() => setSmsNotificaciones(!smsNotificaciones)} />
            <span className="ml-2">Activar Notificaciones por SMS</span>
          </label>
          <label className="block">
            <input type="checkbox" checked={appNotificaciones} onChange={() => setAppNotificaciones(!appNotificaciones)} />
            <span className="ml-2">Activar Notificaciones en la Aplicación</span>
          </label>
        </div>

        {/* 📌 Seleccionar Eventos de Notificación */}
        <h3 className="text-lg font-bold mb-2">🔔 Eventos que Generan Notificación</h3>
        <div className="mb-4">
          {Object.keys(eventosNotificaciones).map((evento) => (
            <label key={evento} className="block mb-2">
              <input
                type="checkbox"
                checked={eventosNotificaciones[evento]}
                onChange={() => handleEventoChange(evento)}
              />
              <span className="ml-2 capitalize">{evento.replace("_", " ")}</span>
            </label>
          ))}
        </div>

        {/* 📌 Frecuencia de Envío */}
        <h3 className="text-lg font-bold mb-2">⏳ Frecuencia de Envío</h3>
        <select
          value={frecuencia}
          onChange={(e) => setFrecuencia(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="inmediato">Inmediato</option>
          <option value="cada_hora">Cada Hora</option>
          <option value="diario">Diario</option>
          <option value="semanal">Semanal</option>
        </select>

        {/* 📌 Guardar Configuración */}
        <button
          onClick={handleGuardarConfiguracion}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          💾 Guardar Configuración de Notificaciones
        </button>
      </div>
    </div>
  );
};

export default NotificacionesPage;
