//***Sección admin de la tienda***
/* 
    *   Principalmente sirve para agregar artículos al inventario (recien me doy cuenta que también podía actualizar stock :/)
    *   Contabiliza el total de ventas realizadas asi como los importes totales e impuestos
    *   Botón de reseteo para reiniciar datos
    ?   Hacer que funcione con la api igual que local
    ?   checkar que haya un precio y stock
*/

//*

(function generarOpciones () {
    for (const elemento of categoria) {
        $("#categoriaProducto").append(`<option value="${elemento}">${elemento}</option>`)}
})()


var datosAJAX = []

$.ajax(settingsGET).done(function (response) {
    $('#loading-image').hide();
    console.log(response)
    if (response.record.length === 12) {
        console.log("Datos sin tocar")

    }else {
        console.log("Alguien cargo datos")
    }
    $('#opciones').show()
    //datosAJAX = response.record
    for (const e of response.record) {
        datosAJAX.push(e)
    }
    //crearDatos(datosAJAX)
    //tarjetas() 
    
})




//*Agregar elementos a los articulos
function nuevoProducto(){
    let nuevoRegistro = {
        id            : datosAJAX.length + 1,
        categoria     : document.getElementById("categoriaProducto").value,
        marca         : document.getElementById("marcaProducto").value,
        features      : document.getElementById("featuresProducto").value,
        precio        : document.getElementById("precioProducto").value,
        stock         : document.getElementById("stockProducto").value,
        urlImg        : document.getElementById("urlImg").value

    }
    datosAJAX.push(nuevoRegistro)
    return console.table(datosAJAX)
    //actualizarDatos()
    //datosAjax.push(new nuevoRegistro);
    //let ultimoPush = datosAJAX.length - 1
    //crearElemento(datosAJAX[ultimoPush])
    //!makeStorage(datosArmados) //va a postear los datos
    //filtrarEvento();
}

function actualizarDatos() {
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://api.jsonbin.io/v3/b/60c84bb098ca6c704eb055fc",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": apiKey,
        },
        data: JSON.stringify(datosAJAX),
        statusCode: {
            200: () => console.log("Success"),
            400: () => console.log("400 Bad Request"),
            401: () => console.log("401 Unauthorized"),
            403: () => console.log("403 Forbidden"),
            404: () => console.log("404 Not Found"),
        }
    }).done((response) => console.log(response))
}



window.onload = () => {
    document.getElementById("submitBtn").onclick =  nuevoProducto;
}


//! Migrar
//$('#submitBtn').click( function(e) { 
//    $("html, body").animate({
//        scrollTop: $("#listaProductos").get(0).scrollHeight
//    }, 750);
//} ).delay(2000).animate({
//    scrollTop: $("#submitBtn").offset().top
//}, 2000);


