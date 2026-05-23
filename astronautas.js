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
    console.log("hover")
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

function getContador(datos) {
    return datos.number
}

function montarListaAstronautas(personas) {
    return personas.map(crearItemAstronauta)
}

function addToListHTML(lista, contenedor) {
    lista.forEach(element => {
        contenedor.appendChild(element)
    });
}

function filtrarPersonas(personas, input) {
    return personas.filter(function(element) {
        return element.name.toLowerCase().includes(input.toLowerCase()) ||
               element.craft.toLowerCase().includes(input.toLowerCase())
    })
}

async function filtrar(input) {
    const datos = await getListaAstronautas()
    const filtrados = filtrarPersonas(datos.people, input)
    renderListaAstronautas({ number: filtrados.length, people: filtrados })
}

function iniciarRefresco() {
    intervaloRefresco = setInterval(function() {
        scale += 0.05
        botonRefrescar.style.transform = `scale(${scale})`
    }, 50)

    timeoutVibrar = setTimeout(function() {
        botonRefrescar.classList.add("vibrando")
    }, 15000)

    intervaloMensajes = setInterval(function() {
        const mensaje = elegirMensaje()
        if (mensaje) {
            mostrarToast(mensaje)
        } else {
            clearInterval(intervaloMensajes)
            iniciarAaaa()
        }
    }, 4000)
}

function clearAllIntervals() {
    clearInterval(intervaloRefresco)
    clearInterval(intervaloMensajes)
    clearInterval(intervaloAaaa)
    clearTimeout(timeoutVibrar)
    intervaloAaaa = null
}

function resetBotonRefrescar() {
    aaaaaa = "A"
    scale = 1
    botonRefrescar.style.transform = "scale(1)"
    botonRefrescar.classList.remove("vibrando")
}

function pararRefresco() {
    clearAllIntervals()
    resetBotonRefrescar()
    ocultarToast()
}

function iniciarAaaa() {
    intervaloAaaa = setInterval(function() {
        aaaaaa += "A"
        mostrarToastPermanente(aaaaaa)
    }, 100)
}

function elegirMensaje() {
    if (choices.length > 0) {
        var index = Math.floor(Math.random() * choices.length)
        var choice = choices[index]
        choices.splice(index, 1)
        return choice;
    }
}