/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterBusinessPage = () => {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const [errors, setErrors] = useState({});
  const [cargando, setCargando] = useState(false);

  // Validaciones
  const validarFormulario = () => {
    let newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "⚠️ El nombre del negocio es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "⚠️ El correo electrónico es obligatorio.";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "⚠️ Ingresa un correo válido.";
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = "⚠️ El teléfono es obligatorio.";
    } else if (!/^\+?\d{7,15}$/.test(formData.telefono)) {
      newErrors.telefono = "⚠️ Ingresa un teléfono válido.";
    }
    if (!formData.direccion.trim()) newErrors.direccion = "⚠️ La dirección es obligatoria.";
    return newErrors;
  };

  // Manejo del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const validationErrors = validarFormulario();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setCargando(true);

    // Simular proceso de registro
    setTimeout(() => {
      navigate("/initial-setup");
      setCargando(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Contenedor principal */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Título y descripción */}
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">Registro del Negocio</h2>
        <p className="text-center text-gray-600 mb-6">
          Completa este registro para comenzar a usar la aplicación.
        </p>

        {/* Formulario de registro */}
        <form className="space-y-5">
          {/* Nombre del Negocio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Negocio:</label>
            <input
              type="text"
              name="nombre"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Mi Veterinaria"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: contacto@vet.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: +52 123 456 7890"
              value={formData.telefono}
              onChange={handleChange}
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección:</label>
            <input
              type="text"
              name="direccion"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Calle 123, Ciudad"
              value={formData.direccion}
              onChange={handleChange}
            />
            {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
          </div>

          {/* Botón de registro */}
          <button
            type="button"
            onClick={handleRegister}
            disabled={cargando}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:bg-gray-400"
          >
            {cargando ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Registrando...
              </span>
            ) : (
              "Registrar Negocio"
            )}
          </button>
        </form>
      </div>

      {/* Enlace de ayuda o soporte */}
      <p className="mt-6 text-sm text-gray-600">
        ¿Necesitas ayuda?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Contáctanos
        </a>
      </p>
    </div>
  );
};

export default RegisterBusinessPage;
