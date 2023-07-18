const add = document.querySelector(".boton-add");
const remove = document.querySelector(".boton-borrar");
const clear = document.querySelector(".boton-vaciar");
const indice_add = document.querySelector(".add");
const indice_remove = document.querySelector(".borrar");
let arrayIndices = [];
const contenedor = document.querySelector(".contenedor");
const contenedor_error = document.querySelector(".contenedor-error");


cargarEventos();


function cargarEventos() {
    add.addEventListener('click', cargarIndice);
    remove.addEventListener('click', quitarIndice);
    clear.addEventListener('click', (evento) => {
        arrayIndices = [];
        limpiarHTML();
    });
}

function cargarIndice(evento) {
    const num = indice_add.value;

    if(num >= 1) {
        arrayIndices = [...arrayIndices, num];
        console.log(arrayIndices);
        agregarHTML();
    }
    else if(num < 1) {
        error(1);
    }

    indice_add.value = "";   // vaciamos el input
}

function quitarIndice(evento) {
    const indice = indice_remove.value;

    if((indice >= 1) && (arrayIndices.some((num) => num === indice))) {
        arrayIndices = arrayIndices.filter((num) => num !== indice);
        console.log(arrayIndices);
        agregarHTML();
    }
    else if((indice >= 1) && !(arrayIndices.some((num) => num === indice))) {
        error(2);
    }
    else if(indice < 1) {
        error(1);
    }
    
    indice_remove.value = "";
}

// Función de quitar y agregar HTML
function agregarHTML() {

    limpiarHTML();
    limpiarError();

    arrayIndices.forEach( (num) => {
        const row = document.createElement("div");

        row.innerHTML = `
            <div class="elemento">
                <div class="circulo">
                    <p>${num}</p>
                </div>

                <div class="arrow"></div>
            </div>
        `

        contenedor.appendChild(row);
    })
}


// Funciones de LIMPIAR HTML
function limpiarHTML() {
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function limpiarError() {
    while(contenedor_error.firstChild) {
        contenedor_error.removeChild(contenedor_error.firstChild);
    }
}


// Funciones de ERRORES
function error(numero) {
    // Limpiamos el mensaje de error 
    limpiarError();

    const msg = document.createElement("div");

    if (numero === 1) {
        msg.innerHTML = `
            <p class="error">Índice válido: num >= 1</p>
        `
    }
    else if(numero === 2) {
        msg.innerHTML = `
            <p class="error">Índice no encontrado</p>
        `
    }
    
    contenedor_error.appendChild(msg); 
} 


