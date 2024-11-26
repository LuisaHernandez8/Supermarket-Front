'use client'
import { useState } from 'react';
import Ventas from './Components/Ventas/page.js';
import Sidebar from './Components/Sidebar/sidebar.js';
import Inventario from './Components/Inventario/Inventario.js';

const Home = () => {
  const [isOpen, setIsOpen] = useState(1);

  return (
    <div className="w-full h-full flex flex-row">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-screen flex flex-col">
        <div className="w-full h-28 shadow-lg">
          <div className="w-full h-full flex items-center pl-6 text-4xl font-semibold text-white bg-gradient-to-r from-[#5F6F65] via-[#6d7b72] to-[#9eb0a4]">
            {
              isOpen === 1 ? 'Seccion de Ventas'
              : isOpen === 2 ? 'Seccion de Inventario'
              : isOpen === 3 ? 'Seccion de Productos'
              : isOpen === 4 ? 'Seccion de Clientes'
              : null
            }
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto">
          {
            isOpen === 1 ? <Ventas />
            : isOpen === 2 ? <Inventario/>
            : isOpen === 3 ? <Productos/>
            : isOpen === 4 ? <Clientes/>
            : null
          }
        </div>
      </div>
    </div>
  );
}

export default Home;