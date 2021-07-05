//***Sección admin de la tienda***
/* 
    *   Principalmente sirve para agregar artículos al inventario (recien me doy cuenta que también podía actualizar stock :/)
    *   Contabiliza el total de ventas realizadas asi como los importes totales e impuestos
    *   Botón de reseteo para reiniciar datos
    ?   Hacer que funcione con la api igual que local
    ?   checkar que haya un precio y stock
*/

//*


function generarOpciones () {
    for (const elemento of categoria) {
        $("#categoriaProducto").append(`<option value="${elemento}">${elemento}</option>`)}
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

