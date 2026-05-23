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

async function fetchAstronautas() {
    const respuesta = await fetch("http://api.open-notify.org/astros.json");
    return await respuesta.json();
}

async function getListaAstronautas() {
    if (datosCacheados) return datosCacheados;
    try {
        datosCacheados = await fetchAstronautas();
        return datosCacheados;
    } catch (error) {
        console.error("Error: ", error)
        mostrarToast("❗No se han podido cargar los datos. Prueba más tarde.")
        return DATOS_MOCK
    }
}

function refrescarDatos() {
    datosCacheados = null;
    showListaAstronautas()
}

async function showListaAstronautas() {
    const datos = await getListaAstronautas()
    if (!datos) return
    renderListaAstronautas(datos);
}