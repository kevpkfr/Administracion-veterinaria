import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pacientesMockData from "../../../data/pacientesData"; // 📌 Importa el mock de pacientes

const DetallePacientePage = () => {
  const { id } = useParams(); // 📌 Obtener el ID desde la URL
  const navigate = useNavigate(); // 📌 Para redireccionar
  const [paciente, setPaciente] = useState(null); // 📌 Estado para almacenar los datos del paciente
  const [cargando, setCargando] = useState(true); // 📌 Estado para manejar la carga
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false); // 📌 Estado para el modal de confirmación
  const [editando, setEditando] = useState(false); // 📌 Estado para habilitar la edición
  const [formData, setFormData] = useState({}); // 📌 Estado para el formulario de edición

  // Simular la carga de datos del paciente
  useEffect(() => {
    const cargarPaciente = () => {
      setTimeout(() => {
        const pacienteEncontrado = pacientesMockData.find(
          (p) => p.id === parseInt(id)
        );
        if (pacienteEncontrado) {
          setPaciente(pacienteEncontrado);
          setFormData(pacienteEncontrado); // Inicializar el formulario con los datos del paciente
        }
        setCargando(false);
      }, 1000); // Simular un retraso de 1 segundo
    };

    cargarPaciente();
  }, [id]);

  // Función para eliminar un paciente
  const eliminarPaciente = () => {
    // Simular la eliminación del paciente
    console.log(`Paciente ${paciente.nombre} eliminado`);
    setMostrarConfirmacion(false); // Cerrar el modal
    navigate("/pacientes"); // Redireccionar a la lista de pacientes
  };

  // Función para habilitar la edición
  const habilitarEdicion = () => {
    setEditando(true);
  };

  // Función para guardar los cambios
  const guardarCambios = () => {
    // Simular la actualización del paciente
    console.log("Datos actualizados:", formData);
    setPaciente(formData); // Actualizar el estado local del paciente
    setEditando(false); // Deshabilitar la edición
  };

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Si está cargando, mostrar un mensaje
  if (cargando) {
    return (
      <div className="p-6 text-center text-gray-600">Cargando paciente...</div>
    );
  }

  // Si no se encuentra el paciente, mostrar un mensaje de error
  if (!paciente) {
    return (
      <div className="p-6 text-red-500 font-bold text-center">
        ⚠️ Paciente no encontrado
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">🐾 Detalle del Paciente</h2>

      {/* Información básica del paciente */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Información General</h3>
        {editando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Edad</p>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Especie</p>
              <input
                type="text"
                name="especie"
                value={formData.especie}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Raza</p>
              <input
                type="text"
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Propietario</p>
              <input
                type="text"
                name="propietario"
                value={formData.propietario}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Última Visita</p>
              <input
                type="text"
                name="ultimaVisita"
                value={formData.ultimaVisita}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <p className="text-lg font-medium">{paciente.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Edad</p>
              <p className="text-lg font-medium">{paciente.edad} años</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Especie</p>
              <p className="text-lg font-medium">{paciente.especie}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Raza</p>
              <p className="text-lg font-medium">{paciente.raza}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Propietario</p>
              <p className="text-lg font-medium">{paciente.propietario}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Última Visita</p>
              <p className="text-lg font-medium">{paciente.ultimaVisita}</p>
            </div>
          </div>
        )}
      </div>

      {/* Historial médico */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Historial Médico</h3>
        {paciente.historialMedico && paciente.historialMedico.length > 0 ? (
          <div className="space-y-4">
            {paciente.historialMedico.map((registro, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-600">
                  Fecha: {registro.fecha}
                </p>
                <p className="text-lg font-medium">{registro.diagnostico}</p>
                <p className="text-sm text-gray-600">
                  Tratamiento: {registro.tratamiento}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No hay registros médicos.</p>
        )}
      </div>

      {/* Vacunas */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Vacunas</h3>
        {paciente.vacunas && paciente.vacunas.length > 0 ? (
          <div className="space-y-4">
            {paciente.vacunas.map((vacuna, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-600">Fecha: {vacuna.fecha}</p>
                <p className="text-lg font-medium">{vacuna.nombre}</p>
                <p className="text-sm text-gray-600">
                  Próxima dosis: {vacuna.proximaDosis}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No hay registros de vacunas.</p>
        )}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {editando ? (
            <button
              onClick={guardarCambios}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Guardar Cambios
            </button>
          ) : (
            <button
              onClick={habilitarEdicion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Editar Paciente
            </button>
          )}
          <button
            onClick={() => setMostrarConfirmacion(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Eliminar Paciente
          </button>
        </div>
      </div>

      {/* Modal de confirmación para eliminar paciente */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">¿Eliminar Paciente?</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar a {paciente.nombre}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarPaciente}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallePacientePage;