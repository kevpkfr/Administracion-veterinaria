import React, { useState } from "react";

const SeguridadPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [bloqueoIntentos, setBloqueoIntentos] = useState(3);
  const [sesiones, setSesiones] = useState([
    { id: 1, dispositivo: "PC - Chrome", ubicacion: "Quito, Ecuador", activo: true },
    { id: 2, dispositivo: "Móvil - Android", ubicacion: "Guayaquil, Ecuador", activo: false },
  ]);

  // 📌 Cambiar contraseña
  const handleChangePassword = () => {
    if (password.length < 6) {
      alert("⚠️ La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      alert("⚠️ Las contraseñas no coinciden.");
      return;
    }
    alert("✅ Contraseña actualizada con éxito.");
    setPassword("");
    setConfirmPassword("");
  };

  // 📌 Cerrar sesión en otro dispositivo
  const handleCerrarSesion = (id) => {
    setSesiones(sesiones.map(s => (s.id === id ? { ...s, activo: false } : s)));
    alert("✅ Sesión cerrada en el dispositivo seleccionado.");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">🔒 Seguridad</h2>
      <p className="text-gray-600 mb-4">Administra contraseñas, accesos y medidas de seguridad del sistema.</p>

      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* 📌 Cambiar Contraseña */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">🔑 Cambiar Contraseña</h3>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={handleChangePassword} className="bg-blue-500 text-white px-4 py-2 rounded">
            💾 Guardar Contraseña
          </button>
        </div>

        {/* 📌 Autenticación en Dos Pasos */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">🔐 Autenticación en Dos Pasos (2FA)</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              className="mr-2"
            />
            <span>{twoFactorAuth ? "Activada" : "Desactivada"}</span>
          </div>
        </div>

        {/* 📌 Configuración de Bloqueo por Intentos Fallidos */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">🚫 Bloqueo de Cuenta</h3>
          <label className="block mb-2">Número de intentos fallidos antes de bloquear la cuenta:</label>
          <input
            type="number"
            value={bloqueoIntentos}
            onChange={(e) => setBloqueoIntentos(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* 📌 Sesiones Activas */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">🖥️ Sesiones Activas</h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Dispositivo</th>
                <th className="p-2 border">Ubicación</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sesiones.map((sesion) => (
                <tr key={sesion.id} className="border">
                  <td className="p-2 border">{sesion.dispositivo}</td>
                  <td className="p-2 border">{sesion.ubicacion}</td>
                  <td className="p-2 border">{sesion.activo ? "✅ Activo" : "❌ Cerrado"}</td>
                  <td className="p-2 border">
                    {sesion.activo && (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleCerrarSesion(sesion.id)}
                      >
                        🔴 Cerrar Sesión
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📌 Botón Guardar Configuración */}
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          💾 Guardar Configuración de Seguridad
        </button>
      </div>
    </div>
  );
};

export default SeguridadPage;
