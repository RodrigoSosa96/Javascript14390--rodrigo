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
    agregardescuento() {
        this.descuento = 0.20;//default
    }

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
                                <p>Precio: $ ${dato.precio}</p>
                                <p id=stock${dato.id} >Stock: ${dato.stock} unidades</p>
                                <button id=${dato.id}>Agregar</button>
                                </div>
                                `
    contenedorPadre.appendChild(nuevoElemento)
    let boton = document.getElementById(dato.id)
    boton.onclick = () => {       //Con cada click se actualiza el stock y en caso de no haber más, se bloquea el botón.
        if(dato.stock >= 1) {
            
            console.log("PRODUCTO VENDIDO" + dato.id);
            dato.stock = dato.stock - 1
            document.getElementById('stock'+dato.id).innerHTML = `Stock: ${dato.stock} unidades`        
            
        } else {
            console.log("No hay stock")
            document.getElementById(dato.id).disabled = true;
        }

    };
}



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
    crearElemento(dataform)

}





