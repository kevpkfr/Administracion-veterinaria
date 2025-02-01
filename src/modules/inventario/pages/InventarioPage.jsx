import React, { useState, useEffect } from "react";
import inventarioData from "../../data/inventario";

const InventarioPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(inventarioData);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inventario</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Producto</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.nombre}</td>
              <td className="border p-2">{item.cantidad}</td>
              <td className="border p-2">${item.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventarioPage;
