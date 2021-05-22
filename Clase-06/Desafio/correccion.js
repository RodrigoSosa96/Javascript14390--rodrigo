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
        this.mensaje = function () {console.log(this.nombre, " : " ,this.marca, " a $" , this.precio, "con ", this.stock, " unidades se ha agregado al inventario")}

    }
    agregarArticulo() {

        var preguntaNombre = "prueba" //prompt("Qué bebida es?");
        var preguntaPrecio = 250//prompt("Cual es el precio?");
        var preguntaStock = 10//prompt("Hay stock? (true/false)"); //En lugar de preguntar si hay stock estaría bueno preguntar la cantidad (cuánto stock hay?)
        var preguntaMarca = "prueba" //prompt("Qué marca es?");
        var seguir = "no" //prompt("quiere agregar mas datos?")
        if(seguir == "yes") {
            var preguntaDescuento = prompt("Quiere hacer algun descuento?")
            //Fijate que le agregué el id
            articulo5 = new articulo(5, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca, preguntaDescuento) //preguntaDescuento 
        }
        else{
            articulo5 = new articulo(5, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca)// me equivoque muy mal , cómo agregaría los articulos desde el prompt? no lo vi en los //emplos .. creo
            articulo6 = new articulo(6, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca, 0.21);
            console.log("articulo agregado")//alert("Articulo agregado: ")

        }
    }
    //comprobar stock
    vendido(){
        this.stock = stock - 1;
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



const articulo1 = new articulo(1, "vodka", 450, true, "Absolut vodka")
const articulo2 = new articulo(2, "Fernet", 600, true, "Branca")
const articulo3 = new articulo(3, "Whisky", 2000, false, "Johnnie Walker")
const articulo4 = new articulo(4, "Fernet", 500, true, "1982")




//alert(precio in articulo1) // Esto hay que llamarlo articulo1.precio.
function agregarArticulo1() {
    var preguntaNombre = "prueba" //prompt("Qué bebida es?");
    var preguntaPrecio = 250//prompt("Cual es el precio?");
    var preguntaStock = 10//prompt("Hay stock? (true/false)"); //En lugar de preguntar si hay stock estaría bueno preguntar la cantidad (cuánto stock hay?)
    var preguntaMarca = "prueba" //prompt("Qué marca es?");
    var seguir = "no" //prompt("quiere agregar mas datos?")
    if(seguir == "yes") {
        var preguntaDescuento = prompt("Quiere hacer algun descuento?")
        articulo5 = new articulo(5, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca, preguntaDescuento) //Tenía que declarar la variable sin var ni const para hacerla global 
    }
    else{
        articulo5 = new articulo(5, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca)
        articulo6 = new articulo(6, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca, 0.21);
        console.log("articulo agregado")//alert("Articulo agregado: ")

    }
}

//vender articulo
function venderArticulo() {
    
}

agregarArticulo1(); //con arrays ya puedo generarlo mas dinamicamente, pero creería que debe haber propiedades para hacer que cada articulo suba el numero (art1, art2, art3, ...)
