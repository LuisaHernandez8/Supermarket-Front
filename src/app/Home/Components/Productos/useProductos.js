import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const useProductos = () => {
  const [producto, setProducto] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editProduct, setEditProduct] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: ''
  });

  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: ''
  });

  useEffect(() => {
    getDataInit();
  }, []);

  useEffect(() => {
    getDataInit();
  }, [refreshData]);

  useEffect(() => {
    const resultados = producto.filter(producto =>
      producto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultados);
  }, [busqueda, producto]);

  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');
      if (!response.ok) {
        throw new Error('Error al obtener productos: ' + response.statusText);
      }
      const result = await response.json();
      orderProductsById(result);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const orderProductsById = (products) => {
    const productsOrder = products.sort((a, b) => a.id - b.id);
    setProducto(productsOrder);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        alertError();
        throw new Error('Error al agregar producto: ' + response.statusText);
      }

      alertCreate();
      setRefreshData(!refreshData);
      setNewProduct({ nombre: '', descripcion: '', precio: '', cantidad: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: editProduct.id,
      nombre: editProduct.nombre,
      descripcion: editProduct.descripcion,
      precio: editProduct.precio,
      cantidad: editProduct.cantidad
    };
    try {
      const response = await fetch(`http://localhost:3001/productos/${editProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        setEditProduct({
          id: '',
          nombre: '',
          descripcion: '',
          precio: '',
          cantidad: ''
        });
        alertUpdate();
        setRefreshData(!refreshData);
      } else {
        alertError();
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setRefreshData(!refreshData);
        console.log('Producto eliminado correctamente');
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleEditProduct = (id) => {
    setIsEditModalOpen(true);
    const product = producto.find(producto => producto.id === id);
    setEditProduct(product);
  };

  const formatText = (text) => {
    if (text == null) {
      return text;
    }
    if (text.length > 30) {
      return text.slice(0, 30) + '...';
    }
    return text;
  };

  /* ---------- alertas----------- */

  const alertDelete = (id, nombre) => {
    Swal.fire({
      title: "¿Estás seguro? ",
      text: "Esta acción es irreversible. ¿Quieres continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(id);
        Swal.fire({
          title: "Eliminado!",
          text: `El producto (${nombre}) ha sido eliminado.`,
          icon: "success"
        });
      }
    });
  };

  const alertCreate = () => {
    Swal.fire({
      title: "Producto creado",
      text: "El producto ha sido creado correctamente",
      icon: "success"
    });
  };

  const alertUpdate = () => {
    Swal.fire({
      title: "Producto actualizado",
      text: "El producto ha sido actualizado correctamente",
      icon: "success"
    });
  };

  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error al actualizar el producto",
      icon: "warning"
    });
  };

  // Paginador
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return {
    producto,
    formatText,
    handleAddProduct,
    isModalOpen,
    setIsModalOpen,
    newProduct,
    setNewProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleEditProduct,
    isEditModalOpen,
    setIsEditModalOpen,
    editProduct,
    setEditProduct,
    busqueda,
    setBusqueda,
    productosFiltrados,
    alertDelete,
    productosActuales,
    paginaActual,
    cambiarPagina,
    totalPaginas
  };
};

export default useProductos;
