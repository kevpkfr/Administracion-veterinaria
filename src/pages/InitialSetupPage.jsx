/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockFormData } from "../data/mockData";

import Step1_InfoNegocio from "./initialSetup/Step1_InfoNegocio";
import Step2_UbicacionContacto from "./initialSetup/Step2_UbicacionContacto";
import Step3_Horarios from "./initialSetup/Step3_Horarios";
import Step4_MetodosPago from "./initialSetup/Step4_MetodosPago";
import Step5_RedesSociales from "./initialSetup/Step5_RedesSociales";
import Step6_Personalizacion from "./initialSetup/Step6_Personalizacion";
import Step7_Confirmacion from "./initialSetup/Step7_Confirmacion";

const InitialSetupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(mockFormData);

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.log("🚀 Datos finales:", formData);
      navigate("/dashboard");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_InfoNegocio nextStep={nextStep} updateFormData={updateFormData} formData={formData} />;
      case 2:
        return <Step2_UbicacionContacto nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 3:
        return <Step3_Horarios nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 4:
        return <Step4_MetodosPago nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 5:
        return <Step5_RedesSociales nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 6:
        return <Step6_Personalizacion nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 7:
        return <Step7_Confirmacion nextStep={nextStep} prevStep={prevStep} formData={formData} />;
      default:
        return <Step1_InfoNegocio nextStep={nextStep} updateFormData={updateFormData} formData={formData} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-[#E76F24] text-center mb-8">Configuración Inicial</h2>
        <div className="bg-[#fdf6ef] p-6 rounded-lg">{renderStep()}</div>
      </div>
    </div>
  );
};

export default InitialSetupPage;
