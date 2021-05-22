//constructor de articulos

class articulo{
    constructor(id, nombre, precio, stock, marca, iva){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = false;
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
    //SUMAMOS EL IVA AL PRECIO DEL PRODUCTO
    sumarIva(){
        this.precio = this.precio + (this.precio * this.iva);
    }
    restarDescuento(){
        this.precio = this.precio - (this.descuento * this.precio);
    }
}

const articulo1 = new articulo(1, "vodka", 450, true, "Absolut vodka")
const articulo2 = new articulo(2, "Fernet", 600, true, "Branca")
const articulo3 = new articulo(3, "Whisky", 2000, false, "Johnnie Walker")
const articulo4 = new articulo(4, "Fernet", 500, true, "1982")


alert("precio" in articulo1)


function agregarArticulo() {
    var preguntaNombre = prompt("Qué bebida es?");
    var preguntaPrecio = prompt("Cual es el precio?");
    var preguntaStock = prompt("Hay stock? (true/false)");
    var preguntaMarca = prompt("Qué marca es?");
    var seguir = prompt("quiere agregar mas datos?")
    if(seguir == "yes") {
        var preguntaDescuento = prompt("Quiere hacer algun descuento?")
        const articulo5 = new articulo(preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca, preguntaDescuento)

    }
    else{
        const articulo5 = new articulo(preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca)// me equivoque muy mal , cómo agregaría los articulos desde el prompt? no lo vi en los ejemplos .. creo
        alert("Articulo agregado")
    }
}
var nuevo = agregarArticulo(); 