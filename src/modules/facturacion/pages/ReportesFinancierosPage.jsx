import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ReportesFinancierosPage = () => {
  // Datos de ejemplo para gráficos
  const [ingresosData] = useState([
    { mes: "Enero", ingresos: 12000, gastos: 8000 },
    { mes: "Febrero", ingresos: 15000, gastos: 9000 },
    { mes: "Marzo", ingresos: 18000, gastos: 10000 },
    { mes: "Abril", ingresos: 14000, gastos: 8500 },
    { mes: "Mayo", ingresos: 16000, gastos: 9500 },
    { mes: "Junio", ingresos: 17000, gastos: 11000 },
  ]);

  const [categoriasGastos] = useState([
    { name: "Medicamentos", value: 4000 },
    { name: "Alimentos", value: 3000 },
    { name: "Personal", value: 7000 },
    { name: "Mantenimiento", value: 2000 },
  ]);

  // Colores para el gráfico de pastel
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold mb-6">📊 Reportes Financieros</h2>
      <p className="text-gray-700 mb-8">
        Aquí puedes visualizar los ingresos y gastos de la veterinaria a través de gráficos y reportes.
      </p>

      {/* Gráfico de barras: Ingresos vs Gastos */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Ingresos vs Gastos Mensuales</h3>
        <div className="h-64 sm:h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ingresosData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="mes"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                }}
              />
              <Bar dataKey="ingresos" fill="#8884d8" name="Ingresos" />
              <Bar dataKey="gastos" fill="#82ca9d" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de pastel: Distribución de gastos */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Distribución de Gastos</h3>
        <div className="h-64 sm:h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoriasGastos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {categoriasGastos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                }}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Ingresos Totales</p>
          <p className="text-2xl font-bold">$84,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Gastos Totales</p>
          <p className="text-2xl font-bold">$54,500</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Utilidad Neta</p>
          <p className="text-2xl font-bold text-green-600">$29,500</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Margen de Utilidad</p>
          <p className="text-2xl font-bold">35.1%</p>
        </div>
      </div>

      {/* Tabla de resumen */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Resumen Financiero</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left text-sm font-medium text-gray-600">Mes</th>
                <th className="p-2 text-left text-sm font-medium text-gray-600">Ingresos</th>
                <th className="p-2 text-left text-sm font-medium text-gray-600">Gastos</th>
                <th className="p-2 text-left text-sm font-medium text-gray-600">Utilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ingresosData.map((item) => (
                <tr key={item.mes} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 text-sm text-gray-800">{item.mes}</td>
                  <td className="p-2 text-sm text-gray-800">${item.ingresos.toLocaleString()}</td>
                  <td className="p-2 text-sm text-gray-800">${item.gastos.toLocaleString()}</td>
                  <td className="p-2 text-sm text-gray-800">
                    ${(item.ingresos - item.gastos).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportesFinancierosPage;