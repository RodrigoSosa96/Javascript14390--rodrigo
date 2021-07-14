//***   Tienda de bebidas con carrito y articulos en stock actualizables    ***
/* 
    *   Los articulos se cargan y actualizan desde jsonbin.io
    *   Decidí separarlo en 2 paginas en vez de un spa por cuestión de tiempo
    *   Tarjetas de articulos de Codepen
    TODO: Debo agregar :
        //Migración a Bootstrap
        //localStorage
            falta migrar animaciones a bootstrap
        !   Ordenar código
        *   Age wall +18
        //Imagenes de cada bebida 
        *   (Volver a agregar)Compra por efectivo o tarjeta
                checkear longitud tarjeta, separar cada 4
                CVV
        *Arreglar admin
            Seguir el total de todas las ventas con un nuevvo array en la api, o objeto en el mismo array?
            (... array)
        *fix:
            *Con cada venta se manda el array del carrito por get a una carpeta (collection) de los arrays para luego hacer un fetch un trabajar con todo (aun no se bien como)
*/


//* Checkea si se agregaron datos desde admin
$.ajax(settingsGET).done(function (response) {
    $('#loading-image').hide();
    console.log(response)
    datosAJAX = response

    if (response.record.length === 12) {
        console.log("Datos sin tocar")

    }else {
        console.log("Alguien cargo datos")
    }
    datosAJAX = response.record
    $('#opciones').show()
    crearDatos(datosAJAX)
    tarjetas()

    return datosAJAX
})

function tarjetas() {
    for(let dato of datosArmados) {
        crearElemento(dato)
    }
}


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
                                            <a href="#"> <img class="articulo-img" src=${dato.urlImg}> </a>
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
    $("#art" + dato.id).on('mouseup',()=> {
        if(dato.stock >=1) {
            dato.vendido()
            carrito(dato.id)
            $("#carritoComprar").prop('disabled', false)
            $("#CantTotal").html(`${carritoStorage.length}`)

            $("#stock"+dato.id)
                .html(` <i class="fas fa-clipboard-list"></i> Stock ${dato.stock} `)
                .prop("disabled", dato.stock > 1 )
        }
    }
    ).on('click', () => {
        let precio = carritoStorage.map(articulo => articulo.precio)
        let carSub = precio.reduce((a,b) => a+ b, 0)
        $("#subTotal").html(`${carSub}`)
        if(dato.stock === 0) {
            $("#art" + dato.id).prop("disabled", dato.stock === 0) //! 3 entregas para que se ponga 0 cuando debe
            $("#art" + dato.id).css({  "background-color": "grey",
                                    "color": "black",
                                    "border": "1px solid black"})
        }
    })
}



/*
    *Generar Carrito(modificar)
    Checkeo de localstorage por si ya hay articulos almacenados


*/


//Pre checkeo de carrito
function preCarrito() {
    if('carrito' in localStorage) {
        $("#carritoComprar").prop('disabled', false)
        const carritoParse = JSON.parse(localStorage.getItem('carrito'))
        for(let e of carritoParse) {
            carritoStorage.push(new articulo(e))
        }
        let precio = carritoStorage.map(articulo => articulo.precio)
        let carSub = precio.reduce((a,b) => a+ b, 0)
        $("#subTotal").html(`${carSub}`)
        
        crearCarrito()
    }
}
preCarrito()
function carrito(ids){
    item = datosArmados.find(producto => producto.id === ids)
    carritoStorage.push(item)
    carritoJSON = JSON.stringify(carritoStorage)
    localStorage.setItem("carrito", carritoJSON)    
    crearCarrito()
}

function crearCarrito() {
    let body = document.getElementById("tablaCarrito").children[1];
    let inner = "";
    for (const e of carritoStorage) {
        inner += `<tr><td>${e.categoria}</td><td>${e.marca}</td><td>${e.features}</td><td>1</td><td>${e.precio}</td></tr>`;
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

/*
    *Ordenar carrito por categorías
*/
// StackOverflow <3
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
$('#ordenar').on('change', function() {
    var value = $(this).val();
    console.log(value)
    $('#tablaCarrito').children().eq(1).html(` `)
    carritoStorage.sort(dynamicSort(value))
    console.table(carritoStorage)
    crearCarrito()
});



/**
    Modal carrito V2
    Abre modal con subtotal, iva de los productos, y pregunta descuento
 */

function descuentos(data) {
    carritoStorage.forEach(articulo => {
        articulo.aplicarDescuento(data)
    });
    return console.table(carritoStorage)
}


function modalCarrito () {
    $('#modalSubTotal').text(`$ ${carritoStorage.sum('precio')}`)
    $('#iva').text(`$ ${carritoStorage.sum('iva').toFixed(2)}`)
}



$('#finalCompra').on('click', () => {
    if($('#descuento').val().lenght != 0 ){
        descuentos($('#descuento').val())
    }
    //$.ajax(settingsVenta)
    $('#gracias').text(`Gracias por realizar su compra! Su total fue $${carritoStorage.sum('precio').toFixed(2)} `)
    carritoStorage.forEach(articulo => { // Elimina datos inncecesarios para el json
        delete articulo["urlImg"]
        delete articulo["features"]
        delete articulo["urlImg"]
    })
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://api.jsonbin.io/v3/b",
        method: "POST",
        dataType: "json",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": apiKey,
            "X-Bin-Name": `compra_${fecha()}`,
            "X-Collection-Id" : "60de233e9328b059d7b47417",
            
        },
        data: JSON.stringify(carritoStorage),
        statusCode: {
            200: () => console.log("Success"),
            400: () => console.log(" :c "),
            401: () => console.log("401 Unauthorized"),
            403: () => console.log("403 Forbidden"),
            404: () => console.log("404 Not Found"),
        }
    }).done((response) => console.log(response))
    console.table(carritoStorage)
})
$('#modalCompra').on('hidden.bs.modal', () => {
    clearAll()
})



function clearAll() {
    localStorage.clear();
    location.reload();
}


window.onload = () => {
    document.getElementById("carritoReset").onclick = clearAll;
    document.getElementById("carritoComprar").onclick = modalCarrito

}

//Animacion carrito
$("#showCart").click(() => { 
    $("#toggleList").toggle("slow");
});



$("#test").on('click', () => {
    $.ajax(settingsVenta2).done((response) => {
        console.table(response.metadata)
        console.table(response.record)
    })
})

