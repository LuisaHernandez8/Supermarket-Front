'use client';

import useProductos from "../Productos/useProductos";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Inventario = () => {
  const {
    formatText,
    busqueda,
    setBusqueda,
    productosFiltrados,
    productosActuales,
    paginaActual,
    cambiarPagina,
    totalPaginas
  } = useProductos();

  return (
    <div className="container mx-auto pt-6 flex flex-col gap-4">
      <div className="w-full flex flex-row gap-2 items-center">
        <div className="relative flex flex-row gap-2 items-center">
          <FiSearch className="absolute left-2 text-2xl text-[#808D7C]" />
          <input
            className="p-2 pl-10 pr-4 border-[1.5px] border-[#9CA986] rounded-2xl outline-none"
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      <div className="min-w-full overflow-y-auto h-[60vh] shadow-lg mt-2 shadow-[#b8d9c4] rounded-lg">
        <table className="min-w-full table-auto bg-white rounded-lg">
          <thead>
            <tr className="bg-[#c2dbcb] text-left text-[#5F6F65] uppercase text-sm leading-normal">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Descripción</th>
              <th className="py-3 px-6">Precio</th>
              <th className="py-3 px-6 text-center">Cantidad</th>
              <th className="py-3 px-6 text-center">Activo</th>
              <th className="py-3 px-6 text-center">Fecha de Creación</th>
            </tr>
          </thead>
          <tbody className="text-[#5F6F65] text-md font-normal">
            {productosActuales.map((producto) => (
              <tr
                key={producto.id}
                className="border-b border-[#b8d9c4] hover:bg-[#e7f0dc]"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {producto.id}
                </td>
                <td className="py-3 px-6 text-left">{producto.nombre}</td>
                <td className="py-3 px-6 text-left">{formatText(producto.descripcion)}</td>
                <td className="py-3 px-6 text-left">{producto.precio}</td>
                <td className="py-3 px-6 text-center">{producto.cantidad}</td>
                <td className="py-3 px-6 text-center">
                  {producto.activo ? (
                    <span className="bg-[#99A5E0] text-white py-2 px-4 rounded-full text-md">
                      Sí
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs">
                      No
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {new Date(producto.fecha_creacion).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end">
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg text-lg shadow">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className={`p-2 rounded-full ${paginaActual === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#597445] hover:bg-[#729762] hover:text-white'
              }`}
          >
            <IoIosArrowBack />
          </button>

          {(() => {
            let paginas = [];
            if (totalPaginas <= 5) {
              paginas = [...Array(totalPaginas)].map((_, i) => i + 1);
            } else {
              if (paginaActual <= 3) {
                paginas = [1, 2, 3, '...', totalPaginas];
              } else if (paginaActual >= totalPaginas - 2) {
                paginas = [1, '...', totalPaginas - 2, totalPaginas - 1, totalPaginas];
              } else {
                paginas = [1, '...', paginaActual, '...', totalPaginas];
              }
            }

            return paginas.map((pagina, index) => (
              pagina === '...' ? (
                <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
              ) : (
                <button
                  key={index}
                  onClick={() => cambiarPagina(pagina)}
                  className={`w-8 h-8 rounded-full ${paginaActual === pagina
                      ? 'bg-[#597445] text-white'
                      : 'text-[#597445] hover:bg-[#729762] hover:text-white'
                    }`}
                >
                  {pagina}
                </button>
              )
            ));
          })()}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className={`p-2 rounded-full ${paginaActual === totalPaginas
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#597445] hover:bg-[#729762] hover:text-white'
              }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
