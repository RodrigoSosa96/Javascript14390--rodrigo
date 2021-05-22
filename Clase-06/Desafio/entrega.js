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


//agregar aticulo nuevo

function articuloNuevo() {//porque si inicio la función luego de la bienvenida, no inicia? 
    var preguntaId = parseInt(prompt("Indique la id del articulo"))
    var preguntaNombre = prompt("Qué bebida es?");
    var preguntaPrecio = parseInt(prompt("Cual es el precio?"));
    var preguntaStock = parseInt(prompt("Hay stock?"));
    var preguntaMarca = parseInt(prompt("Qué marca es?"));
    var preguntaDescuento = parseInt(prompt("El articulo tiene descuento?"))
    articulos.push(new articulo(preguntaId, preguntaNombre, preguntaPrecio, preguntaStock, preguntaMarca, preguntaDescuento))

    agregarMas = prompt("Quiere agregar otro articulo? (si/no)")
    if(agregarMas == "si"){
        articuloNuevo();
    }
    else if(agregarMas == "no") {
        alert("Se aplicará iva y descuento")

        check()
    }
    else{
        alert("opcion incorrecta");
    };
    function check() {//checkea el stock
        var pregunta = parseInt(prompt("Quiere ordenarlo por nombre(0), precio(1), o cantidad de stock(2)?"))

    switch (pregunta) {
        case 0:
            articulos.sort((a, b) => a.marca.localeCompare(b.marca)); //por nombre
            ocultarStock();
            break;
        case 1:
            articulos.sort((a,b) => a.precio - b.precio) //por precio
            ocultarStock();
            break;
        case 2:
            articulos.sort((a,b) => b.stock - a.stock) //por cantidad de menor a mayor
            mostrarStock()
            break;
        default:
            alert("respuesta incorrecta")
            break;
    }
    }
    function mostrarStock() {
        let listaDatos = articulos.map(articulo => {
            return {nombre: articulo.nombre, precio: articulo.precio, stock: articulo.stock}
        });
        console.log(listaDatos);
        let menu = '';
        for (const dato of listaDatos) {
            menu += dato.nombre +" $"+dato.precio+ " -- stock:  " +dato.stock +" \n";
        }
        alert(menu)
        
    }
    function ocultarStock() {
        let listaDatos = articulos.map(articulo => {
            return {nombre: articulo.nombre, precio: articulo.precio}
        });
        console.log(listaDatos);
        let menu = '';
        for (const dato of listaDatos) {
            menu += dato.nombre +" "+dato.precio+" \n";
        }
        alert(menu)
    }
    
}



//bienvenida
//porque no me tomaba articuloNuevo si lo escribía despues de esto?

alert("Bienvenidos a nuestra tienda")
entrada = parseInt(prompt("usted es cliente(0) o empleado(1)?"))
if(entrada == 0) {
    alert("Tienda en construcción")
    tienda();
}
else if(entrada == 1) {
    articuloNuevo();
}
else {
    alert("Opcion incorrecta")
}


//tienda

function tienda() {

}