const add = document.querySelector(".boton-add");
const remove = document.querySelector(".boton-borrar");
// const clear = document.querySelector(".boton-vaciar");
const indice_add = document.querySelector(".add");
const indice_remove = document.querySelector(".borrar");
const contenedor = document.querySelector(".contenedor");
const contenedor_error = document.querySelector(".contenedor-error");

// comentario de prueba

class Nodo {
    constructor(indice) {
        this.indice = indice;
        this.siguiente = null;
    }
}

class ListaEnlazada {
    constructor(cabecera = null) {
        this.cabecera = cabecera;
    }
}

let lista = new ListaEnlazada;


// #### FUNCIONES ####
cargarEventos();

function cargarEventos() {
    add.addEventListener('click', insertNode);
    remove.addEventListener('click', removeNode);

    /*clear.addEventListener('click', (evento) => {
        limpiarHTML();
    });*/
}


// Funciones de NODOS
/* FUNCIONAMIENTO DEL ALGORITMO "insertNode":
   1) Comprueba si la lista está vacía (cabecera = null). Si es así, agrega a la cabecera el objeto nodo 
   2) Si la lista no está vacía, se va recorriendo toda la lista. Se accede al nodo siguiente al que apunta el nodo actual (el guardado en la variable "siguiente"); accedidos a ese nodo se hace la misma operación hasta llegar al último nodo que apunta a "null"
*/
function insertNode(evento) {
    const indice = indice_add.value;
    const nuevoNodo = new Nodo(indice);

    if((lista.cabecera === null) && (indice >= 1)) {
        lista.cabecera = nuevoNodo;
    }
    else if((lista.cabecera !== null) && (indice >= 1)) {
        let nodo_actual = lista.cabecera;

        while(nodo_actual.siguiente) {
            nodo_actual = nodo_actual.siguiente;
        }

        nodo_actual.siguiente = nuevoNodo;
    }
    else if(indice < 1) {
        error(1);
    }

    indice_add.value = "";    // vaciamos el input
    imprimirNodos();
}

function removeNode() {
    const indice = indice_remove.value;
    let nodo = lista.cabecera;
    let encontrado = false;
    
    if(nodo.indice === indice) {
        lista.cabecera = nodo.siguiente;
    }
    else if(nodo.siguiente === null) {
        lista.cabecera = null;
    }
    else {
        while(nodo.siguiente !== null && !encontrado) {
            if(nodo.siguiente.indice === indice) {
                nodo.siguiente = nodo.siguiente.siguiente;
                encontrado = true;
            }
                
            if(!encontrado) {
                nodo = nodo.siguiente;
            }
        }
    }

    indice_remove.value = "";
    imprimirNodos();
}

function imprimirNodos() {
    limpiarHTML();
    let nodo = lista.cabecera;

    if(!nodo.siguiente) {
        console.log(nodo.indice);
        agregarHTML(nodo);
    }
    else {
        while(nodo.siguiente) {
            console.log(nodo.indice);
            agregarHTML(nodo);
            nodo = nodo.siguiente;
        }

        console.log(nodo.indice);
        agregarHTML(nodo);
    }

    console.log("--------------");
}


// Función de quitar y agregar HTML
function agregarHTML(nodo) {
    const row = document.createElement("div");

    row.innerHTML = `
        <div class="elemento">
            <div class="circulo">
                <p>${nodo.indice}</p>
            </div>

            <div class="arrow"></div>
        </div>
    `

    contenedor.appendChild(row);
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

