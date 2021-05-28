//Tienda de bebidas con carrito y articulos en stock actualizables
/*
Se crean elementos desde el storage, no desde datos, para asi mantener los articulos nuevos que agrego
El stock se mantiene con localstorage para saber qué se fue comprando
Estilos basicos, pero por ahora funcionales para esta entrega

*/

let idNuevo = 1//id base para nuevos articulos
let idcheck = 100
class articulo{
    constructor( categoria, marca, features, precio, stock, descuento) {
        this.id = idNuevo++;
        this.categoria = categoria;
        this.marca = marca;
        this.features = features
        this.precio = parseInt(precio);
        this.stock = parseInt(stock);
        this.iva = 0.21
    }
    //comprobar stock
    vendido(){
            this.stock = this.stock - 1
    }

    aplicarDescuento(descuento) {
        this.precio = this.precio - (this.precio * (descuento / 100))
    }
    sumarIva(){
        this.precio = this.precio + (this.precio * this.iva);
    }
    restarDescuento(){
        this.precio = this.precio - (this.descuento * this.precio);
    }

}

//Duda: cómo haría para agregar todos los objetos a una array?, o sea sin las propiedades, para ahorrar espacio al almacenarlo en el storage
/*
for (let e = 0; e < datos.length; e++) {
    console.log(Object.values(datos[e]));
}

ejemplo = datos.map(a => [a.id, a.categoria, a.marca, a.features, a.precio, a.stock])
*/


//Chequea si hay determinada llave en el storage
function checkStorage (key) {
    if (key in sessionStorage) {
        console.log("si")


    }else {
        console.log("no")
        makeStorage()
    }
}
checkStorage('listaProductos')



//Luego puedo hacerlo mas dinamico para distintas llaves junto al checkStorage (creo)
function makeStorage() {
    datosJSON = JSON.stringify(datos)
    sessionStorage.setItem("listaProductos", datosJSON)
}

const datosParse = JSON.parse(sessionStorage.getItem('listaProductos'))


//Construyo array desde Storage
const datosArmados = []
for(let e of datosParse) {
    datosArmados.push(new articulo( e.categoria, e.marca, e.features, e.precio, e.stock))
}
console.table(datosArmados)





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
                                <button id="${dato.id}">Agregar</button>
                                </div>
                                `
    contenedorPadre.appendChild(nuevoElemento)
    let boton = document.getElementById(dato.id)
    boton.onclick = () => {       //Con cada click se actualiza el stock y en caso de no haber más, se bloquea el botón.
        
        if(dato.stock >= 1) {
            console.log("PRODUCTO VENDIDO" + dato.id);
            dato.vendido()  
            document.getElementById('stock'+dato.id).innerHTML = `Stock: ${dato.stock} unidades`
            
            
        } else {
            console.log("No hay stock")
            document.getElementById(dato.id).disabled = true;


        }

    };
}
//despues de comprar ya hay menos articulos en la siguiente sesión con localstorage
//paso a json y luego parseo todo de nuevo en cada sesión

//carrito


const formData = []
//formulario nuevos elementos
//document.getElementById("idForm").innerHTML = `Articulo numero: ${idcheck}`  
let entradaForm = document.getElementById("formulario")
entradaForm.onsubmit = (e) => {
    e.preventDefault();
    dataform = {
        categoria: e.target.children[1].value,
        marca: e.target.children[3].value,
        features: e.target.children[5].value,
        stock: e.target.children[7].value,
        precio: e.target.children[9].value
    }
    datosArmados.push(new articulo(dataform.categoria, dataform.marca, dataform.features, dataform.precio, dataform.stock))
    //document.getElementById("idForm").innerHTML = `${idcheck}`  
    let ultimoPush = datosArmados.length - 1
    crearElemento(datosArmados[ultimoPush])//Si funciona pero da error a la consola, realmente funciona?
    //sessionStorage.setItem('nuevo', (JSON.stringify(dataform)))
}


