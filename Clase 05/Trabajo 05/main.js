//iniciar inventario
class articulo{
    constructor(id, nombre, precio, stock, marca){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.marca = marca;
        this.iva = 0.21;
        this.descuento = 0; //porcentaje
        this.mensaje = function () {console.log(this.nombre, " : " ,this.marca, " a $" , this.precio, "con ", this.stock, " unidades se ha agregado al inventario")}
    }

    //comprobar stock
    vendido(){
        this.stock = this.stock - 1;
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



const articulo1 = new articulo(1, "vodka", 450, 10, "Absolut vodka")
const articulo2 = new articulo(2, "Fernet", 600, 20, "Branca")
const articulo3 = new articulo(3, "Whisky", 2000, 30, "Johnnie Walker")
const articulo4 = new articulo(4, "Fernet", 500, 40, "1982")



function agregarArticulo() {
    ////Esta declarado así porque en principio quería hacer que los nombres de los articulos se declaren dinamicamente, pero ya con arrays se resuleve facil
    ////se que pude hacer declararla, y luego:
    //articulo5 = new articulo()
    //articulo5.nombre = prompt("Qué bebida es")
    var preguntaNombre = prompt("Qué bebida es?");
    var preguntaPrecio = prompt("Cual es el precio?");
    var preguntaStock = prompt("Hay stock? (true/false)"); //En lugar de preguntar si hay stock estaría bueno preguntar la cantidad (cuánto stock hay?)
    var preguntaMarca = prompt("Qué marca es?");
    var seguir = prompt("quiere agregar mas datos?")
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
    vender = "si" //prompt("Se vendió  una botella de fernet branca? (si/no)")
    if(vender == "si") {
        articulo2.vendido()
        console.log("quedan " + articulo2.precio) // en prompt no se ve, pero debería        
    }
    else {
        alert("No se vendió nada")
    }

}


function tienda() {
    entrada = prompt("quiere agregar un articulo?(1) o vender una botella de fernet?(2)")
    if( entrada == 1) {
        venderArticulo()
    }
    else if(entrada == 2) {
        venderArticulo()
    }
    else {
        alert("Opción incorrecta")
    }
}

tienda();
