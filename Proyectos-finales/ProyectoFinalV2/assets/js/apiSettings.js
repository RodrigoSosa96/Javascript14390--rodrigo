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
const carritoStorage = []

//settings para GET y PUT (mas que nada por los headers y porque era disferente con la api que uso)
var settingsGET = {
    async: true,
    crossDomain: true,
    url: ajaxURL+"/latest",
    method: "GET",
    beforeSend: function() {
        $('#loading-image').show(); // No me gusta como lo implementé :/
    },
    headers: {
        "X-Master-Key": apiKey,
    },
    data: {},
    statusCode: {
        200: () => console.log("Success"),
        400: () => console.log("400 Bad Request"),
        401: () => console.log("401 Unauthorized"),
        403: () => console.log("403 Forbidden"),
        404: () => console.log("404 Not Found"),
    }
}
var settingsPUT = {
    async: true,
    crossDomain: true,
    url: ajaxURL,

    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey,
    },
    data: datosArmados,
    statusCode: {
        200: () => console.log("Success"),
        400: () => console.log("400 Bad Request"),
        401: () => console.log("401 Unauthorized"),
        403: () => console.log("403 Forbidden"),
        404: () => console.log("404 Not Found"),
    }
}
//!futuro para compras realizadas

function fecha () {
    let date = new Date()
    if(date.getMonth() + 1 < 10){
        if(date.getDate < 10){
            return `0${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}.${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
        }
        else {
            return `${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}.${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
        }
    }else{
        if(date.getDate < 10){
            return `0${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
        }
        else {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
        }
    }
}




//! honestamente no pude enviar los datos, creo que es por los [] del array? no se como arreglar eso, porque manualmente si puedo enviarlo
function dataPost () {
    return JSON.stringify(carritoStorage)
}

const settingsVenta = {
    async: true,
    crossDomain: true,
    url: "https://api.jsonbin.io/v3/b",
    method: "POST",
    dataType: "json",
    headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey,
        "X-Bin-Name": `compra_${fecha()}`,
        "X-Collection-Id" : "60de233f55b7245a20d352c2",
        
    },
    data: JSON.stringify(carritoStorage),
    statusCode: {
        200: () => console.log("Success"),
        400: () => console.log(" :c "),
        401: () => console.log("401 Unauthorized"),
        403: () => console.log("403 Forbidden"),
        404: () => console.log("404 Not Found"),
    }
}

const settingsFetch = {
    async: true,
    crossDomain: true,
    url: "https://api.jsonbin.io/v3/c/<COLLECTION_ID>/bins",
    
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey,
        "X-Collection-Id" : "60de233e9328b059d7b47417",
        
    },
    data: JSON.stringify(carritoStorage),
    statusCode: {
        200: () => console.log("Success"),
        400: () => console.log("400 Bad Request"),
        401: () => console.log("401 Unauthorized"),
        403: () => console.log("403 Forbidden"),
        404: () => console.log("404 Not Found"),
    }
}