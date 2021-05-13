//Inventario


class articulo{ //Clases siempre con mayúsculas
    constructor(id, nombre, precio, stock, marca){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = 0;//agregar if 0(disculpe, pero ya no hay)
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


const articulos = [];

articulos.push(new articulo(1, "vodka", 450, 10, "Absolut vodka"))
articulos.push(new articulo(2, "Fernet", 600, 5, "Branca"))
articulos.push(new articulo(3, "Whisky", 2000, 0, "Johnnie Walker"))
articulos.push(new articulo(4, "Fernet", 500, 0, "1982"))
articulos.push(new articulo(5, "Fernet", 400, 20, "1982"))



var preguntaNombre = "test" //prompt("Qué bebida es?");
var preguntaPrecio = 100 //prompt("Cual es el precio?");
var preguntaStock =  10//prompt("Hay stock?");
var preguntaMarca = "test" //prompt("Qué marca es?");
var preguntaDescuento = 10


//var nuevo = preguntaNombre + preguntapre
articulos.push(new articulo(5, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca))
//tambien se puede hacer push en cada uno, pero las respuestas deberían estar en orden

//prompt("Se agregó: " +)

let idBusqueda = parseInt(prompt("quiere verificar algún articulo? (ingrese id)"));//en caso de no saber (?) lista de los id con nombres solamente

let encontrado = articulos.find(x => x.id === idBusqueda);//x.nombre para ver el tipo de bebida
console.log(encontrado);

let queHacer = prompt("que quiere hacer? \n buscar por id (0) \n buscar por nombre (1) \n lista por precio de menor a mayor? (2)")

switch (key) {
    case 0:
        
        break;
    case 1:
        
        break;
    case 2:

        break;

    default:
        break;
}