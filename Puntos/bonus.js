// ============================================================
// BONUS — Integración: Tienda Tech + Curso de Capacitación
// Taller de JavaScript — Construcción de Software III
// ============================================================
{

// ------------------------------------------------------------------
// Reutilizamos el inventario del Punto 3 y la entidad Curso del Punto 4
// ------------------------------------------------------------------

const inventario = [
    { nombre: "MacBook Pro 14",        precio: 8500000, categoria: "computadores", stock: 5 },
    { nombre: "iPhone 15 Pro",         precio: 4200000, categoria: "celulares",    stock: 12 },
    { nombre: "Dell XPS 15",           precio: 6200000, categoria: "computadores", stock: 3 },
    { nombre: "AirPods Pro",           precio: 980000,  categoria: "accesorios",   stock: 20 },
    { nombre: "iPad Air M2",           precio: 2900000, categoria: "celulares",    stock: 4 },
    { nombre: "Logitech MX Master 3",  precio: 520000,  categoria: "accesorios",   stock: 7 },
];

// ------------------------------------------------------------------
// Constructor ClienteCapacitacion
// Modela un cliente que asiste al curso de ventas de la tienda
// ------------------------------------------------------------------

function ClienteCapacitacion(nombre, apellido, evaluaciones) {
    this.nombre = nombre;
    this.apellido = apellido;
    // evaluaciones: array de { tema, calificacion }
    this.evaluaciones = evaluaciones;
}

ClienteCapacitacion.prototype.obtenerNombreCompleto = function () {
    return `${this.nombre} ${this.apellido}`;
};

ClienteCapacitacion.prototype.calcularPromedio = function () {
    const suma = this.evaluaciones.reduce((acc, e) => acc + e.calificacion, 0);
    return parseFloat((suma / this.evaluaciones.length).toFixed(2));
};

ClienteCapacitacion.prototype.estaAprobado = function () {
    return this.calcularPromedio() >= 3.5;
};

// ------------------------------------------------------------------
// Constructor CursoCapacitacion (como en Punto 4)
// ------------------------------------------------------------------

function CursoCapacitacion(nombre, codigo) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.inscritos = [];
}

CursoCapacitacion.prototype.inscribir = function (cliente) {
    this.inscritos.push(cliente);
};

CursoCapacitacion.prototype.aprobados = function () {
    return this.inscritos.filter(c => c.estaAprobado());
};

CursoCapacitacion.prototype.reprobados = function () {
    return this.inscritos.filter(c => !c.estaAprobado());
};

CursoCapacitacion.prototype.promedioGrupo = function () {
    const suma = this.inscritos.reduce((acc, c) => acc + c.calcularPromedio(), 0);
    return parseFloat((suma / this.inscritos.length).toFixed(2));
};

CursoCapacitacion.prototype.mejorEstudiante = function () {
    return this.inscritos.reduce((mejor, actual) =>
        actual.calcularPromedio() > mejor.calcularPromedio() ? actual : mejor
    );
};

// ------------------------------------------------------------------
// Creación de clientes y curso
// ------------------------------------------------------------------

const clientes = [
    new ClienteCapacitacion("Andrés", "Cárdenas", [
        { tema: "Tipos de productos",    calificacion: 4.5 },
        { tema: "Atención al cliente",   calificacion: 4.2 },
        { tema: "Proceso de venta",      calificacion: 3.9 },
    ]),
    new ClienteCapacitacion("Lucía", "Bermúdez", [
        { tema: "Tipos de productos",    calificacion: 3.2 },
        { tema: "Atención al cliente",   calificacion: 3.0 },
        { tema: "Proceso de venta",      calificacion: 2.8 },
    ]),
    new ClienteCapacitacion("Tomás", "Restrepo", [
        { tema: "Tipos de productos",    calificacion: 4.9 },
        { tema: "Atención al cliente",   calificacion: 4.7 },
        { tema: "Proceso de venta",      calificacion: 5.0 },
    ]),
    new ClienteCapacitacion("Sofía", "Vargas", [
        { tema: "Tipos de productos",    calificacion: 3.6 },
        { tema: "Atención al cliente",   calificacion: 3.8 },
        { tema: "Proceso de venta",      calificacion: 3.5 },
    ]),
    new ClienteCapacitacion("Martín", "Gutiérrez", [
        { tema: "Tipos de productos",    calificacion: 2.5 },
        { tema: "Atención al cliente",   calificacion: 3.0 },
        { tema: "Proceso de venta",      calificacion: 2.0 },
    ]),
];

const curso = new CursoCapacitacion("Ventas de Tecnología Premium", "VTP-001");
clientes.forEach(c => curso.inscribir(c));

// ------------------------------------------------------------------
// Análisis del inventario con métodos de array (Punto 3)
// ------------------------------------------------------------------

const productosDestacados = inventario
    .filter(p => p.precio > 3000000)                  // solo los premium
    .sort((a, b) => b.precio - a.precio)               // de mayor a menor precio
    .map(p => `${p.nombre} ($${p.precio.toLocaleString("es-CO")})`);

const valorInventarioPremium = inventario
    .filter(p => p.precio > 3000000)
    .reduce((acc, p) => acc + p.precio * p.stock, 0);

// ------------------------------------------------------------------
// Reporte final con template literals
// ------------------------------------------------------------------

const listaAprobados = curso.aprobados();
const listaReprobados = curso.reprobados();
const mejor = curso.mejorEstudiante();

const reporte = `
${"=".repeat(65)}
   REPORTE FINAL — TIENDA TECH COLOMBIA
   Curso: ${curso.nombre} (${curso.codigo})
${"=".repeat(65)}

 INVENTARIO PREMIUM (precio > $3.000.000):
${productosDestacados.map(p => `   • ${p}`).join("\n")}
   Valor total en inventario premium: $${valorInventarioPremium.toLocaleString("es-CO")}

 RESULTADOS DEL CURSO (${curso.inscritos.length} participantes):
${"─".repeat(55)}
${ curso.inscritos
    .map(c => `   ${c.obtenerNombreCompleto().padEnd(25)} Promedio: ${c.calcularPromedio().toFixed(2)}   ${c.estaAprobado() ? "APROBADO" : "REPROBADO"}`)
    .join("\n") }

 ESTADÍSTICAS GENERALES:
   Promedio del grupo : ${curso.promedioGrupo()}
   Aprobados          : ${listaAprobados.length} / ${curso.inscritos.length}
   Reprobados         : ${listaReprobados.length} / ${curso.inscritos.length}
   Mejor participante : ${mejor.obtenerNombreCompleto()} (${mejor.calcularPromedio().toFixed(2)})

 APROBADOS — Habilitados para vender:
${listaAprobados.map(c => `   ✓ ${c.obtenerNombreCompleto()}`).join("\n")}

 REPROBADOS — Requieren refuerzo:
${listaReprobados.map(c => `   ✗ ${c.obtenerNombreCompleto()}`).join("\n")}

${"=".repeat(65)}
 Generado automáticamente por el sistema de capacitación.
${"=".repeat(65)}
`;

console.log(reporte);

}
