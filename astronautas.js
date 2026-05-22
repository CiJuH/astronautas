const botonTodos = document.getElementById("btn-buscar");
const botonAaa = document.getElementById("btn-aaa")
const botonRefrescar = document.getElementById("btn-refrescar");
const filtro = document.getElementById("input-filtro");
const choices = [
    "Deja de apretarme, estúpido", 
    "¡Cómo te atreves!", 
    "¡Vaya fresco!", 
    "¡Estoy incómodo!", 
    "¿Tú esto lo ves normal?",
    "Espero que se te rompa el dedo",
    "¡Ay! ¡¡Ay!! ¡¡AY!!",
    "Suéltame, por favor"
]

const DATOS_MOCK = {
    number: 10,
    people: [
        { name: "Wu Fei", craft: "Tiangong" },
        { name: "Zhang Lu", craft: "Tiangong" },
        { name: "Zhang Hongzhang", craft: "Tiangong" },
        { name: "Sergei Kud-Sverchkov", craft: "ISS" },
        { name: "Sergei Mikayev", craft: "ISS" },
        { name: "Christopher Williams", craft: "ISS" },
        { name: "Sophie Adenot", craft: "ISS" },
        { name: "Andrei Fedyaev", craft: "ISS" },
        { name: "Jack Hathaway", craft: "ISS" },
        { name: "Jessica Meir", craft: "ISS" }
    ]
}

let datosCacheados = null;
let scale = 1;
let intervaloRefresco = null;
let intervaloAaaa = null;
let aaaaaa = "A";
let intervaloMensajes = null;
let timeoutVibrar = null;

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
    pararRefresco()
    botonRefrescar.textContent = "🥤"
})
botonRefrescar.addEventListener("mousedown", iniciarRefresco)
botonRefrescar.addEventListener("mouseup", pararRefresco)

filtro.addEventListener("input", function() {
    filtrar(filtro.value)
})
filtro.addEventListener("input", function() {
    if (filtro.value === "") {
        showListaAstronautas()
    }
    else {
        filtrar(filtro.value)
    }
})
filtro.addEventListener("blur", function() {
    console.log("Eres una pta")
})

async function getListaAstronautas() {
    if (datosCacheados) return datosCacheados;
    try {
        const respuesta = await fetch("http://api.open-notify.org/astros.json");
        datosCacheados = await respuesta.json();
        return datosCacheados;
    } catch (error) {
        console.log("Error: ", error)
        mostrarToast("❗No se han podido cargar los datos de los astronautas. Prueba más tarde.")
        return DATOS_MOCK
    }
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
    if (!datos) return
    let contador = document.getElementById("contador");
    contador.textContent = `${getContador(datos)} astronautas`;
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
        const spanNombre = document.createElement("span")
        const spanNave = document.createElement("span")
        spanNombre.textContent = astronauta.name
        spanNave.textContent = astronauta.craft
        newLi.appendChild(spanNombre)
        newLi.appendChild(spanNave)
        items.push(newLi)
    })
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

function mostrarToast(mensaje, permanente = false) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje
    if (permanente) {
        toast.classList.add("permanente")
        toast.classList.add("visible")
    } else {
        toast.classList.remove("permanente")
        toast.classList.add("visible")
        setTimeout(function() {
            toast.classList.remove("visible")
        }, 3000)
    }
}

function iniciarRefresco() {
    timeoutVibrar = setTimeout(function() {
        botonRefrescar.classList.add("vibrando")
    }, 15000)

    intervaloMensajes = setInterval(function() {
        if (choices.length > 0) {
            var index = Math.floor(Math.random() * choices.length)
            mostrarToast(choices[index])
            choices.splice(index, 1)
        } else {
            clearInterval(intervaloMensajes)  // para el de 4s
            intervaloAaaa = setInterval(function() {
                aaaaaa += "A"
                mostrarToast(aaaaaa, true)
            }, 100)
        }
    }, 4000)
}

function pararRefresco() {
    clearInterval(intervaloRefresco)
    clearInterval(intervaloMensajes)
    clearInterval(intervaloAaaa)
    clearTimeout(timeoutVibrar)
    intervaloAaaa = null
    aaaaaa = "A"
    scale = 1
    botonRefrescar.style.transform = "scale(1)"
    botonRefrescar.classList.remove("vibrando")
    const toast = document.getElementById("toast")
    toast.classList.remove("permanente")
    toast.classList.remove("visible")
}