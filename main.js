document.addEventListener("DOMContentLoaded", () => {

    cargarCarritoLocalStorage();
    imprimirCarrito();

});


//array de objetos con todos los productos
// const productos =
// [
//  {
//    id: 1,
//    nombre: "Dog Chow 3kg",
//    img: "img/DOG CHOW.png",
//    precio: 880,
//    cantidad: 1,
//  },
//  {
//    id: 2,
//    nombre: "Excellent Reduced Calorie 3kg",
//    img: "img/EXCELLENT.png",
//    precio: 1365,
//    cantidad: 1,
//  },
//  {
//    id: 3,
//    nombre: "Pro Plan Adulto Small Raza Pequeña 7.5kg",
//    img: "img/PRO PLAN ADULTO.png",
//    precio: 4235,
//    cantidad: 1,
//  },
//  {
//    id: 4,
//    nombre: "Biberon Para Cachorros 120ml",
//    img: "img/BIBERON.png",
//    precio: 760,
//    cantidad: 1,
//  },
//  {
//    id: 5,
//    nombre: "Bolsa Higienicas Biodegradables x12u",
//    img: "img/BOLSITAS.png",
//    precio: 1170,
//    cantidad: 1,
//  },
//  {
//    id: 6,
//    nombre: "Dispenser Ferplast Agua/Comida",
//    img: "img/DISPENSER.png",
//    precio: 1190,
//    cantidad: 1,
//  },
//  {
//    id: 7,
//    nombre: "Balanced Gato Adulto 2kg",
//    img: "img/catbalanced.png",
//    precio: 1320,
//    cantidad: 1,
//  },
//  {
//    id: 8,
//    nombre: "Excellent Gato Adulto 1kg",
//    img: "img/catexcellent.png",
//    precio: 690,
//    cantidad: 1,
//  },
//  {
//    id: 9,
//    nombre: "Cat Chow Adulto Pescado 3kg",
//    img: "img/chow.png",
//    precio: 1240,
//    cantidad: 1,
//  },
//  {
//    id: 10,
//    nombre: "Fuente Bebedero Para Gatos",
//    img: "img/fuente gato.png",
//    precio: 7050,
//    cantidad: 1,
//  },
//  {
//    id: 11,
//    nombre: "Hierba Gatera",
//    img: "img/hierba gato.png",
//    precio: 310,
//    cantidad: 1,
//  },
//  {
//    id: 12,
//    nombre: "Dispenser Ferplast Agua/Comida",
//    img: "img/rascador gato.png",
//    precio: 1530,
//    cantidad: 1,
//  },
//];

//creo un array vacio para ir llenando con productos
const carrito = [];


//Creo una funcion para imprimir los productos en la pantalla
async function imprimirProductos() {

    const tienda = document.getElementById('tienda')
    const response = await fetch('/productos.json');
    const productos = await response.json();

    productos.forEach(({
        nombre,
        img,
        precio,
        id
    }) => {

        let producto = document.createElement('div')
        producto.classList.add('col-12') //clases de bootstrap
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p>Precio: ${precio} $</p>
                <button class="btn btn-primary" id="${id}"> &#128722; Añadir al carrito</button>
            </div>
        </div>
        `

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', () => {
            updateContador()
            agregarProductosAlCarrito(id);

        })
    })
}

imprimirProductos();

async function agregarProductosAlCarrito(id) {
    const response = await fetch('/productos.json');
    const productos = await response.json();

    let producto = productos.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if (productoEnCarrito) {

        productoEnCarrito.cantidad++; //operadoes avanzados ++

        Swal.fire({
            icon: 'success',
            title: 'Excelente!',
            text: `Otra unidad de ${producto.nombre} se agrego correctamente al carrito`,
            timer: 2000
        })

    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
        Swal.fire({
            icon: 'success',
            title: 'Excelente!',
            text: `1 unidad de ${producto.nombre} se agrego correctamente al carrito`,
            timer: 2000
        })
    }


    imprimirCarrito();
    calcularTotal()
    guardarCarritoLocalStorage()
}



function eliminarProductoDelCarrito(index) {

    carrito[index].cantidad--;

    Swal.fire({
        icon: 'warning',
        title: 'Atención!',
        text: `Haz eliminado 1 unidad de ${carrito[index].nombre}`,
        timer: 2000
    })

    if (carrito[index].cantidad === 0) {

        carrito.splice(index, 1);

        Swal.fire({
            icon: 'warning',
            title: 'Atención!',
            text: `Has eliminado ${ultimoProducto} del carrito`,
            timer: 2000
        })
    }


    imprimirCarrito();
    calcularTotal();
    updateContador();
    guardarCarritoLocalStorage()
}

function imprimirCarrito() {

    const c = document;
    let carritoPag = c.querySelector('#carrito');

    carritoPag.innerHTML = '';

    carrito.forEach(({
        nombre,
        img,
        precio,
        cantidad,
        id
    }, index) => {

        let producto = document.createElement('div')
        producto.classList.add('col-12')
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <h6 class="card-title">${id}</h6>
                <p>Precio: ${precio} R$</p>
                <p>Cantidad: ${cantidad}</p> 
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `
        producto.querySelector('button').addEventListener('click', () => {

            ultimoProducto = nombre;
            eliminarProductoDelCarrito(index)

        })

        carritoPag.appendChild(producto);
    })



}
let ultimoProducto;

function calcularTotal() {

    let total = 0;

    carrito.forEach((p) => {

        total += p.precio * p.cantidad;
    })

    const totalHtml = document.getElementById('total')

    totalHtml.innerHTML = `<h5>Total $ ${total}</h5>`

}

function updateContador() {
    const carritoStorage = localStorage.getItem("carrito");
    let totalProductos = 0;

    if (carritoStorage !== null) {
        JSON.parse(carritoStorage).forEach((producto) => {
            totalProductos += producto.cantidad;
        });
        localStorage.setItem("contador", totalProductos);
    }

    let contadorCarrito = document.getElementById('contador-carrito');

    contadorCarrito.innerText = totalProductos;
}

function guardarCarritoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    updateContador()
}

function cargarCarritoLocalStorage() {
    const carritoStorage = localStorage.getItem("carrito");
    (carritoStorage) ? carrito.push(...JSON.parse(carritoStorage)): [] //if ternario   
    updateContador();
}