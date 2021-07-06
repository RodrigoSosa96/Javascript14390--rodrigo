/*
    *Carga de ajax por medio de jsonbin.io
    Permite Agregar articulos como un administrador si se quiere, o directamente no usarlo y usar la tienda para compras
    ?Como podría hacer esto con $.get() o $.post() no se como enviarlo con la key y las cabeceras que debe tener
    ! enviar datos con cada venta? (metadatos mas adelante)
    !actualizar stock con cada vez que se toca el carrito? (mas adelante)
*/

const datosArmados = []
const apiKey= "$2b$10$N436g4d/8eI82cQnCZKRNeru8F/lrwBlQXjP9ZVGpx5rVJ37jF0kG"
const ajaxURL = "https://api.jsonbin.io/v3/b/60c84bb098ca6c704eb055fc"
const ajaxData = []

//settings para GET y PUT (mas que nada por los headers y porque era disferente con la api que uso)
var settingsGET = {
    "async": true,
    "crossDomain": true,
    "url": ajaxURL+"/latest",
    "method": "GET",
    "beforeSend": function() {
        $('#loading-image').show(); // No me gusta como lo implementé :/
    },
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

