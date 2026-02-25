// Punto bonus - integracion de todos los temas del taller
// usamos los productos del punto 3 y la funcion constructora del punto 4

console.log("========================================");
console.log("\nPUNTO BONUS: INTEGRACIÓN DE TEMAS\n");


// productos de la tienda (mismo array del punto 3)
let productosBonus = [
    { nombre: "Laptop HP 15", precio: 1500000, categoria: "computadores", stock: 10, disponible: true },
    { nombre: "Samsung Galaxy S23", precio: 3200000, categoria: "celulares", stock: 10, disponible: true },
    { nombre: "Teclado mecanico", precio: 450000, categoria: "accesorios", stock: 10, disponible: true },
    { nombre: "Audifonos inalambricos", precio: 250000, categoria: "accesorios", stock: 10, disponible: true },
    { nombre: "Laptop Lenovo", precio: 1500000, categoria: "computadores", stock: 10, disponible: true },
    { nombre: "Pc gamer", precio: 2500000, categoria: "computadores", stock: 10, disponible: true },
    { nombre: "Tablet", precio: 800000, categoria: "celulares", stock: 10, disponible: true },
    { nombre: "Iphone 15", precio: 4500000, categoria: "celulares", stock: 10, disponible: true },
    { nombre: "Xiaomi redmi note 10", precio: 950000, categoria: "celulares", stock: 10, disponible: true },
    { nombre: "Reloj smart", precio: 600000, categoria: "accesorios", stock: 0, disponible: false },
];

// funcion constructora del curso (punto 4)
// recibe nombre del curso, codigo y creditos
function CursoBonus(nombre, codigo, creditos) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.creditos = creditos;
    this.inscritos = []; // aqui guardamos los clientes inscritos
}

// inscribe un cliente al array de inscritos
CursoBonus.prototype.inscribirCliente = function (cliente) {
    this.inscritos.push(cliente);
};

// retorna solo los nombres de los inscritos
CursoBonus.prototype.obtenerListado = function () {
    return this.inscritos.map(function (c) {
        return c.nombre;
    });
};

// filtra los que aprobaron con nota mayor o igual a 3.5
CursoBonus.prototype.clientesAprobados = function () {
    return this.inscritos.filter(function (c) {
        return c.nota >= 3.5;
    });
};

// calcula el promedio de notas de todos los inscritos
CursoBonus.prototype.calcularPromedioGrupo = function () {
    let suma = 0;
    for (let i = 0; i < this.inscritos.length; i++) {
        suma += this.inscritos[i].nota;
    }
    return suma / this.inscritos.length;
};

// encuentra el cliente con la nota mas alta
CursoBonus.prototype.clienteDestacado = function () {
    let mejor = this.inscritos[0];
    for (let i = 1; i < this.inscritos.length; i++) {
        if (this.inscritos[i].nota > mejor.nota) {
            mejor = this.inscritos[i];
        }
    }
    return mejor;
};

// clientes que se van a inscribir al curso de capacitacion
// cada uno tiene nombre, nota de la evaluacion y el producto que mas le intereso
const clientesBonus = [
    { nombre: "Juan Jose", nota: 4.5, productoFavorito: "Laptop HP 15" },
    { nombre: "Maria Lopez", nota: 3.2, productoFavorito: "Samsung Galaxy S23" },
    { nombre: "Carlos Meza", nota: 3.8, productoFavorito: "Pc gamer" },
    { nombre: "Laura Gomez", nota: 2.9, productoFavorito: "Audifonos inalambricos" },
    { nombre: "Pedro Suarez", nota: 4.0, productoFavorito: "Iphone 15" },
    { nombre: "Sofia Rios", nota: 3.5, productoFavorito: "Tablet" },
    { nombre: "Andres Diaz", nota: 1.8, productoFavorito: "Teclado mecanico" },
    { nombre: "Valentina Cruz", nota: 4.8, productoFavorito: "Laptop Lenovo" },
];

// creamos el curso de capacitacion
const cursoBonus = new CursoBonus("Capacitacion Tienda Tech", "CAP-101", 2);

// inscribimos a todos los clientes con un ciclo for
for (let i = 0; i < clientesBonus.length; i++) {
    cursoBonus.inscribirCliente(clientesBonus[i]);
}

// precio promedio del inventario usando reduce
const precioPromedioBonus = productosBonus.reduce(function (acc, p) {
    return acc + p.precio;
}, 0) / productosBonus.length;

// productos que estan disponibles
const disponiblesBonus = productosBonus.filter(function (p) {
    return p.disponible;
});

// resultados del curso
const aprobadosBonus = cursoBonus.clientesAprobados();
const reprobadosBonus = cursoBonus.inscritos.filter(function (c) {
    return c.nota < 3.5;
});
const promedioBonus = cursoBonus.calcularPromedioGrupo();
const destacadoBonus = cursoBonus.clienteDestacado();

// reporte final con template literals
const reporteBonus = `
=== REPORTE FINAL - ${cursoBonus.nombre} | Codigo: ${cursoBonus.codigo} ===

Inventario de la tienda:
  Total productos: ${productosBonus.length}
  Disponibles: ${disponiblesBonus.length}
  Precio promedio: $${precioPromedioBonus.toLocaleString("es-CO")}

Resultados del curso:
  Inscritos: ${cursoBonus.inscritos.length}
  Promedio del grupo: ${promedioBonus.toFixed(2)}

Aprobados (nota >= 3.5): ${aprobadosBonus.length}
${aprobadosBonus.map(function (c) {
    return `  ${c.nombre} - Nota: ${c.nota} - Le intereso: ${c.productoFavorito}`;
}).join("\n")}

Reprobados: ${reprobadosBonus.length}
${reprobadosBonus.map(function (c) {
    return `  ${c.nombre} - Nota: ${c.nota}`;
}).join("\n")}

Cliente destacado: ${destacadoBonus.nombre} con nota ${destacadoBonus.nota}
`;

console.log(reporteBonus);
