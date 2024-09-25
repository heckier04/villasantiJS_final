

const productosContainer = document.getElementById('productos-container');
const searchInput = document.getElementById('search-input');
const cartIcon = document.getElementById('cart-icon');

let productos = [];

//  cargar productos desde la API //
async function cargarProductos() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=componentes%20Gamer', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    productos = data.results;
    mostrarProductos(productos);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    mostrarMensaje('Error', 'No se pudo cargar los productos', 'error');
  }
}

//   productos de la tienda //
function mostrarProductos(productosParaMostrar) {
    productosContainer.innerHTML = '';
    if (productosParaMostrar.length === 0) {
      productosContainer.innerHTML = '<p>No se encontraron productos</p>'; 
      return;
    }
    productosParaMostrar.forEach((producto) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      const imagenProducto = producto.thumbnail ? producto.thumbnail : 'https://via.placeholder.com/250';
      const price = producto.price ? producto.price.toFixed(2) : 'N/A';
      productoDiv.innerHTML = `
        <img src="${imagenProducto}" alt="${producto.title}">
        <h2>${producto.title}</h2>
        <p>$${price}</p>
        <button class="add-to-cart" data-id="${producto.id}" data-name="${producto.title}" data-price="${producto.price}">
          Agregar al carrito
        </button>
      `;
      productosContainer.appendChild(productoDiv);
    });
    
    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', agregarAlCarrito);
    });
}

//  filtrar productos según la búsqueda //
function filtrarProductos() {
  const query = searchInput.value.toLowerCase().trim();
  if (query === '') {
    mostrarProductos(productos); 
    return;
  }
  const productosFiltrados = productos.filter((producto) => producto.title.toLowerCase().includes(query));
  mostrarProductos(productosFiltrados);
}

// agregar productos al carrito //
function agregarAlCarrito(event) {
  const button = event.target;
  const nombre = button.getAttribute('data-name');
  const precio = parseFloat(button.getAttribute('data-price'));
  if (!isNaN(precio)) {
    //  información del producto al carrito //
    if (typeof agregarProductoAlCarrito === 'function') {
      agregarProductoAlCarrito({ nombre, precio });
    }
  } else {
    console.error('Precio inválido');
    mostrarMensaje('Error', 'Precio inválido', 'error');
  }
}

//  mostrar mensajes //
function mostrarMensaje(titulo, texto, tipo) {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: tipo,
      confirmButtonText: 'Aceptar'
    });
  } else {
    console.error('Swal no está definido');
  }
}


searchInput.addEventListener('input', filtrarProductos);

// Cargar productos al cargar la página //
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
});
