export const usuariosMockData = [
  { id: 1, nombre: "Carlos Pérez", rol: "Veterinario", activo: true },
  { id: 2, nombre: "Ana Gómez", rol: "Recepcionista", activo: true },
  { id: 3, nombre: "Luis Rodríguez", rol: "Administrador", activo: false },
];

export const logsMockData = [
  { id: 1, usuario: "Carlos Pérez", accion: "Agregó un paciente", fecha: "2024-01-20" },
  { id: 2, usuario: "Ana Gómez", accion: "Editó una cita", fecha: "2024-01-21" },
];

export const rolesMockData = [
  { id: 1, nombre: "Administrador", permisos: ["Usuarios", "Facturación", "Inventario"] },
  { id: 2, nombre: "Veterinario", permisos: ["Citas", "Pacientes"] },
];

export const horariosMockData = [
  { id: 1, usuario: "Carlos Pérez", horario: "08:00 - 17:00" },
  { id: 2, usuario: "Ana Gómez", horario: "09:00 - 18:00" },
  { id: 3, usuario: "Luis Rodríguez", horario: "10:00 - 19:00" },
];
