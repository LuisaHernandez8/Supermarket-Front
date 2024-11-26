import { useEffect, useState } from "react";

export const useVentas = () => {
    const [count, setCount] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [producto, setProducto] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState(producto);
    const [refreshData, setRefreshData] = useState(false);
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [detallesCarrito, setDetallesCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    //Paginacion de la pagina
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 8; 

    //Cantidad de productos por pagina
    const indiceUltimo = paginaActual * productosPorPagina;
    const indicePrimero = indiceUltimo - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    useEffect(() => {
        getDataInit();
    }, []);
  
    useEffect(() => {
        getDataInit();
    }, [refreshData]);

    useEffect(() => {
        console.log('productosCarrito: ', productosCarrito);
    }, [productosCarrito]);

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
            console.log('Datos obtenidos:', result);
            return result;
        } catch (error) {
            console.error('Error:', error.message);
            throw new Error('Error en la solicitud: ' + error.message);
        }
    };

    const orderProductsById = (products) => {
        const productsOrder = products.sort((a, b) => a.id - b.id);
        setProducto(productsOrder);
    }

    const addProduct = (idProducto) => {
        const productoExistente = productosCarrito.find(item => item.id === idProducto);
        if (productoExistente) {
            alert('Este producto ya está en el carrito');
            return;
        }
        
        const productoNuevo = producto.find(producto => producto.id === idProducto);
        if (!productoNuevo) {
            alert('Producto no encontrado');
            return;
        }

        if (productoNuevo.cantidad <= 0) {
            alert('Este producto no tiene unidades disponibles');
            return;
        }

        setCount(prevCount => ({
            ...prevCount,
            [idProducto]: 1
        }));
        
        setProductosCarrito([...productosCarrito, { ...productoNuevo, cantidadCarrito: 1 }]);
        
        // Añadir detalles del producto al estado de detallesCarrito
        setDetallesCarrito([...detallesCarrito, {
            id: idProducto,
            cantidad: 1,
            stock: productoNuevo.cantidad,
            valor: productoNuevo.precio
        }]);

        // Calcular el nuevo total
        setTotal(prevTotal => prevTotal + parseFloat(productoNuevo.precio));

        console.log('total: ', total);
    }

    const handleAddProduct = (idProducto) => {
        const productoActual = producto.find(p => p.id === idProducto);
        const cantidadActualCarrito = count[idProducto] || 0;
    
        if (cantidadActualCarrito >= productoActual.cantidad) {
            alert('No hay más unidades disponibles de este producto');
            return;
        }
    
        setCount(prevCount => ({
            ...prevCount,
            [idProducto]: (prevCount[idProducto] || 0) + 1
        }));
    
        setProductosCarrito(prevProductos => 
            prevProductos.map(producto => 
                producto.id === idProducto 
                    ? { ...producto, cantidadCarrito: cantidadActualCarrito + 1 }
                    : producto
            )
        );

        // Actualizar detalles del producto en el estado de detallesCarrito
        setDetallesCarrito(prevDetalles => 
            prevDetalles.map(detalle => 
                detalle.id === idProducto 
                    ? { ...detalle, cantidad: cantidadActualCarrito + 1 }
                    : detalle
            )
        );

        // Calcular el nuevo total
        setTotal(prevTotal => prevTotal + parseFloat(productoActual.precio));
    }
    
    const handleRemoveProduct = (idProducto) => {
        const cantidadActualCarrito = count[idProducto];
        const productoActual = producto.find(p => p.id === idProducto);
    
        if (cantidadActualCarrito === 1) {
            setProductosCarrito(prevProductos => 
                prevProductos.filter(p => p.id !== idProducto)
            );
            setCount(prevCount => {
                const newCount = { ...prevCount };
                delete newCount[idProducto];
                return newCount;
            });

            // Remover el producto de detallesCarrito
            setDetallesCarrito(prevDetalles => 
                prevDetalles.filter(detalle => detalle.id !== idProducto)
            );

            // Calcular el nuevo total
            setTotal(prevTotal => prevTotal - parseFloat(productoActual.precio));
        } else {
            setCount(prevCount => ({
                ...prevCount,
                [idProducto]: prevCount[idProducto] - 1
            }));
    
            setProductosCarrito(prevProductos => 
                prevProductos.map(producto => 
                    producto.id === idProducto 
                        ? { ...producto, cantidadCarrito: cantidadActualCarrito - 1 }
                        : producto
                )
            );

            // Actualizar la cantidad en detallesCarrito
            setDetallesCarrito(prevDetalles => 
                prevDetalles.map(detalle => 
                    detalle.id === idProducto 
                        ? { ...detalle, cantidad: cantidadActualCarrito - 1 }
                        : detalle
                )
            );

            // Calcular el nuevo total
            setTotal(prevTotal => prevTotal - parseFloat(productoActual.precio));
        }
    }

    const formatText = (text) => {
        if (text == null) {
            return text;
        }
        if (text.length > 30) {
            return text.slice(0, 30) + '...';
        }
        return text;
    };

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };
    
    return {
        count,
        handleAddProduct,
        handleRemoveProduct,
        formatText,
        busqueda,
        setBusqueda,
        productosFiltrados,
        addProduct,
        productosCarrito,
        productosActuales,
        paginaActual,
        cambiarPagina,
        totalPaginas,
        total
    }
}