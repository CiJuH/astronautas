function limpiarLista() {
    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador")
    contador.textContent = ""
    lista.innerHTML = ""
}

function crearItemAstronauta(astronauta) {
    const li = document.createElement("li");
    const spanNombre = document.createElement("span");
    const spanNave = document.createElement("span");
    spanNombre.textContent = astronauta.name;
    spanNave.textContent = astronauta.craft;
    li.appendChild(spanNombre);
    li.appendChild(spanNave);
    return li;
}

function renderListaAstronautas(datos) {
    limpiarLista()
    const contador = document.getElementById("contador");
    contador.textContent = `${datos.number} astronautas`;
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    const items = montarListaAstronautas(datos.people);
    addToListHTML(items, lista);
}

function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.classList.remove("permanente")
    toast.textContent = mensaje
    toast.classList.add("visible")
    setTimeout(function() {
        toast.classList.remove("visible")
    }, 3000)
}

function mostrarToastPermanente(mensaje) {
    const toast = document.getElementById("toast");
    toast.classList.add("permanente")
    toast.textContent = mensaje
    toast.classList.add("visible")
}

function ocultarToast() {
    const toast = document.getElementById("toast");
    toast.classList.remove("permanente")
    toast.classList.remove("visible")
}