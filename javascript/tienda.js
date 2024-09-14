// tienda.js

// Selección de elementos del DOM
const productosContainer = document.getElementById('productos-container');
const searchInput = document.getElementById('search-input');
const cartIcon = document.getElementById('cart-icon');
let productos = [];

// Función para cargar productos desde la API de Mercado Libre
function cargarProductos() {
  fetch('https://api.mercadolibre.com/sites/MLA/search?q=componentes Gamer')
    .then(response => response.json())
    .then(data => {
      productos = data.results; // Guardamos los productos en una variable
      mostrarProductos(productos); // Utilizamos la propiedad 'results' de la respuesta
    })
    .catch(error => console.error('Error al cargar productos:', error));
}

// Función para mostrar los productos en la tienda
function mostrarProductos(productosParaMostrar) {
  productosContainer.innerHTML = ''; // Limpiamos el contenedor antes de mostrar los productos
  
  productosParaMostrar.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    // Algunos productos podrían no tener imagen, verificamos eso
    const imagenProducto = producto.thumbnail ? producto.thumbnail : 'https://via.placeholder.com/150';

    productoDiv.innerHTML = `
      <img src="${imagenProducto}" alt="${producto.title}">
      <h2>${producto.title}</h2>
      <p>$${producto.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${producto.id}" data-name="${producto.title}" data-price="${producto.price}">
        Agregar al carrito
      </button>
    `;

    productosContainer.appendChild(productoDiv);
  });

  // Agregar eventos a los botones
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
  });
}

// Función para filtrar productos según la búsqueda
function filtrarProductos() {
  const query = searchInput.value.toLowerCase();
  const productosFiltrados = productos.filter(producto => 
    producto.title.toLowerCase().includes(query)
  );
  mostrarProductos(productosFiltrados);
}

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
  const button = event.target;
  const nombre = button.getAttribute('data-name');
  const precio = parseFloat(button.getAttribute('data-price'));

  // Enviar la información del producto al carrito
  if (typeof agregarProductoAlCarrito === 'function') {
    agregarProductoAlCarrito({ nombre, precio });
  }
}

// Evento para manejar la búsqueda
searchInput.addEventListener('input', filtrarProductos);

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
});
