const suma = [52, 54, 98, 54];
let resultado = suma[0] + suma[1] + suma[2]
const numeros = [1, 2, 3, 4, 5];
//for (let index = 0; index < 5; index++) {
    //alert(numeros[index]);//puede servir para mostrar lo que agregué
//}

const nombres    = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
const masculinos = nombres.slice(1, 3);



/*
//Declaraciòn de array vacío y variable para determinar cantidad
const listaNombres = [];
let   cantidad     = 5;
//Empleo de do...while para cargar nombres en el array por prompt()
do{
    let entrada = prompt("Ingresar nombre");
    listaNombres.push(entrada.toUpperCase());
    console.log(listaNombres.length);
}while(listaNombres.length != cantidad)
//Concatenamos un nuevo array de dos elementos
const nuevaLista = listaNombres.concat(["ANA","EMA"]);
//Salida con salto de línea usando join
alert(nuevaLista.join("\n"));
*/
const objeto1 = { id: 1, producto: "Arroz" };
const array   = [objeto1, { id: 2, producto: "Fideo" }];
array.push({ id: 3, producto: "Pan" });


const productos = [ { id: 1, producto: "Arroz" },
                    { id: 2,  producto: "Fideo" },
                    { id: 3,  producto: "Pan" }];



productos.push({ id: 4, producto: "vcerveasd" });

for (const producto of productos) {
    console.log(producto.id);
    console.log(producto.producto);
}