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
        this.select = false
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
    selected(){
        this.select = true
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
function generarOpcionesJQ () {
    for (const elemento of categoria) {
        $("#categoriaProducto").append(`<option value="${elemento}">${elemento}</option>`)}
}
generarOpcionesJQ()


//Generador de articulos



function crearElementoJQ(dato) {
    $("#listaProductos").append( `
                                <div class="prodID${dato.id}">
                                    <div class="items">
                                    <p>Categoría: ${dato.categoria}</p>
                                    <p>Marca: ${dato.marca}</p>
                                    <p>Características: ${dato.features}</p>
                                    <p>Precio: $ ${dato.precio}</p>
                                    <p id=stock${dato.id} >Stock: ${dato.stock} unidades</p>
                                    <button  id=${dato.id}>Agregar</button>
                                    </div>
                                    </div>
                                    `);

    //checkea el stock y lo actualiza
    $("#" + dato.id).click(()=> { dato.stock >=1 ?  //? cómo haría para que se desactive justo en 0, no un click despues?
        (dato.vendido(), carrito(dato.id),$("#stock"+dato.id).html(`Stock: ${dato.stock} unidades`)) :
        ($("#" + dato.id).prop("disabled", true),
        $("#" + dato.id).css({"background-color": "grey",
                            "color": "black",
                            "border": "1px solid black"})
        )
    }
    )
}

//?porqué no anda si lo escribo fuera? ahí lo puse directamente con el primero como ejemplo, pero ni as toma el click


for(let dato of datosArmados) {
    crearElementoJQ(dato)
}





//Agregar elementos a los articulos

//Required element como chequeo?

function nuevoProducto(){
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
    crearElementoJQ(datosArmados[ultimoPush])
    makeStorage(datosArmados)

    //filtrarEvento();
}



//Generar Carrito(modificar)
const carritoStorage = []
function carrito(ids){
    item = busqueda(ids)
    carritoStorage.push(item)

    carritoJSON = JSON.stringify(carritoStorage)
    sessionStorage.setItem("carrito", carritoJSON)

    let body = document.getElementById("tablaCarrito").children[1];
    let inner = "";
    for (const e of carritoStorage) {
        inner += `<tr><td>${e.categoria}</td><td>${e.marca}</td><td>${e.features}</td><td>${e.stock}</td><td>${e.precio}</td></tr>`;
    }
    body.innerHTML = inner;
    
}
//Honestamente StackOverflow
Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}
//Suma de carrito

//en jquery directamente reemplazo mas facil sin repetir al agregar elementos luego
let subTotal = carritoStorage.sum("precio")
let subTotalHTML = document.getElementById("totales")
function carritoPrecio () {
    let nuevoElemento = document.createElement("div")
    nuevoElemento.innerHTML = `
                                <p>Gracias por comprar con nosotros :)</p>
                                <p>Su total en : $${carritoStorage.sum("precio")}</p>

    `
    subTotalHTML.appendChild(nuevoElemento)

}






function clearAll() {
    localStorage.clear();
    location.reload();
}


window.onload = () => {
    document.getElementById("submitBtn").onclick =  nuevoProducto;
    document.getElementById("resetBtn").onclick = clearAll;
    document.getElementById("carritoComprar").onclick = carritoPrecio
}


function busqueda(id) {
    return datosArmados.find(producto => producto.id === id); 
}


//Animaciones jquery

$("#showCart").click(() => { 
    $("#toggleList").toggle("slow");
});

$(".container").fadeIn(2500, function() {
    $("h1").fadeIn(3500)
})


//Cómo hago para hacer un scroll al final del div?, pero que el final quede abajo de la ventana, no arriba
$('#submitBtn').click( function(e) { 
    $("html, body").animate({
        scrollTop: $("#listaProductos").get(0).scrollHeight
    }, 750);
} ).delay(2000).animate({
    scrollTop: $("#submitBtn").offset().top
}, 2000);




//Animamos sus propiedades CSS con animate
$("h1").fadeIn("fast")
$("svg").delay(2500).animate({  width: "380px", display: "block"}, 2000) //.mouseover(() => $("svg").animate({filter: "brightness(150%)"}))

