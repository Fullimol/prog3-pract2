const containerTabla = document.querySelector('.container-tabla');
const btnAgregar = document.getElementById("btnAgregar");
const containerForm = document.querySelector('.container-form');
const textoForm = document.getElementById("texto-form")
const btnAceptar = document.getElementById("btnAceptar");
const btnCancelar = document.getElementById("btnCancelar");
const spinner = document.getElementById("spinner");
const tabla = document.getElementById('tablaPersonas');
let cuerpo = tabla.querySelector('tbody');
let formulario = document.getElementById("formulario");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");

let inputNombre = document.getElementById("input-nombre");
let inputApellido = document.getElementById("input-apellido");
let inputEdad = document.getElementById("input-edad");
let inputEquipo = document.getElementById("input-equipo");
let inputPosicion = document.getElementById("input-posicion");
let inputCantGoles = document.getElementById("input-cantGoles");
let inputTituloUni = document.getElementById("input-tituloUni");
let inputFacultad = document.getElementById("input-facultad");
let inputAnioGradu = document.getElementById("input-anioGrad");

const labelFutbolista = document.getElementById('label-futbolista');
const labelProfesional = document.getElementById('label-profesional');



// OBTENER DATA de la API
const url = "https://examenesutn.vercel.app/api/PersonasFutbolistasProfesionales"
let arrayPersonas = [];

async function obtenerDatos() {
    try {
        showSpinner(true);
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            instanciarPersonas(data);
            console.log("Datos cargados:", arrayPersonas);
            inicializarApp(); // Mostrar el formulario de la lista
        } else {
            alert("Error al obtener los datos. Código de respuesta: " + response.status);
        }
    } catch (error) {
        alert("Error al conectar con la API: " + error.message);
    } finally {
        showSpinner(false);
    }
}

function instanciarPersonas(data) {
    data.forEach(item => {
        try {
            if ('equipo' in item) {
                const futbolista = new Futbolista(item.id, item.nombre, item.apellido, item.edad, item.equipo, item.posicion, item.cantidadGoles);
                arrayPersonas.push(futbolista);
            } else if ('titulo' in item) {
                const profesional = new Profesional(item.id, item.nombre, item.apellido, item.edad, item.titulo, item.facultad, item.añoGraduacion);
                arrayPersonas.push(profesional);
            }
        } catch (error) {
            console.error(error.message);
        }
    });
}

obtenerDatos();


//    ************* CREAR CLASES *************
class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}`;
    }
}


class Futbolista extends Persona {
    constructor(id, nombre, apellido, edad, equipo, posicion, goles) {
        super(id, nombre, apellido, edad);
        this.equipo = equipo;
        this.posicion = posicion;
        this.goles = goles;
    }

    toString() {
        return `$ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Equipo: ${this.equipo}, Posición: ${this.posicion}, Goles: ${this.goles}`;
    }
}


class Profesional extends Persona {
    constructor(id, nombre, apellido, edad, titulo, facultad, graduacion) {
        super(id, nombre, apellido, edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.graduacion = graduacion;
    }
    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Título: ${this.titulo}, Facultad: ${this.facultad}, Graduación: ${this.graduacion}`;
    }
}


// MOSTRAR TABLA O MOSTRAR FORMULARIO
function showVistaTabla(mostrar) {
    if (mostrar) {
        containerTabla.classList.remove('hidden');
        containerForm.classList.add('hidden');
    } else {
        containerTabla.classList.add('hidden');
        containerForm.classList.remove('hidden');
    }
}

function showSpinner(mostrar) {
    if (mostrar) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}


//    ************* AGREGAR ELEMENTO *************
btnAgregar.addEventListener("click", function () {
    let tipoPersona = prompt("¿Qué tipo de elemento desea agregar? (futbolista/profesional)").toLowerCase();
    if (tipoPersona === "futbolista") {
        labelProfesional.classList.add('hidden');
        // Guardar el tipo de persona en un atributo del botón "Alta"
        btnAceptar.setAttribute('data-tipo-persona', 'futbolista');
    } else if (tipoPersona === "profesional") {
        labelFutbolista.classList.add('hidden');
        // Guardar el tipo de persona en un atributo del botón "Alta"
        btnAceptar.setAttribute('data-tipo-persona', 'profesional');
    } else {
        alert("Tipo de persona no válido. Por favor, elija 'Futbolista' o 'Profesional'.");
        btnAgregar.classList.remove('hidden');
        return;
    }

    showVistaTabla(false);
    textoForm.innerHTML = "(ALTA ELEMENTO " + tipoPersona + ")";
    console.log("Agregando elemento...");
    console.log("Tipo de elemento:", tipoPersona);
});

function agregarElemento(tipoElemento) {
    //mostrar únicamente los campos correspondientes al tipo de elemento que se está insertando.

}


//  ************* MOSTRAR TABLA *************
function mostrarTablaPersonas(arrayPersonas) {
    cuerpo.innerHTML = '';

    // Agregar las filas de datos al nuevo <tbody>
    arrayPersonas.forEach(persona => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="col-id">${persona.id}</td>
            <td class="col-nombre">${persona.nombre}</td>
            <td class="col-apellido">${persona.apellido}</td>
            <td class="col-edad">${persona.edad}</td>
            <td class="col-equipo">${'equipo' in persona ? persona.equipo : '-'}</td>
            <td class="col-posicion">${'posicion' in persona ? persona.posicion : '-'}</td>
            <td class="col-cantGoles">${'cantidadGoles' in persona ? persona.cantidadGoles : '-'}</td>
            <td class="col-titulo">${'titulo' in persona ? persona.titulo : '-'}</td>
            <td class="col-facultad">${'facultad' in persona ? persona.facultad : '-'}</td>
            <td class="col-añoGraduacion">${'añoGraduacion' in persona ? persona.añoGraduacion : '-'}</td>
            <td class="col-acciones">
                <button type="button" id="btnModificar">Modificar</button>
            </td>
            <td class="col-acciones">
                <button type="button" id="btnEliminar">Eliminar</button>
            </td>
           
        `;
        cuerpo.appendChild(fila);
    });

    // Agregar el nuevo <tbody> a la tabla
    tabla.appendChild(cuerpo);
}


/// (!)   TENGO QUE TOMAR SI SE SUBE UN ELEMENTO PERSONA O PROFESIONAL, LUEGO EL PULL:  (PUNTO 4)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

btnAceptar.addEventListener("click", async function (e) {
    e.preventDefault();
    showSpinner(true);
    const tipoElemento = btnAceptar.getAttribute("data-tipo-persona");

    // Crear el objeto con los datos del formulario
    let nuevoElemento;
    if (tipoElemento === "futbolista") {
        nuevoElemento = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            edad: parseInt(inputEdad.value),
            equipo: inputEquipo.value,
            posicion: inputPosicion.value,
            cantidadGoles: parseInt(inputCantGoles.value),
        };
    } else if (tipoElemento === "profesional") {
        nuevoElemento = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            edad: parseInt(inputEdad.value),
            titulo: inputTituloUni.value,
            facultad: inputFacultad.value,
            añoGraduacion: parseInt(inputAnioGradu.value),
        };

    } else {
        alert("Tipo de elemento no válido.");
        showSpinner(false);
        return;
    }
    console.log("Enviando el siguiente objeto al servidor:", nuevoElemento);

    try {
        // Realizar la solicitud PUT al servidor                           (!) NO ESTA FUNCIONANDO EL PUT DE LOS DATOS A LA API !!!!!!!!!!!!!!!!!!!
        const response = await fetch("https://examenesutn.vercel.app/api/PersonasFutbolistasProfesionales", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoElemento), // Convertir el objeto a JSON

        });
        console.log("OBJETO A ENVIAR!!!!:", JSON.stringify(nuevoElemento, null, 2));


        if (response.status === 200) {
            const elementoGuardado = await response.json(); // Recibir el objeto con el ID generado
            console.log("Elemento agregado:", elementoGuardado);

            // Actualizar el array local con el nuevo elemento
            arrayPersonas.push(elementoGuardado);

            mostrarTablaPersonas(arrayPersonas);
            showVistaTabla(true);
            // limpiarInputs();
        } else {
            console.log("AAAAAAAAAAAAAAh")
            const errorText = await response.text();
            console.error("Error del servidor:", errorText);
            alert("Error al agregar el elemento. Código de respuesta: " + response.status + "\n" + errorText);
        }
    } catch (error) {
        alert("Error al conectar con la API: " + error.message);
    } finally {
        showSpinner(false);
    }
});

btnCancelar.addEventListener("click", function () {
    limpiarInputs();
    showVistaTabla(true);
});

function limpiarInputs() {
    inputNombre.value = '';
    inputApellido.value = '';
    inputEdad.value = '';
    inputEquipo.value = '';
    inputPosicion.value = '';
    inputCantGoles.value = '';
    inputTituloUni.value = '';
    inputFacultad.value = '';
    inputAnioGradu.value = '';

    labelFutbolista.classList.remove('hidden');
    labelProfesional.classList.remove('hidden');
}

function inicializarApp() {
    console.log("Inicializando la aplicación con los datos:", arrayPersonas);
    mostrarTablaPersonas(arrayPersonas);
}