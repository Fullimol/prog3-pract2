const containerTabla = document.querySelector('.container-tabla');
const btnAgregar = document.getElementById("btnAgregar");
const containerForm = document.querySelector('.container-form');
const textoForm = document.getElementById("texto-form")
const btnAceptar = document.getElementById("btnAceptar");
const btnCancelar = document.getElementById("btnCancelar");
const spinner = document.getElementById("spinner");

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