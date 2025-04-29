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
                const profesional = new Profesional(item.id, item.nombre, item.apellido, item.edad, item.titulo, item.facultad, item.anioGraduacion);
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
    showVistaTabla(false);
    textoForm.innerHTML = "(ALTA ELEMENTO)";
    console.log("Agregando elemento...");
});

function agregarElemento() {
    //mostrar únicamente los campos correspondientes al tipo de elemento que se está insertando.
}

btnAceptar.addEventListener("click", function (e) {
    /*
    Al  hacer  Click  en  "Aceptar",  bloquear  la  pantalla  con  el  contenedor  "Spinner",  y  realizar  la  solicitud  al  API  sobre  el  endpoint 
PersonasFutbolistasProfesionales.php,  con  el  Verbo  PUT,  con  encabezado  Content-Type  de  valor  application/json  y  cuerpo  un 
string de objeto JSON que representa los atributos del elemento a insertar SIN el ID.
    */
    e.preventDefault();
    spinner.classList.remove('hidden');

});


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
            <td class="col-anioGraduacion">${'anioGraduacion' in persona ? persona.anioGraduacion : '-'}</td>
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


/// (!)   TENGO QUE TOMAR SI SE SUBE UN ELEMENTO PERSONA O PROFESIONAL, LUEGO EL PULL:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

btnAceptar.addEventListener("click", async function (e) {
    e.preventDefault();

    // Mostrar el spinner
    showSpinner(true);

    // Crear el objeto con los datos del formulario (sin el ID)
    const nuevoElemento = {
        nombre: document.getElementById("input-nombre").value,
        apellido: document.getElementById("input-apellido").value,
        edad: parseInt(document.getElementById("input-edad").value),
        equipo: document.getElementById("input-equipo").value,
        posicion: document.getElementById("input-posicion").value,
        cantidadGoles: parseInt(document.getElementById("input-cantGoles").value),
        titulo: document.getElementById("input-tituloUni").value,
        facultad: document.getElementById("input-facultad").value,
        anioGraduacion: parseInt(document.getElementById("input-anioGrad").value),
    };

    try {
        // Enviar los datos al servidor con PUT
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoElemento), // Convertir el objeto a JSON
        });

        if (response.status === 200) {
            const elementoGuardado = await response.json(); // Recibir el objeto con el ID generado
            console.log("Elemento agregado:", elementoGuardado);

            // Actualizar el array local con el nuevo elemento
            arrayPersonas.push(elementoGuardado);

            // Volver a mostrar la tabla actualizada
            mostrarTablaPersonas(arrayPersonas);
            showVistaTabla(true); // Mostrar la tabla
        } else {
            alert("Error al agregar el elemento. Código de respuesta: " + response.status);
        }
    } catch (error) {
        alert("Error al conectar con la API: " + error.message);
    } finally {
        // Ocultar el spinner
        showSpinner(false);
    }
});


function inicializarApp() {
    console.log("Inicializando la aplicación con los datos:", arrayPersonas);
    mostrarTablaPersonas(arrayPersonas);
}