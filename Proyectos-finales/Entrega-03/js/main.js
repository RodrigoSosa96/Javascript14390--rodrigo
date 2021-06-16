//***Tienda de bebidas con carrito y articulos en stock actualizables***
/* 
    * Se crean elementos desde el storage, no desde datos, para asi mantener los articulos nuevos que agrego
    *El stock se mantiene con localstorage para saber qué se fue comprando
    *Se elige milligram como framework para css sobre bootstrap para mantener el proyecto ordenado mientras me enfoco más en la funcionalidad mientras 

    TODO: Debo agregar :
        *Age wall +18

        !Imagenes de cada bebida 
        (me olvidé de descargarlas :c)
            ver mas para ver información

        *Compra por efectivo o tarjeta
            checkear longitud tarjeta, separar cada 4
            CVV

        
        *calcular envio? (Para entrega final)



*/
const datosArmados = []
const apiKey= "$2b$10$N436g4d/8eI82cQnCZKRNeru8F/lrwBlQXjP9ZVGpx5rVJ37jF0kG"
const ajaxURL = "https://api.jsonbin.io/v3/b/60c84bb098ca6c704eb055fc"
const ajaxData = []


/*
    *Carga de ajax por medio de jsonbin.io
    Permite Agregar articulos como un administrador si se quiere, o directamente no usarlo y usar la tienda para compras
    ?Como podría hacer esto con $.get() o $.post() no se como enviarlo con la key y las cabeceras que debe tener
    ! enviar datos con cada venta? (metadatos mas adelante)
    !actualizar stock con cada vez que se toca el carrito? (mas adelante)
*/

//settings para GET y PUT (mas que nada por los headers y porque era disferente con la api que uso)
var settingsGET = {
    "async": true,
    "crossDomain": true,
    "url": ajaxURL+"/latest",
    "method": "GET",
    "headers": {
        "X-Master-Key": apiKey,
    },
    "data": {},
    "statusCode": {
        200: () => console.log("Success"),
        400: () => console.log("400 Bad Request"),
        401: () => console.log("401 Unauthorized"),
        403: () => console.log("403 Forbidden"),
        404: () => console.log("404 Not Found"),
    }
}
var settingsPUT = {
    "async": true,
    "crossDomain": true,
    "url": ajaxURL,

    "method": "PUT",
    "headers": {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey,
    },
    "data": datosArmados,
    "statusCode": {
        200: () => console.log("Success"),
        400: () => console.log("400 Bad Request"),
        401: () => console.log("401 Unauthorized"),
        403: () => console.log("403 Forbidden"),
        404: () => console.log("404 Not Found"),
    }
}
//!futuro para compras
const settingsVenta = {
    "async": true,
    "crossDomain": true,
    "url": ajaxURL,
    
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey,
        "X-Collection-Id" : "ventas",
        "X-Bin-Name" : "soldAt",
        
    },
    "data": ajaxData,
    "statusCode": {
        200: () => console.log("Success"),
        400: () => console.log("400 Bad Request"),
        401: () => console.log("401 Unauthorized"),
        403: () => console.log("403 Forbidden"),
        404: () => console.log("404 Not Found"),
    }
}

dataafuera = []


$.ajax(settingsGET).done(function (response) {
    console.log(response)
    datosAJAX = response

    if (response.record.length === 12) {
        console.log("Datos sin tocar")

    }else {
        console.log("Alguien cargo datos")
    }
    datosAJAX = response.record

    crearDatos(datosAJAX)
    for(let dato of datosArmados) {
        crearElemento(dato)
    }


    return datosAJAX
})





//*Parseo de datos

function crearDatos(data) {
    for(let e of data) {
        datosArmados.push(new articulo(e))
    }
    return console.table(datosArmados)//test

}







///--------Generadores de HTML
//Generar opciones en select
function generarOpciones () {
    for (const elemento of categoria) {
        $("#categoriaProducto").append(`<option value="${elemento}">${elemento}</option>`)}
}


//Generador de tarjetas en la página
function crearElemento(dato) {
    $("#listaProductos").append( `
                                <div class="prodID${dato.id}">
                                    <div class="items">
                                    <p>Categoría: ${dato.categoria}</p>
                                    <p>Marca: ${dato.marca}</p>
                                    <p>Características: ${dato.features}</p>
                                    <p>Precio: $ ${dato.precio}</p>
                                    <p id=stock${dato.id} >Stock: ${dato.stock} unidades</p>
                                    <button id=${dato.id}>Agregar</button>
                                    </div>
                                    </div>
                                    `);

    //*checkea el stock y lo actualiza
    //?porqué no anda si lo escribo fuera?
    $("#" + dato.id).click(()=> {
        if(dato.stock >=1) {
            dato.vendido(), carrito(dato.id)
            $("#stock"+dato.id)
                .html(`Stock: ${dato.stock} unidades`)
                .prop("disabled", dato.stock > 1 )
        }
        else {
            $("#" + dato.id).prop("disabled", dato.stock === 0) //! como hago para que se desactive en 0? probé de todo, pero siempre lo hace un click después
            $("#" + dato.id).css({  "background-color": "grey",
                                    "color": "black",
                                    "border": "1px solid black"})
        }
    }
    )
}



//*Agregar elementos a los articulos

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
    crearElemento(datosArmados[ultimoPush])
    //!makeStorage(datosArmados) //va a postear los datos
    //filtrarEvento();
}



/*
    *Generar Carrito(modificar)
    Checkeo de localstorage por si ya hay articulos almacenados


*/
const carritoStorage = []

//*----Checkea el carrito
function checkStorage (key) {
    if (key in localStorage) {
        console.log("Hay carrito")
    }else {
        console.log("No hay carrito")
        //makeStorage(datos)
    }
}
checkStorage('carrito')

//crea carrito
function makeStorage() {
    $.ajax(settingsPUT).done(function (response) {
        console.log(response)
    })
}

function carrito(ids){
    item = busqueda(ids)
    carritoStorage.push(item)

    carritoJSON = JSON.stringify(carritoStorage)
    localStorage.setItem("carrito", carritoJSON)

    let body = document.getElementById("tablaCarrito").children[1];
    let inner = "";
    for (const e of carritoStorage) {
        inner += `<tr><td>${e.categoria}</td><td>${e.marca}</td><td>${e.features}</td><td>${e.stock}</td><td>${e.precio}</td></tr>`;
    }
    body.innerHTML = inner;
    
}


//Honestamente StackOverflow para sumar arrays mas rápido 
Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}

//Suma de carrito
let subTotal = carritoStorage.sum("precio")

function carritoPrecio() {
    $("#totales").html(`<div>
                                <p>Gracias por comprar con nosotros :)</p>
                                <p>Su total en : $${carritoStorage.sum("precio")}</p>
                        </div>
    `
    )
}



function clearAll() {
    localStorage.clear();
    location.reload();
}


window.onload = () => {
    document.getElementById("submitBtn").onclick =  nuevoProducto;
    document.getElementById("resetBtn").onclick = clearAll;
    document.getElementById("carritoComprar").onclick = carritoPrecio;
}
generarOpciones()


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




