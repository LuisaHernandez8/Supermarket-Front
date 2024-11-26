'use client'
import { FiSearch } from "react-icons/fi";
import { useVentas } from "./useVentas";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Ventas = () => {
  const {
    count,
    handleAddProduct,
    handleRemoveProduct,
    formatText,
    productosFiltrados,
    setBusqueda,
    busqueda,
    addProduct,
    productosCarrito,
    productosActuales,
    paginaActual,
    cambiarPagina,
    totalPaginas,
    total
  } = useVentas();

  return (
    <div className="container mx-auto pt-6 flex">
      <div className="w-full flex flex-row gap-5">
        <div className="w-[70%] flex flex-col gap-4">
          <div className="w-full flex flex-row gap-2 items-center">
            <div className="w-full flex flex-row justify-between gap-2 items-center">
              <div className="text-2xl font-bold flex flex-row gap-2 items-center mb-2 text-[#597445]">
                <div>Realizar una venta</div>
              </div>
            </div>
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
          <div className="max-w-full overflow-y-auto h-[60vh] shadow-lg mt-2 shadow-[#C9DABF] rounded-lg">
            <table className="min-w-full table-auto bg-white rounded-lg">
              <thead>
                <tr className="bg-[#b8d9c4] text-left text-[#5F6F65] uppercase text-sm leading-normal">
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Nombre</th>
                  <th className="py-3 px-6">Descripción</th>
                  <th className="py-3 px-6">Precio</th>
                  <th className="py-3 px-6">Cantidad</th>
                  <th className="py-3 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-[#5F6F65] text-md font-normal">
                {productosActuales.map((producto) => (
                  <tr
                    key={producto.id}
                    className="border-b border-[#C9DABF] hover:bg-[#E7F0DC]"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {producto.id}
                    </td>
                    <td className="py-3 px-6 text-left">{producto.nombre}</td>
                    <td className="py-3 px-6 text-left">{formatText(producto.descripcion)}</td>
                    <td className="py-3 px-6 text-left">{producto.precio}</td>
                    <td className="py-3 px-6 text-center">{producto.cantidad}</td>
                    <td className="py-3 px-6 text-center flex justify-center gap-2">
                      <button
                        onClick={() => addProduct(producto.id)}
                        className="bg-[#597445] text-lg hover:bg-[#729762] text-white font-bold py-2 px-4 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                      </button>
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
        <div className="w-[30%] flex flex-col items-center bg-[#f3f4f7] rounded-lg shadow-lg">
          <div className="text-3xl font-semibold pt-4 text-[#597445]">Carrito de compras</div>
          <div className="w-full flex flex-col gap-5 pt-10 px-4 overflow-y-auto h-[55vh] pb-10">
            {/* Aquí puedes mapear los productos del carrito */}
          </div>
          <div className="w-full flex justify-center flex-col gap-5 px-4">
            <div className="w-full text-2xl flex justify-center font-semibold text-[#5F6F65]">Total: ${total.toFixed(2)}</div>
            <button className="w-full bg-[#597445] hover:bg-[#729762] text-white p-2 rounded-lg">Realizar venta</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ventas;