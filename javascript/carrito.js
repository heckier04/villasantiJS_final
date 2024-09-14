// carrito.js

// Selección de elementos del DOM
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const cartContainer = document.getElementById('cart-container');
const clearCartButton = document.getElementById('clear-cart');
const buyNowButton = document.getElementById('buy-now');
let total = 0;
let items = [];

// Función para agregar productos al carrito
function agregarProductoAlCarrito(producto) {
  items.push(producto);
  actualizarCarritoVisual();
  guardarCarritoLocalStorage();

  // Mostrar el contenedor del carrito con animación
  cartContainer.classList.add('show');

  // Aplicar la animación al icono del carrito
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.classList.add('cart-icon-animate');
    setTimeout(() => {
      cartIcon.classList.remove('cart-icon-animate');
    }, 400);
  }
}

// Función para actualizar la lista visual del carrito
function actualizarCarritoVisual() {
  cartItems.innerHTML = ''; // Limpiar la lista para evitar duplicados
  total = 0;

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toFixed(2)}
      <button class="remove-item" data-index="${index}">Eliminar</button>
    `;
    cartItems.appendChild(li);

    total += item.precio;
  });

  totalDisplay.textContent = total.toFixed(2);

  // Agregar eventos de eliminar a cada botón de eliminar
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', eliminarProducto);
  });
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
  const button = event.target;
  const index = button.getAttribute('data-index');

  // Eliminar el producto del array de items
  items.splice(index, 1);

  // Actualizar la lista visual del carrito
  actualizarCarritoVisual();

  // Guardar el carrito en LocalStorage después de eliminar el producto
  guardarCarritoLocalStorage();

  // Ocultar el carrito si está vacío
  if (items.length === 0) {
    cartContainer.classList.remove('show');
  }
}

// Guardar el carrito en LocalStorage
function guardarCarritoLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(items));
}

// Cargar el carrito desde LocalStorage
function cargarCarritoLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    items = JSON.parse(carritoGuardado);
    actualizarCarritoVisual();

    // Mostrar el carrito si no está vacío
    if (items.length > 0) {
      cartContainer.classList.add('show');
    }
  }
}

// Vaciar carrito
clearCartButton.addEventListener('click', () => {
  items = [];
  total = 0;
  cartItems.innerHTML = '';
  totalDisplay.textContent = total.toFixed(2);

  // Limpiar el carrito de LocalStorage
  localStorage.removeItem('carrito');

  // Ocultar el carrito
  cartContainer.classList.remove('show');
});

// Función para mostrar mensajes
function mostrarMensaje(titulo, texto, tipo) {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: tipo,
    confirmButtonText: 'Aceptar'
  });
}

// Función para comprar el carrito
buyNowButton.addEventListener('click', () => {
  if (items.length > 0) {
    // Aquí puedes agregar la lógica para procesar la compra
    mostrarMensaje('¡Compra realizada con éxito!', 'Gracias por su compra.', 'success');

    // Limpiar el carrito después de la compra
    items = [];
    total = 0;
    cartItems.innerHTML = '';
    totalDisplay.textContent = total.toFixed(2);

    // Limpiar el carrito de LocalStorage
    localStorage.removeItem('carrito');

    // Ocultar el carrito
    cartContainer.classList.remove('show');
  } else {
    mostrarMensaje('Carrito vacío', 'El carrito está vacío.', 'warning');
  }
});

// Cargar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarCarritoLocalStorage(); // Cargar el carrito si ya existe en LocalStorage
});
