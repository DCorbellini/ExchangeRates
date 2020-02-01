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


function manejarOpciones(respuestaJSON) {
    Object.keys(respuestaJSON.rates).forEach(moneda => {
        crearOpcionBase(moneda)
    })
    $seleccionarBase.value = respuestaJSON.base
    $seleccionarFecha.value = respuestaJSON.date
}
function crearOpcionBase(key) {
    const nuevaOpcion = document.createElement('option')
    nuevaOpcion.classList.add('opcion')
    nuevaOpcion.value = key
    nuevaOpcion.innerText = key
    $seleccionarBase.appendChild(nuevaOpcion)
}
function manejarLista(respuestaJSON) {
    $lista.innerHTML = ''
    Object.keys(respuestaJSON.rates).forEach(moneda => {
        const nuevoItem = document.createElement('div')
        nuevoItem.classList.add('row')
        nuevoItem.classList.add('item')

        const nuevaMoneda = document.createElement('div')
        nuevaMoneda.classList.add('col-sm-1')
        nuevaMoneda.classList.add('list-group-item')
        nuevaMoneda.classList.add('item')
        nuevaMoneda.classList.add(moneda)
        nuevaMoneda.innerText = moneda

        const nuevoValor = document.createElement('div')
        nuevoValor.classList.add('col-sm-4')
        nuevoValor.classList.add('list-group-item')
        nuevoValor.classList.add('item')
        nuevoValor.classList.add(`valor-${moneda}`)
        nuevoValor.innerText = respuestaJSON.rates[moneda]


        nuevoItem.appendChild(nuevaMoneda)
        nuevoItem.appendChild(nuevoValor)
        $lista.appendChild(nuevoItem)

    })
}


manejarHTML()
