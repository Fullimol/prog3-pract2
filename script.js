const containerTabla = document.querySelector('.container-tabla');
const btnAgregar = document.getElementById("btnAgregar");
const containerForm = document.querySelector('.container-form');
const textoForm = document.getElementById("texto-form");
const btnAceptarCambio = document.getElementById("btnAceptarCambio");
const btnAceptarNuevo = document.getElementById("btnAceptarNuevo");
const btnAceptarEliminar = document.getElementById("btnAceptarEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const spinner = document.getElementById("spinner");
const tabla = document.getElementById('tablaPersonas');
let cuerpo = tabla.querySelector('tbody');
const formulario = document.getElementById("formulario");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");

const inputId = document.getElementById("input-id");
const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const inputEdad = document.getElementById("input-edad");
const inputEquipo = document.getElementById("input-equipo");
const inputPosicion = document.getElementById("input-posicion");
const inputCantGoles = document.getElementById("input-cantGoles");
const inputTituloUni = document.getElementById("input-tituloUni");
const inputFacultad = document.getElementById("input-facultad");
const inputAnioGradu = document.getElementById("input-anioGrad");

const labelFutbolista = document.getElementById('label-futbolista');
const labelProfesional = document.getElementById('label-profesional');



//    ************* OBTENER DATA DE LA API *************
const url = "https://examenesutn.vercel.app/api/PersonasFutbolistasProfesionales"
let arrayPersonas = [];
obtenerDatos();


async function obtenerDatos() {
    try {
        showSpinner(true);
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            instanciarPersonas(data);
            console.log("Datos cargados:", arrayPersonas);
            mostrarTablaPersonas(arrayPersonas);
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

    // Habilitar todos los campos
    inputNombre.disabled = false;
    inputApellido.disabled = false;
    inputEdad.disabled = false;
    inputEquipo.disabled = false;
    inputPosicion.disabled = false;
    inputCantGoles.disabled = false;
    inputTituloUni.disabled = false;
    inputFacultad.disabled = false;
    inputAnioGradu.disabled = false;

    labelFutbolista.classList.remove('hidden');
    labelProfesional.classList.remove('hidden');
}

// Función para asignar valores a los inputs y deshabilitar si están vacíos
function setInputValue(inputId, value) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = value !== "N/A" ? value : "";
        if (value === "N/A") {
            input.disabled = true; // Deshabilitar el input si el valor es "N/A"
            // input.classList.add('hidden');
        } else {
            input.disabled = false; // Habilitar el input si tiene un valor válido
        }
    } else {
        console.error(`El input con ID "${inputId}" no existe en el DOM`);
    }
};
// --

btnCancelar.addEventListener("click", function () {
    limpiarInputs();
    showVistaTabla(true);
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
            <td class="col-equipo">${'equipo' in persona ? persona.equipo : 'N/A'}</td>
            <td class="col-posicion">${'posicion' in persona ? persona.posicion : 'N/A'}</td>
            <td class="col-cantGoles">${'cantidadGoles' in persona ? persona.cantidadGoles : 'N/A'}</td>
            <td class="col-titulo">${'titulo' in persona ? persona.titulo : 'N/A'}</td>
            <td class="col-facultad">${'facultad' in persona ? persona.facultad : 'N/A'}</td>
            <td class="col-añoGraduacion">${'añoGraduacion' in persona ? persona.añoGraduacion : 'N/A'}</td>
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



//    ************* AGREGAR ELEMENTO *************
btnAgregar.addEventListener("click", function () {
    let tipoPersonaPromt = prompt("¿Qué tipo de elemento desea agregar? (futbolista/profesional)").toLowerCase();
    if (tipoPersonaPromt === "futbolista") {
        labelProfesional.classList.add('hidden');
        // Guardar el tipo de persona en un atributo del botón "Alta"
        btnAceptarNuevo.setAttribute('data-tipo-persona', 'futbolista');
    } else if (tipoPersonaPromt === "profesional") {
        labelFutbolista.classList.add('hidden');
        // Guardar el tipo de persona en un atributo del botón "Alta"
        btnAceptarNuevo.setAttribute('data-tipo-persona', 'profesional');
    } else {
        alert("Tipo de persona no válido. Por favor, elija 'Futbolista' o 'Profesional'.");
        btnAgregar.classList.remove('hidden');
        return;
    }

    btnAceptarNuevo.classList.remove('hidden');
    btnAceptarEliminar.classList.add('hidden');
    btnAceptarCambio.classList.add('hidden');
    showVistaTabla(false);
    textoForm.innerHTML = "(ALTA ELEMENTO " + tipoPersonaPromt + ")";
    console.log("Agregando elemento...");
    console.log("Tipo de elemento:", tipoPersonaPromt);
});

btnAceptarNuevo.addEventListener("click", async function (e) {
    e.preventDefault();
    showSpinner(true);
    const tipoElemento = btnAceptarNuevo.getAttribute("data-tipo-persona");

    // Crear el objeto con los datos del formulario
    let nuevoElemento = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        edad: parseInt(inputEdad.value),
        equipo: inputEquipo.value,
        posicion: inputPosicion.value,
        cantidadGoles: parseInt(inputCantGoles.value),
        titulo: inputTituloUni.value,
        facultad: inputFacultad.value,
        añoGraduacion: parseInt(inputAnioGradu.value),
    };

    //  eliminar claves con valores inválidos (para evitar guardar vacíos, osea el tipo de persona que NO esta seleccionado)
    Object.keys(nuevoElemento).forEach(key => {
        if (!nuevoElemento[key] && nuevoElemento[key] !== 0) {
            delete nuevoElemento[key];
        }
    });

    //*** VALIDACION de los inputs */
    let errores = [];
    if (!inputNombre.value) errores.push("El nombre es obligatorio.");
    if (!inputApellido.value) errores.push("El apellido es obligatorio.");
    if (inputEdad.value === "") {
        errores.push("La edad no puede estar vacía.");
    } else if (isNaN(inputEdad.value) || inputEdad.value <= 15) {
        errores.push("La edad debe ser un número mayot a 15");
    }
    if (tipoElemento === "futbolista") {
        if (!inputEquipo.value.trim()) errores.push("El equipo es obligatorio para futbolistas.");
        if (!inputPosicion.value.trim()) errores.push("La posición es obligatoria para futbolistas.");
        if (inputCantGoles.value.trim() === "") {
            errores.push("Los goles no pueden estar vacíos.");
        } else if (isNaN(inputCantGoles.value) || inputCantGoles.value < 0) {
            errores.push("Los goles deben ser un número mayor o igual a 0.");
        }
    }
    if (tipoElemento === "profesional") {
        if (!inputTituloUni.value.trim()) errores.push("El título es obligatorio para profesionales.");
        if (!inputFacultad.value.trim()) errores.push("La facultad es obligatoria para profesionales.");
        if (inputAnioGradu.value.trim() === "") {
            errores.push("El año de graduación no puede estar vacío.");
        } else if (isNaN(inputAnioGradu.value) || inputAnioGradu.value < 1950) {
            errores.push("El año de graduación debe ser válido y mayor a 1950.");
        }
    }

    console.log("Objeto a crear:", nuevoElemento);

    if (errores.length > 0) {
        alert("ERRORES ENCONTRADOS:\n" + errores.join("\n"));
        showSpinner(false);
        return;
    } else {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoElemento), // Convertir el objeto a JSON

            });
            console.log("Validacion exitosa. OBJETO A ENVIAR!!!!:", nuevoElemento);


            if (response.status === 200) {
                const elementoGuardado = await response.json(); // Recibir el objeto con el ID generado
                console.log("Elemento agregado:", elementoGuardado);

                // Actualizar el array local con el nuevo elemento
                arrayPersonas.push({ ...nuevoElemento, id: elementoGuardado.id }); // agrego el id que me devuelve la API y lo agrego a la nueva persona
                console.log("Nuevo array de personas:", arrayPersonas);

                mostrarTablaPersonas(arrayPersonas);
                showVistaTabla(true);
                limpiarInputs();
            } else {
                const errorText = await response.text();
                alert("Error al agregar el elemento. Código de respuesta: " + response.status + "\n" + errorText);
            }
        } catch (error) {
            alert("Error al conectar con la API: " + error.message);
        } finally {
            labelProfesional.classList.remove('hidden');
            labelFutbolista.classList.remove('hidden');
            showSpinner(false);
        }
    }
});
// ************* FIN AGREGAR ELEMENTO *************



/*
Agregar el evento al contenedor de la tabla (delegación de eventos)    (!)    (!)    (!)    (!)
(con esto evito agregar el evento a cada botón de cada fila de la tabla y tomo el evento con los datos de la fila)
*/
cuerpo.addEventListener("click", function (e) {
    // Verificar si el clic fue en un botón "Modificar" o "Eliminar"
    if (e.target && e.target.id === "btnModificar") {
        modificarElemento(e);
    } else if (e.target && e.target.id === "btnEliminar") {
        eliminarElemento(e);
    }
});

// ************* MODIFICAR ELEMENTO *************
function modificarElemento(e) {
    // Obtener la fila donde se hizo clic
    const fila = e.target.closest("tr");

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

    btnAceptarNuevo.classList.add('hidden');
    btnAceptarEliminar.classList.add('hidden');
    btnAceptarCambio.classList.remove('hidden');
    textoForm.innerHTML = "(MODIFICAR ELEMENTO)";
    showVistaTabla(false);

    // Guardar el ID del elemento que se está modificando (puedes usar un atributo oculto o una variable global)
    btnAceptarCambio.setAttribute("data-id-modificar", id);
}

btnAceptarCambio.addEventListener("click", async function (e) {
    e.preventDefault();
    showSpinner(true);

    // Obtener el ID del elemento que se está modificando
    const idModificar = btnAceptarCambio.getAttribute("data-id-modificar");
    console.log("Modificando el elemento con ID:", idModificar);

    // Crear el objeto con los datos actuales de los inputs
    const elementoModificado = {
        id: inputId.value.trim(),
        nombre: inputNombre.value.trim(),
        apellido: inputApellido.value.trim(),
        edad: parseInt(inputEdad.value),
        equipo: inputEquipo.value.trim(),
        posicion: inputPosicion.value.trim(),
        cantidadGoles: parseInt(inputCantGoles.value),
        titulo: inputTituloUni.value.trim(),
        facultad: inputFacultad.value.trim(),
        añoGraduacion: parseInt(inputAnioGradu.value)
    };

    //  eliminar claves con valores inválidos (para evitar guardar vacíos)
    Object.keys(elementoModificado).forEach(key => {
        if (!elementoModificado[key] && elementoModificado[key] !== 0) {
            delete elementoModificado[key];
        }
    });


    //*** VALIDACION de los inputs */
    let errores = [];
    if (!inputNombre.value) errores.push("El nombre es obligatorio.");
    if (!inputApellido.value) errores.push("El apellido es obligatorio.");
    if (inputEdad.value === "") {
        errores.push("La edad no puede estar vacía.");
    } else if (isNaN(inputEdad.value) || inputEdad.value < 15) {
        errores.push("La edad debe ser un número mayot a 15");
    }
    // Validaciones específicas para futbolista
    if (inputEquipo.value || inputPosicion.value || inputCantGoles.value) {
        if (!inputEquipo.value) errores.push("El equipo es obligatorio para futbolistas.");
        if (!inputPosicion.value) errores.push("La posición es obligatoria para futbolistas.");

        if (inputCantGoles.value === "") {
            errores.push("Los goles no pueden estar vacíos.");
        } else if (isNaN(inputCantGoles.value) || inputCantGoles.value < 0) {
            errores.push("Los goles deben ser un número mayor o igual a 0.");
        }
    }
    // Validaciones específicas para profesional
    if (inputTituloUni.value || inputFacultad.value || inputAnioGradu.value) {
        if (!inputTituloUni.value) errores.push("El título es obligatorio para profesionales.");
        if (!inputFacultad.value) errores.push("La facultad es obligatoria para profesionales.");
        if (isNaN(inputAnioGradu.value) || inputAnioGradu.value < 1900 || inputAnioGradu.value > new Date().getFullYear()) {
            errores.push("El año de graduación debe ser válido.");
        }
    }


    if (errores.length > 0) {
        alert("Errores encontrados:\n" + errores.join("\n"));
        showSpinner(false);
        return;
    } else {
        try {
            console.log("Validacion exitosa. Datos enviados al servidor:", elementoModificado);
            const response = await fetch(url, {
                // Sabe que persona modificar porque lee la clave id de mi "elementoModificado"
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(elementoModificado),
            });


            if (response.status === 200) {
                const elementoActualizado = await response.text(); // Recibir el objeto actualizado
                console.log("Elemento modificado:", elementoActualizado);

                // Actualizar el array local con el nuevo elemento
                const index = arrayPersonas.findIndex(persona => persona.id == idModificar);
                if (index !== -1) {
                    arrayPersonas[index] = { ...arrayPersonas[index], ...elementoModificado }; // Actualizar el objeto en el array
                    console.log("Nuevo array de personas:", arrayPersonas);
                    mostrarTablaPersonas(arrayPersonas);
                    showVistaTabla(true);
                    limpiarInputs();
                } else {
                    alert("Elemento no encontrado en el array local.");
                }
            } else {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                alert("Error al modificar el elemento. Código de respuesta: " + response.status + "\n" + errorText);
                showVistaTabla(true);
            }
        } catch (error) {
            alert("Error al conectar con la API: " + error.message);
        } finally {
            showSpinner(false);
        }
    }
});
// ************* FIN MODIFICAR ELEMENTO *************



// ************* ELIMINAR ELEMENTO *************
function eliminarElemento(e) {
    // Obtener la fila donde se hizo clic
    const fila = e.target.closest("tr");

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

    inputNombre.disabled = true;
    inputApellido.disabled = true;
    inputEdad.disabled = true;
    inputEquipo.disabled = true;
    inputPosicion.disabled = true;
    inputCantGoles.disabled = true;
    inputTituloUni.disabled = true;
    inputFacultad.disabled = true;
    inputAnioGradu.disabled = true;


    btnAceptarEliminar.classList.remove('hidden');
    btnAceptarNuevo.classList.add('hidden');
    btnAceptarCambio.classList.add('hidden');
    textoForm.innerHTML = "(ELIMINAR ELEMENTO) ID: " + id;
    showVistaTabla(false);

    // Guardar el ID del elemento que se está Eliminando (puedes usar un atributo oculto o una variable global)
    btnAceptarEliminar.setAttribute("data-id-eliminar", id);
}

btnAceptarEliminar.addEventListener("click", async function (e) {
    e.preventDefault();
    showSpinner(true);

    // Obtener el ID del elemento que se está eliminando
    const idEliminar = btnAceptarEliminar.getAttribute("data-id-eliminar");

    console.log("Eliminando el elemento con ID:", idEliminar);

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: idEliminar }), // Convertir el objeto a JSON
        });

        if (response.status === 200) {
            console.log("Elemento eliminado con éxito.");

            // Actualizar el array local eliminando el elemento
            arrayPersonas = arrayPersonas.filter(persona => persona.id != idEliminar); // Filtrar el array para eliminar el elemento
            console.log("Nuevo array de personas:", arrayPersonas);
            mostrarTablaPersonas(arrayPersonas);
            showVistaTabla(true);
            limpiarInputs();
        } else {
            const errorText = await response.text();
            alert("Error al eliminar el elemento. Código de respuesta: " + response.status + "\n" + errorText);
        }
    } catch (error) {
        alert("Error al conectar con la API: " + error.message);
    } finally {
        btnAceptarEliminar.classList.add('hidden');
        showSpinner(false);
    }
});
// ************* FIN ELIMINAR ELEMENTO *************