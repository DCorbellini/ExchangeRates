const $lista = document.querySelector('#lista')
const $boton = document.querySelector('#boton')
const $seleccionarBase = document.querySelector('#base')
const $seleccionarFecha = document.querySelector('#fecha')

let $fecha = 'latest'
let $base = 'USD'

function manejarHTML() {
    fetch(`https://api.exchangeratesapi.io/${$fecha}?base=${$base}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            manejarOpciones(respuestaJSON)
            manejarLista(respuestaJSON)
        })

        .catch(error => console.log('ERROR: ', error))
}


$boton.onclick = () => {
    $fecha = $seleccionarFecha.value
    $base = $seleccionarBase.value

    if (!$fecha) {
        $fecha = 'latest'
    }
    if (!$base) {
        $base = 'USD'
    }

    manejarHTML()
}


function crearOpcionBase(key) {
    const nuevaOpcion = document.createElement('option')
    nuevaOpcion.value = key
    nuevaOpcion.innerText = key
    $seleccionarBase.appendChild(nuevaOpcion)
}
function manejarOpciones(respuestaJSON) {
    Object.keys(respuestaJSON.rates).forEach(moneda => {
        crearOpcionBase(moneda)
    })
    $seleccionarBase.value = respuestaJSON.base
    $seleccionarFecha.value = respuestaJSON.date
}
function manejarLista(respuestaJSON) {
    $lista.innerHTML = ''
    Object.keys(respuestaJSON.rates).forEach(moneda => {
        const rate = document.createElement('li')
        rate.innerText = `${moneda}: ${respuestaJSON.rates[moneda]}`
        $lista.appendChild(rate)
    })
}


manejarHTML()
