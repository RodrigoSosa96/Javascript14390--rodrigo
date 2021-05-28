//Tienda de bebidas con carrito y articulos en stock actualizables
/*
Se crean elementos desde el storage, no desde datos, para asi mantener los articulos nuevos que agrego
El stock se mantiene con localstorage para saber qué se fue comprando
Estilos basicos, pero por ahora funcionales para esta entrega

*/

let idNuevo = 1//id base para nuevos articulos
let idcheck = 100
class articulo{
    constructor(datos) {
        this.id = idNuevo++;
        this.categoria = datos.categoria;
        this.marca = datos.marca;
        this.features = datos.features
        this.precio = parseInt(datos.precio);
        this.stock = parseInt(datos.stock);
    }
    //comprobar stock
    vendido(){
            this.stock = this.stock - 1
    }

    aplicarDescuento(descuento) {
        this.precio = this.precio - (this.precio * (descuento / 100))
    }
    sumarIva(){
        this.precio = this.precio + (this.precio * 0.21);
    }
    restarDescuento(){
        this.precio = this.precio - (this.descuento * this.precio);
    }

}

//-----Datos a Storage y luego por el generador para mantener articulos generados
//Primero chequea si hay determinada llave en el storage
function checkStorage (key) {
    if (key in localStorage) {
        console.log("si")


    }else {
        console.log("no")
        makeStorage(datos)
    }
}
checkStorage('listaProductos')

//Paso los datos al storage en caso de no estar ya guardado
//Se reutiliza para actualizar datos
function makeStorage(key) {
    datosJSON = JSON.stringify(key)
    localStorage.setItem("listaProductos", datosJSON)
}

//Parseo de datos
const datosParse = JSON.parse(localStorage.getItem('listaProductos'))
const datosArmados = []
for(let e of datosParse) {
    datosArmados.push(new articulo(e))
}
console.table(datosArmados)//test


///--------Generadores de HTML
//Generar opciones en select
function generarOpciones(){
    let padre = document.getElementById("categoriaProducto");
    let inner = "";
    for (const elemento of categoria) {
    inner += `<option value="${elemento}">${elemento}</option>`;
    }
    padre.innerHTML = inner;
}
generarOpciones()
//Generador de articulos
const pref = "productoID"
let contenedorPadre = document.getElementById("listaProductos")
for(let dato of datosArmados) {
    crearElemento(dato)
}
function crearElemento(dato){
    let nuevoElemento   = document.createElement("div")
    nuevoElemento.id    =pref + dato.id
    nuevoElemento.innerHTML =   
                                `<div class="items">
                                <p>Categoría: ${dato.categoria}</p>
                                <p>Marca: ${dato.marca}</p>
                                <p>Características: ${dato.features}</p>
                                <p>Precio: $ ${dato.precio}</p>
                                <p id=stock${dato.id} >Stock: ${dato.stock} unidades</p>
                                <button id=${dato.id}>Agregar</button>
                                </div>
                                `
    contenedorPadre.appendChild(nuevoElemento)
    let boton = document.getElementById(dato.id)
    boton.onclick = () => {       //Con cada click se actualiza el stock y en caso de no haber más, se bloquea el botón.
        
        if(dato.stock >= 1) {
            carrito(dato.id)
            
            console.log("PRODUCTO VENDIDO" + dato.id);
            dato.vendido()  
            document.getElementById('stock'+dato.id).innerHTML = `Stock: ${dato.stock} unidades`
            
            
        } else {
            console.log("No hay stock")
            document.getElementById(dato.id).disabled = true;
        }

    };
}

//Agregar elementos a los articulos
function guardarTarea(){
    let nuevoRegistro = {
        id            : datosArmados.length + 1,
        categoria     : document.getElementById("categoriaProducto").value,
        marca         : document.getElementById("marcaProducto").value,
        features      : document.getElementById("featuresProducto").value,
        precio        : document.getElementById("precioProducto").value,
        stock         : document.getElementById("stockProducto").value
    }
    datosArmados.push(new articulo(nuevoRegistro));
    let ultimoPush = datosArmados.length - 1
    crearElemento(datosArmados[ultimoPush])
    makeStorage(datosArmados)
    //filtrarEvento();
}




//Generar Carrito(modificar)
const carritoStorage = []
function carrito(ids){
    item = busqueda(ids)
    console.log(item)
    carritoStorage.push(item)
    carritoJSON = JSON.stringify(carritoStorage)
    let body = document.getElementById("tablaCarrito").children[1];
    let inner = "";
    for (const e of item) {
        inner += `<tr><td>${e.categoria}</td><td>${e.marca}</td><td>${e.features}</td><td>${e.stock}</td><td>${e.precio}</td></tr>`;
    }
    body.innerHTML = inner;

}












function clearAll() {
    localStorage.clear();
    location.reload();
}


window.onload = () => {
    // SECCION DE ASOCIACIÓN DE EVENTOS EN ONLOAD ASI NOS ASEGURAMOS DE ASOCIAL UNA VEZ QUE EL DOM ESTA LISTO
    document.getElementById("submitBtn").onclick =  guardarTarea;
    document.getElementById("resetBtn").onclick = clearAll;
    document.getElementById("")
}

//Inicialización







function busqueda(id) {
    return datosArmados.find(producto => producto.id === id); 
}

