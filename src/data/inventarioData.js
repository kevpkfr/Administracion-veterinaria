export const inventarioMockData = [
 { id: 1, codigo: "MED-001", nombre: "Antibiótico Canino", stock: 15, categoria: "Medicamentos" },
 { id: 2, codigo: "ALI-002", nombre: "Comida para Gatos", stock: 8, categoria: "Alimentos" },
 { id: 3, codigo: "ACC-003", nombre: "Collar para Perros", stock: 20, categoria: "Accesorios" },
];

export const movimientosMockData = [
 { id: 1, fecha: "2024-02-01", producto: "Antibiótico Canino", cantidad: 5, tipo: "Entrada" },
 { id: 2, fecha: "2024-02-02", producto: "Comida para Gatos", cantidad: 3, tipo: "Salida" },
];
export const productosAgotadosMockData = [
 { id: 1, nombre: "Medicamento A", categoria: "Medicamentos", stock: 0 },
 { id: 2, nombre: "Alimento B", categoria: "Alimentos", stock: 0 },
 { id: 3, nombre: "Juguete C", categoria: "Accesorios", stock: 0 },
];