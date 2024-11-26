'use client'
import { FaShoppingCart, FaUsers, FaCalculator, FaShoppingBasket, FaCog, FaClipboardList } from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="bg-[#5F6F65] text-white h-screen w-20 flex flex-col justify-between items-center py-2">
      <div className='w-full h-full max-h-[400px] text-xl flex flex-col items-center justify-center'>
        <div className="w-full h-full flex items-center justify-center mb-4 hover:text-[#729762] cursor-pointer">
        </div>
        <div title='Ventas' className='w-full h-full'>
          <div onClick={() => setIsOpen(1)} className={`w-full h-full flex items-center justify-center mb-4 hover:bg-[#E7F0DC] cursor-pointer hover:text-[#729762] ${isOpen === 1 ? 'bg-[#E7F0DC] text-[#729762]' : ''}`}>
            <FaShoppingBasket />
          </div>
        </div>
        <div title='Inventario' className='w-full h-full' >
          <div onClick={() => setIsOpen(2)} className={`w-full h-full flex items-center justify-center mb-4 hover:bg-[#E7F0DC]  cursor-pointer hover:text-[#729762] ${isOpen === 2 ? 'bg-[#E7F0DC]  text-[#729762]' : ''}`}>
            <FaClipboardList />
          </div>
        </div>
        <div title='Productos' className='w-full h-full   ' >
          <div onClick={() => setIsOpen(3)} className={`w-full h-full flex items-center justify-center mb-4 hover:bg-[#E7F0DC]  cursor-pointer hover:text-[#729762] ${isOpen === 3 ? 'bg-[#E7F0DC]  text-[#729762]' : ''}`}>
            <FaCalculator />
          </div>
        </div>
        <div title='Clientes' className='w-full h-full'>
          <div onClick={() => setIsOpen(4)} className={`w-full h-full flex items-center justify-center mb-4 hover:bg-[#E7F0DC]  cursor-pointer hover:text-[#729762] ${isOpen === 4 ? 'bg-[#E7F0DC]  text-[#729762]' : ''}`}>
            <FaShoppingCart />
          </div>
        </div>

      </div>
      <div className='w-full'>
        <div onClick={() => setIsOpen(6)} className={`w-full h-full flex items-center justify-center mb-4 hover:bg-[#E7F0DC] cursor-pointer hover:text-[#729762] ${isOpen === 6 ? 'bg-[#E7F0DC] text-[#729762]' : ''}`}>
          <FaCog />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;