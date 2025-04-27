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