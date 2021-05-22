//iniciar inventario
class articulo{
    constructor(id, nombre, precio, stock, marca){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;//agregar if 0(disculpe, pero ya no hay)
        this.marca = marca;
        this.iva = 0.21;
        this.descuento = 0; //porcentaje
    }
    //comprobar stock
    hayStock(){
        this.stock = true;
    }
    nuevoDescuento() {
        this.descuento = 0.30;
    }
    //hay stock?
    estaDisponible(){
        return !this.stock;
    }
    sumarIva(){
        this.precio = this.precio + (this.precio * this.iva);
    }
    restarDescuento(){
        this.precio = this.precio - (this.descuento * this.precio);
    }
}


const articulos = [];
articulos.push(new articulo(1, "vodka", 450, 10, "Absolut vodka"))
articulos.push(new articulo(2, "Fernet", 600, 5, "Branca"))
articulos.push(new articulo(3, "Whisky", 2000, 0, "Johnnie Walker"))
articulos.push(new articulo(4, "Fernet", 500, 0, "1982"))
articulos.push(new articulo(5, "Fernet", 400, 20, "1982"))




function articuloNuevo() {

    var preguntaId = parseInt(prompt("Indique la id del articulo"))
    var preguntaNombre = prompt("Qué bebida es?");
    var preguntaPrecio = parseInt(prompt("Cual es el precio?"));
    var preguntaStock = parseInt(prompt("Indique stock"));
    var preguntaMarca = parseInt(prompt("Qué marca es?"));
    var preguntaDescuento = parseInt(prompt("Agregue descuento"))
    articulos.push(new articulo(preguntaId, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca, preguntaDescuento))
    
    agregarMas = prompt("Quiere agregar otro articulo? (si/no)")
    if(agregarMas == "si"){
        articuloNuevo();
    }
    else if(agregarMas == "no") {
        alert("Articulo/s agregado/s")
    }
    else{
        alert("opcion incorrecta");
    };
}
articuloNuevo();


let lista = document.getElementById("listaProductos")
for(let articulo of articulos) {
    articulo.sumarIva();
    let contenedor = document.createElement("div");
    contenedor.classList.add("lista");
    contenedor.id = "articulo"+articulo.id;
    contenedor.innerHTML = `<h2 class = "articulo--nombre">${articulo.nombre}</h2>
                            <p  id="precio">$ ${articulo.precio}</p>
                            <p  id="stock">${articulo.stock}</p>`;
    lista.appendChild(contenedor)
}
