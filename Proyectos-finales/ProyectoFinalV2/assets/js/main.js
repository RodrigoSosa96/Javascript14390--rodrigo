//***   Tienda de bebidas con carrito y articulos en stock actualizables    ***
/* 
    *   Los articulos se cargan y actualizan desde jsonbin.io
    *   Decidí separarlo en 2 paginas en vez de un spa por cuestión de tiempo
    *   Tarjetas de articulos de Codepen
    TODO: Debo agregar :
        *Migración a Bootstrap
        *--Age wall +18
        !Imagenes de cada bebida 
            ver mas para ver información

        *Compra por efectivo o tarjeta
            checkear longitud tarjeta, separar cada 4
            CVV

        *calcular envio? (Para entrega final)



*/


//* Checkea si se agregaron datos desde admin
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

//Generador de tarjetas en la página
function crearElemento(dato) {
    $("#listaProductos").append( `
                                <div class="col-md-4 prodID${dato.id}">
                                    <div class="blog-card blog-card-blog">
                                        <div class="blog-card-image">
                                            <a href="#"> <img class="img" src=${dato.img}> </a>
                                            <div class="ripple-cont"></div>
                                        </div>
                                        <div class="blog-table">
                                            <h6 class="blog-category blog-text-success"><i class="fas fa-glass-whiskey"></i> ${dato.categoria}</h6>
                                            <h4 class="blog-card-caption">
                                                <a href="#">${dato.categoria} ${dato.marca}</a>
                                            </h4>
                                            <p class="blog-card-description">Características: ${dato.categoria}</p>
                                            <p class="blog-card-description">Precio $ ${dato.precio}</p>

                                            <div class="ftr">
                                                <button id=art${dato.id} type="button" class="btn btn-primary">Comprar</button>
                                                <div id=stock${dato.id} class="stats"> <i class="fas fa-clipboard-list"></i> Stock ${dato.stock} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `);

    //*checkea el stock y lo actualiza
    //?porqué no anda si lo escribo fuera?
    $("#art" + dato.id).click(()=> {
        if(dato.stock >=1) {
            dato.vendido(), carrito(dato.id)
            $("#stock"+dato.id)
                .html(` <i class="fas fa-clipboard-list"></i> Stock ${dato.stock} `)
                .prop("disabled", dato.stock > 1 )
        }
        else {
            $("#art" + dato.id).prop("disabled", dato.stock === 0) //! como hago para que se desactive en 0? probé de todo, pero siempre lo hace un click después
            $("#art" + dato.id).css({  "background-color": "grey",
                                    "color": "black",
                                    "border": "1px solid black"})
        }
    }
    )
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