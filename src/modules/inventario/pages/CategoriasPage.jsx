import React, { useState } from "react";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Medicamentos", descripcion: "Productos farmacéuticos para mascotas" },
    { id: 2, nombre: "Alimentos", descripcion: "Comida para perros, gatos y otras mascotas" },
    { id: 3, nombre: "Accesorios", descripcion: "Collares, correas, juguetes y más" },
  ]);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: "", descripcion: "" });

  // Agregar una nueva categoría
  const agregarCategoria = (e) => {
    e.preventDefault();
    if (nuevaCategoria.nombre.trim() === "" || nuevaCategoria.descripcion.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const categoria = {
      id: categorias.length + 1,
      nombre: nuevaCategoria.nombre,
      descripcion: nuevaCategoria.descripcion,
    };
    setCategorias([...categorias, categoria]);
    setNuevaCategoria({ nombre: "", descripcion: "" });
  };

  // Eliminar una categoría
  const eliminarCategoria = (id) => {
    setCategorias(categorias.filter((categoria) => categoria.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">📂 Categorías de Productos</h2>
      <p className="text-gray-600 mb-8">
        Organiza los productos por categorías como Medicamentos, Alimentos, Accesorios, etc.
      </p>

      {/* Formulario para agregar nueva categoría */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">➕ Agregar Nueva Categoría</h3>
        <form onSubmit={agregarCategoria} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nuevaCategoria.nombre}
            onChange={(e) =>
              setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Descripción de la categoría"
            value={nuevaCategoria.descripcion}
            onChange={(e) =>
              setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Agregar Categoría
          </button>
        </form>
      </div>

      {/* Lista de categorías */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">📋 Lista de Categorías</h3>
        {categorias.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorias.map((categoria) => (
              <div
                key={categoria.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-2">{categoria.nombre}</h4>
                <p className="text-gray-600 mb-4">{categoria.descripcion}</p>
                <button
                  onClick={() => eliminarCategoria(categoria.id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No hay categorías registradas.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriasPage;