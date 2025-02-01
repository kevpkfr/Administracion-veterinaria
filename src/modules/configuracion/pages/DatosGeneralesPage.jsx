import React, { useState } from "react";

const DatosGeneralesPage = () => {
  const [formData, setFormData] = useState({
    nombreOrganizacion: "Kevin (Demo)",
    cif: "BXX123456",
    direccion: "Calle Demostración, 3",
    codigoPostal: "01234",
    poblacion: "Población Demo",
    provincia: "",
    telefono: "",
    fax: "",
    email: "kpinsag.ok@gmail.com",
    web: "",
  });

  // 📌 Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Simular guardado de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Datos guardados correctamente");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Datos Generales</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        {/* 📌 Nombre de la organización */}
        <label className="block font-semibold mb-1">Nombre de la organización</label>
        <input
          type="text"
          name="nombreOrganizacion"
          value={formData.nombreOrganizacion}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        {/* 📌 CIF */}
        <label className="block font-semibold mb-1">CIF</label>
        <input
          type="text"
          name="cif"
          value={formData.cif}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        {/* 📌 Dirección */}
        <label className="block font-semibold mb-1">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        {/* 📌 Código Postal y Población */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Código Postal</label>
            <input
              type="text"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Población</label>
            <input
              type="text"
              name="poblacion"
              value={formData.poblacion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* 📌 Provincia */}
        <label className="block font-semibold mb-1 mt-3">Provincia código INE (PresVet)</label>
        <select
          name="provincia"
          value={formData.provincia}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Seleccione una provincia</option>
          <option value="Provincia 1">Provincia 1</option>
          <option value="Provincia 2">Provincia 2</option>
          <option value="Provincia 3">Provincia 3</option>
        </select>

        {/* 📌 Teléfono y Fax */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Fax</label>
            <input
              type="text"
              name="fax"
              value={formData.fax}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* 📌 Email y Web */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Web</label>
            <input
              type="text"
              name="web"
              value={formData.web}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* 📌 Botón de Guardar */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          💾 Guardar
        </button>
      </form>
    </div>
  );
};

export default DatosGeneralesPage;
