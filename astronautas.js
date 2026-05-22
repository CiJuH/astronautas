const botonTodos = document.getElementById("btn-buscar");
const botonAaa = document.getElementById("btn-aaa")
const botonRefrescar = document.getElementById("btn-refrescar");
const filtro = document.getElementById("input-filtro");

let datosCacheados = null;

botonTodos.addEventListener("click", function() {
    console.log("¡Botón pulsado!")
    showListaAstronautas()
})

botonAaa.addEventListener("click", function() {
    console.log("¡Limpieza!")
    limpiarLista()
})

botonRefrescar.addEventListener("click", function() {
    console.log("¡Qué fresquito!")
    refrescarDatos()
})
botonRefrescar.addEventListener("mouseover", function() {
    botonRefrescar.textContent = "🥶"
})
botonRefrescar.addEventListener("mouseleave", function() {
    botonRefrescar.textContent = "🥤"
})

filtro.addEventListener("input", function() {
    filtrar(filtro.value)
})

async function getListaAstronautas() {
    if (datosCacheados) return datosCacheados;
    const respuesta = await fetch("https://people-in-space-api.iss-mirroring.workers.dev/");
    datosCacheados = await respuesta.json();
    return datosCacheados;
}

function refrescarDatos() {
    datosCacheados = null;
    showListaAstronautas()
}

// function pingOpenNotify() {
//     fetch("http://api.open-notify.org/astros.json")
//         .then(function(respuesta) {
//             return respuesta.json()
//         })
//         .then(function(datos) {
//             console.log(datos);
//             showAstronautList(datos)
//         });
// }

async function showListaAstronautas() {
    const datos = await getListaAstronautas();
    let contador = document.getElementById("contador");
    contador.textContent = getContador(datos);
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    ulLi = montarListaAstronautas(datos.people)
    addToListHTML(ulLi, lista)
}

function getContador(datos) {
    return datos.number
}

function montarListaAstronautas(personas) {
    let items = []
    personas.forEach(function(astronauta) {
        newLi = document.createElement("li");
        nombreNave = astronauta.name + " — " + astronauta.craft;
        newLi.textContent = nombreNave;
        items.push(newLi)
    })
    console.log(items)
    return items
}

function addToListHTML(lista, contenedor) {
    lista.forEach(element => {
        contenedor.appendChild(element)
    });
}

function limpiarLista() {
    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador")
    contador.textContent = ""
    lista.innerHTML = ""
}

// function showListaAstronautas(datos) {
//     const lista = document.getElementById("lista");
//     let contador = document.getElementById("contador")
//     contador.textContent = datos.people.length
//     lista.innerHTML = "";

//     datos.people.forEach(function(astronauta) {
//         newLi = document.createElement("li")
//         nombreNave = astronauta.name + " — " + astronauta.craft
//         newLi.textContent = nombreNave
//         lista.appendChild(newLi)
//     })
// }

async function filtrar(input) {
    const lista = document.getElementById("lista")
    const datos = await getListaAstronautas()
    nuevaLista = []
    datos.people.forEach(function(element) {
        if (element.name.toLowerCase().includes(input.toLowerCase()) || element.craft.toLowerCase().includes(input.toLowerCase())) {
            nuevaLista.push(element)
        }
    })
    limpiarLista()
    const items = montarListaAstronautas(nuevaLista)
    addToListHTML(items, lista)
}
