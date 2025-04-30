const containerTabla = document.querySelector('.container-tabla');
const btnAgregar = document.getElementById("btnAgregar");
const containerForm = document.querySelector('.container-form');
const textoForm = document.getElementById("texto-form")
const btnAceptarForm = document.getElementById("btnAceptarForm");
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



//    ************* OBTENER DATA DE LA API *************
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
//    ************* FIN OBTENER DATA DE LA API *************



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
    constructor(id, nombre, apellido, edad, equipo, posicion, cantidadGoles) {
        super(id, nombre, apellido, edad);
        this.equipo = equipo;
        this.posicion = posicion;
        this.cantidadGoles = cantidadGoles;
    }

    toString() {
        return `$ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Equipo: ${this.equipo}, Posición: ${this.posicion}, cantidadGoles: ${this.cantidadGoles}`;
    }
}


class Profesional extends Persona {
    constructor(id, nombre, apellido, edad, titulo, facultad, añoGraduacion) {
        super(id, nombre, apellido, edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.añoGraduacion = añoGraduacion;
    }
    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Título: ${this.titulo}, Facultad: ${this.facultad}, Graduación: ${this.añoGraduacion}`;
    }
}

// --
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
// --


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

    btnAceptar.classList.remove('hidden');
    btnAceptarForm.classList.add('hidden');
    showVistaTabla(false);
    textoForm.innerHTML = "(ALTA ELEMENTO " + tipoPersona + ")";
    console.log("Agregando elemento...");
    console.log("Tipo de elemento:", tipoPersona);
});
//    ************* FIN AGREGAR ELEMENTO *************


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
//  ************* FIN MOSTRAR TABLA *************


// ************* AGREGAR ELEMENTO *************
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
        const response = await fetch(url, {
            method: "POST",
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
            arrayPersonas.push({...nuevoElemento, id: elementoGuardado.id}); // agrego el id que me devuelve la API y lo agrego a la nueva persona
            console.log("Nuevo array de personas:", arrayPersonas);
            
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
// ************* FIN AGREGAR ELEMENTO *************

// ************* ELIMINAR ELEMENTO *************
btnCancelar.addEventListener("click", function () {
    limpiarInputs();
    showVistaTabla(true);
});
// ************* FIN ELIMINAR ELEMENTO *************

// ************* MODIFICAR ELEMENTO *************
// Agregar el evento al contenedor de la tabla (delegación de eventos)
cuerpo.addEventListener("click", function (e) {
    // Verificar si el clic fue en un botón "Modificar"
    if (e.target && e.target.id === "btnModificar") {
        // Obtener la fila donde se hizo clic
        const fila = e.target.closest("tr");

        btnAceptar.classList.add('hidden');
        btnAceptarForm.classList.remove('hidden');

        // Obtener los datos de las celdas de la fila
        const id = fila.querySelector(".col-id").textContent.trim();
        const nombre = fila.querySelector(".col-nombre").textContent.trim();
        const apellido = fila.querySelector(".col-apellido").textContent.trim();
        const edad = fila.querySelector(".col-edad").textContent.trim();
        const equipo = fila.querySelector(".col-equipo").textContent.trim();
        const posicion = fila.querySelector(".col-posicion").textContent.trim();
        const cantidadGoles = fila.querySelector(".col-cantGoles").textContent.trim();
        const titulo = fila.querySelector(".col-titulo").textContent.trim();
        const facultad = fila.querySelector(".col-facultad").textContent.trim();
        const añoGraduacion = fila.querySelector(".col-añoGraduacion").textContent.trim();

        // Función para asignar valores y deshabilitar si están vacíos
        const setInputValue = (inputId, value) => {
            const input = document.getElementById(inputId);
            if (input) {
                input.value = value !== "-" ? value : "";
                if (value === "-") {
                    input.disabled = true; // Deshabilitar el input si el valor es "-"
                    // input.classList.add('hidden');
                } else {
                    input.disabled = false; // Habilitar el input si tiene un valor válido
                }
            } else {
                console.error(`El input con ID "${inputId}" no existe en el DOM`);
            }
        };

        setInputValue('input-id', id);
        setInputValue('input-nombre', nombre);
        setInputValue('input-apellido', apellido);
        setInputValue('input-edad', edad);
        setInputValue('input-equipo', equipo);
        setInputValue('input-posicion', posicion);
        setInputValue('input-cantGoles', cantidadGoles);
        setInputValue('input-tituloUni', titulo);
        setInputValue('input-facultad', facultad);
        setInputValue('input-anioGrad', añoGraduacion);


        textoForm.innerHTML = "(MODIFICAR ELEMENTO)";
        showVistaTabla(false);

        // Guardar el ID del elemento que se está modificando (puedes usar un atributo oculto o una variable global)
        btnAceptarForm.setAttribute("data-id-modificar", id);
    }
});

btnAceptarForm.addEventListener("click", async function (e) {
    e.preventDefault();
    showSpinner(true);

    // Obtener el ID del elemento que se está modificando
    const idModificar = btnAceptarForm.getAttribute("data-id-modificar");

    // Crear el objeto con los datos actuales de los inputs
    const elementoModificado = {
        nombre: inputNombre.value.trim(),
        apellido: inputApellido.value.trim(),
        edad: parseInt(inputEdad.value),
        equipo: inputEquipo.value.trim(),
        posicion: inputPosicion.value.trim(),
        cantidadGoles: parseInt(inputCantGoles.value),
        titulo: inputTituloUni.value.trim(),
        facultad: inputFacultad.value.trim(),
        anioGraduacion: parseInt(inputAnioGradu.value)
    };

    // Eliminar claves con valores inválidos (sino me iba a guardar las claves vacias)
    Object.keys(elementoModificado).forEach(key => {
        if (!elementoModificado[key] && elementoModificado[key] !== 0) {
            delete elementoModificado[key];
        }
    });

    console.log("Modificando el elemento con ID:", idModificar);
    console.log("Datos enviados al servidor:", elementoModificado);
    showSpinner(false);


    ///     (!)       ACA TENGO QUE PONER LA CONECEXION A LA API PARA ACTUALIZARLO.
});
// ************* FIN MODIFICAR ELEMENTO *************





obtenerDatos();

function inicializarApp() {
    console.log("Inicializando la aplicación con los datos:", arrayPersonas);
    mostrarTablaPersonas(arrayPersonas);
}