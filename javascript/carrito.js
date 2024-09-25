


const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const cartContainer = document.getElementById('cart-container');
const clearCartButton = document.getElementById('clear-cart');
const buyNowButton = document.getElementById('buy-now');

let total = 0;
let items = [];

// a agregar productos al carrito //
function agregarProductoAlCarrito(producto) {
  const existe = items.find(item => item.nombre === producto.nombre);
  if (!existe) {
    items.push(producto);
    actualizarCarritoVisual();
    guardarCarritoLocalStorage();
    cartContainer.classList.add('show');
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      cartIcon.classList.add('cart-icon-animate');
      setTimeout(() => {
        cartIcon.classList.remove('cart-icon-animate');
      }, 400);
    }
  }
}


function actualizarCarritoVisual() {
  cartItems.innerHTML = '';
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
  
  cartItems.addEventListener('click', eliminarProducto);
}


function eliminarProducto(event) {
  if (event.target.classList.contains('remove-item')) {
    const index = event.target.getAttribute('data-index');
    items.splice(index, 1);
    actualizarCarritoVisual();
    guardarCarritoLocalStorage();
    if (items.length === 0) {
      cartContainer.classList.remove('show');
    }
  }
}

//  carrito en LocalStorage //
function guardarCarritoLocalStorage() {
  try {
    localStorage.setItem('carrito', JSON.stringify(items));
  } catch (error) {
    console.error('Error al guardar el carrito en LocalStorage:', error);
  }
}

// Cargar el carrito desde LocalStorage //
function cargarCarritoLocalStorage() {
  try {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      items = JSON.parse(carritoGuardado);
      actualizarCarritoVisual();
      if (items.length > 0) {
        cartContainer.classList.add('show');
      }
    }
  } catch (error) {
    console.error('Error al cargar el carrito desde LocalStorage:', error);
  }
}

// Vaciar carrito //
clearCartButton.addEventListener('click', () => {
  items = [];
  total = 0;
  cartItems.innerHTML = '';
  totalDisplay.textContent = total.toFixed(2);
  localStorage.removeItem('carrito');
  cartContainer.classList.remove('show');
});


function mostrarMensaje(titulo, texto, tipo) {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: tipo,
    confirmButtonText: 'Aceptar'
  });
}


buyNowButton.addEventListener('click', () => {
  if (items.length > 0) {
    mostrarMensaje('¡Compra realizada con éxito!', 'Gracias por su compra.', 'success');
    items = [];
    total = 0;
    cartItems.innerHTML = '';
    totalDisplay.textContent = total.toFixed(2);
    localStorage.removeItem('carrito');
    cartContainer.classList.remove('show');
  } else {
    mostrarMensaje('Carrito vacío', 'El carrito está vacío.', 'warning');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  cargarCarritoLocalStorage();
});
