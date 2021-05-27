//Tienda de bebidas con carrito y articulos en stock actualizables
/*
El stock se mantiene con localstorage para saber qué se fue comprando
Estilos basicos, pero por ahora funcionales para esta entrega por cuestion de tiempo

*/





//Almacenar producto por producto

// o almacenar array completo

var idNuevo = 10

class articulo{
    constructor( id, categoria, marca, features, precio, stock, descuento) {
        this.id = idNuevo++;
        this.categoria = categoria;
        this.marca = marca;
        this.features = features
        this.precio = precio;
        this.stock = parseInt(stock);//agregar if 0(disculpe, pero ya no hay)
        this.descuento = descuento; //porcentaje
    }
    //comprobar stock
    vendido(){
            this.stock = this.stock - 1
    }
    agregardescuento() {
        this.precio = this.precio - (this.precio * 0.20)

    }
    //hay stock?
    /*
    estaDisponible(){
        return !this.stock;
    }
    */
    sumarIva(){
        this.precio = this.precio + (this.precio * this.iva);
    }
    restarDescuento(){
        this.precio = this.precio - (this.descuento * this.precio);
    }
}





//Agrego datos a storage
datosJSON = JSON.stringify(datos)
sessionStorage.setItem("listaProductos", datosJSON)
const datosGetJSON = sessionStorage.getItem("listaProductos")
const datosParse = JSON.parse(datosGetJSON)

const holaa = []
for(let prod of datosParse) {
    holaa.push(new articulo(prod.id, prod.categoria, prod.marca, prod.features, prod.precio, prod.stock))
}



const pref = "productoID"

let contenedorPadre = document.getElementById("listaProductos")



for(let dato of holaa) {
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
        
        if(dato.stock > 0) {
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
document.getElementById("idForm").innerHTML = `Articulo numero: ${idNuevo}`  
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
    //idNuevo++;
    formData.push(new articulo( dataform.categoria, dataform.marca, dataform.features, dataform.precio, dataform.stock))
    document.getElementById("idForm").innerHTML = `${idNuevo}`  
    for(let dato of formData) {
        crearElemento(dato)
    }
    //sessionStorage.setItem('nuevo', (JSON.stringify(dataform)))
    //Faltaría Crear el elemento correspondiente. Eso te lo dejo a vos
}

//formParse = sessionStorage.getItem("nuevo");
//formParse = JSON.parse(formParse)

//console.log(formParse)



////un for para agregar cada elemento agregado
//for (const producto of misProductosParseados) { //Instanciar objetos de la clase Producto
//    productosReArmados.push(new Producto(producto.id, producto.desc, producto.precio));
//}


