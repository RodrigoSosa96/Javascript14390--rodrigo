//iniciar inventario
class articulo{
    constructor(datos){
        this.id = parseInt(datos.id)
        this.categoria = datos.categoria;
        this.marca = datos.marca;
        this.features = datos.features
        this.precio = datos.precio;
        this.stock = parseInt(datos.stock);//agregar if 0(disculpe, pero ya no hay)
        this.vendido = false
        //this.iva = 0.21;
        //this.descuento = 0; //porcentaje
    }
    //comprobar stock
    hayStock(){
        this.stock = true;
    }
    agregardescuento() {
        this.descuento = 0.20;//default
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


const pref = "productoID"

let contenedorPadre = document.getElementById("listaProductos")

for(let dato of datos) {
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
                                <p>Stock: ${dato.stock} unidades</p>
                                <p>Precio: $ ${dato.precio}</p>
                                <button id="${dato.id}">Comprar</button>
                                </div>

                                `
    contenedorPadre.appendChild(nuevoElemento)
    let boton = document.getElementById(dato.id)
    boton.onclick = () => {
        console.log("PRODUCTO VENDIDO" + dato.id);
    };
}




let entradaForm = document.getElementById("formulario")
entradaForm.onsubmit = (e) => {
    e.preventDefault();
    let dataform = {
        categoria: e.target.children[0].value,
        marca: e.target.children[1].value,
        features: e.target.children[2].value,
        stock: e.target.children[3].value,
        precio: e.target.children[4].value
    }
    return dataform

}





