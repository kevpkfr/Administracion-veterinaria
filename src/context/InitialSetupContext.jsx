// src/context/InitialSetupContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const InitialSetupContext = createContext();

export const InitialSetupProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1: Información del Negocio
    nombreNegocio: "",
    descripcionNegocio: "",
    rubro: "",
    logo: null,

    // Paso 2: Dirección y Contacto
    direccion: "",
    telefono: "",
    correoContacto: "",

    // Paso 3: Horarios de Atención
    horarioApertura: "",
    horarioCierre: "",
    diasSemana: [],

    // Paso 4: Métodos de Pago
    metodosPago: {
      tarjeta: false,
      efectivo: false,
      transferencia: false,
      otros: "",
    },

    // Paso 5: Redes Sociales y Contactos
    redesSociales: {
      facebook: "",
      instagram: "",
      twitter: "",
      sitioWeb: "",
      whatsapp: "",
      telegram: "",
    },

    // Paso 6: Personalización
    personalizacion: {
      temaColor: "#1E40AF",
      imagenFondo: null,
      plantillaCorreos: "",
    },
  });

  // Cargar datos guardados (opcional)
  useEffect(() => {
    const savedData = localStorage.getItem("initialSetupForm");
    const savedStep = localStorage.getItem("initialSetupStep");
    if (savedData) setFormData(JSON.parse(savedData));
    if (savedStep) setCurrentStep(Number(savedStep));
  }, []);

  // Guardar datos en localStorage (opcional)
  useEffect(() => {
    localStorage.setItem("initialSetupForm", JSON.stringify(formData));
    localStorage.setItem("initialSetupStep", String(currentStep));
  }, [formData, currentStep]);

  const value = {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
  };

  return (
    <InitialSetupContext.Provider value={value}>
      {children}
    </InitialSetupContext.Provider>
  );
};
