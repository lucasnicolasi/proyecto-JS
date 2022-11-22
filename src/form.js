const d = document;

const form = d.getElementById('formulario');
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const nombre = d.getElementById('nombre').value;
    const apellido = d.getElementById('apellido').value;
    const telefono = d.getElementById('telefono').value;
    const email = d.getElementById('email').value;
    const texto = d.getElementById('text-area').value;

    const datos = {
        nombre,
        apellido,
        telefono,
        email,
        texto
    }

    console.log(datos);

    form.reset();

})