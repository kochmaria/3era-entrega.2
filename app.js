let carrito = [];

class Producto {
  constructor(id, nombre, precio, description, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.description = description;
    this.imagen = imagen;
  }
}

const Productos = [
  new Producto(1, 'Headphones', 700 , 'Headphones Bluetooth Apple', 'img/airpods-max-select-spacegray-202011_FV1_FMT_WHH.jpeg'),
  new Producto(2, 'Headphones', 500, 'Headphones Bluetooth JBL', 'img/12_grande.jpeg'),
  new Producto(3, 'Airpods', 200, 'Auriculares Bluetooth Apple', 'img/960x0.webp'),
  new Producto(4, 'Headphones Sony', 150, 'Headphones Sony con cable', 'img/DISYX110NC_sony_noise_cancelling_headphones_black_mdr_zx110nc.jpeg'),
  new Producto(5, 'Auriculares Apple', 120, 'Auriculares Apple con cable', 'img/i3336952727.webp'),
  new Producto(6, 'Headphones Runner JBL', 200, 'Headphones Bluetooth deporte', 'img/44947708543006.jpeg'),
  new Producto(7, 'Auriculares Noise-Cancelling', 400, 'Headphones Blutooth cancelacion de sonido', 'img/D_NQ_NP_748664-MLA25641278595_062017-O.webp')
];

const productContainer = document.getElementById('product-container');
const cartItemsContainer = document.getElementById('cart-items');
const precioTotalElement = document.getElementById('precio-total');
const vaciarCarritoButton = document.getElementById('vaciar-carrito');

const agregarProductoAlCarrito = (producto) => {
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();
};

const eliminarProductoDelCarrito = (productId) => {
  carrito = carrito.filter((producto) => producto.id !== productId);
  guardarCarrito();
  mostrarCarrito();
};

const guardarCarrito = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

const mostrarCarrito = () => {
  cartItemsContainer.innerHTML = '';
  let precioTotal = 0;

  carrito.forEach((producto) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('CartItem');
    productDiv.innerHTML = `
      <div class="product-info">
        <div class="row">
          <div class="col-lg-3">
            <div class="product-image">
              <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
          </div>
          <div class="col-lg-9">
            <div class="product-details">
              <h1 class="nombre-producto">${producto.nombre}</h1>
              <p>${producto.description}</p>
              <p>${producto.precio}</p>
              <button class="eliminar-producto btn btn-danger" data-id="${producto.id}">Eliminar el producto</button>
            </div>
          </div>
        </div>
      `;
    cartItemsContainer.appendChild(productDiv);
    precioTotal += producto.precio;
  });

  const eliminarButtons = document.querySelectorAll('.eliminar-producto');
  eliminarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      eliminarProductoDelCarrito(Number(productId));
    });
  });

  precioTotalElement.textContent = 'Precio Total: ' + precioTotal.toFixed(2);
  precioTotalElement.style.fontSize = '30px';

  vaciarCarritoButton.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
  });
};

Productos.forEach((producto) => {
  const productDiv = document.createElement('div');
  productDiv.classList.add('Producto');
  productDiv.style.backgroundColor = 'white';
  productDiv.innerHTML = `
    <div class='card'>
      <h3>${producto.id}</h3>
      <h1>${producto.nombre}</h1>
      <div class="product-image-container">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top product-image">
      </div>
      <div class="card-body">
        <p>${producto.precio}</p>
        <p>${producto.description}</p>
        <button class="agregar-carrito btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
  `;

  productContainer.appendChild(productDiv);

  const addButton = productDiv.querySelector('.agregar-carrito');

  addButton.addEventListener('click', () => {
    agregarProductoAlCarrito(producto);
  });
});

const inicializarCarrito = () => {
  const carritoGuardado = localStorage.getItem('carrito');

  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

  mostrarCarrito();
};

inicializarCarrito();

// Additional functions using objects and ternary operators
const mostrarCarritoEnConsola = () => {
  console.log(carrito.length ? carrito : 'El carrito está vacío');
};

const buscarProducto = (nombreProducto) => {
  const productoEncontrado = carrito.find((producto) => producto.nombre === nombreProducto);
  console.log(productoEncontrado ? productoEncontrado : 'Producto no encontrado');
};

const filtrarPorPrecio = (precioMaximo) => {
  const productosFiltrados = carrito.filter((producto) => producto.precio <= precioMaximo);
  console.log(productosFiltrados.length ? productosFiltrados : 'No se encontraron productos dentro del rango de precio especificado');
};

mostrarCarritoEnConsola();
buscarProducto();
filtrarPorPrecio();
