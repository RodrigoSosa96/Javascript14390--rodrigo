
//Lista de precios (no tengo idea de precios :d)
let vodka = 450, fernet = 600, whisky = 2000;

//para la suma
let producto1 = 0;
let producto2 = 0;
let producto3 = 0;

//nombres

let nombre1 = "vodka", nombre2 = "fernet", nombre3 = "whisky";


producto1 = 450;

//carrito
function items() {
    item1 = producto1;
    item2 = producto2;
    item3 = producto3;
    return prompt(item1 + "\n" + item2 + "\n" + item3);
};





function verNombre(item) {
    return buscar(item) + " " + item + "\n";
}

//buscar nombre
function buscar(busqueda) {
    item = busqueda
    switch (item) {
        case 450:
            return "fernet";
            break;
        case 600:
            return "vodka";
            break;
        case 2000:
            return "whisky";
            break;
        default:
            return " ";
            break;
    }
}




//------ Suma de los totales

function total (item5,item6,item7) {
    let precioFinal = sumaTotal(suma(item5,item6,item7), iva(suma(item5,item6,item7)));
    return console.log("Su total es : " + precioFinal + ("  (IVA incluido)"))
}
const suma  = (a,b,c) => a + b + c;
const sumaTotal =(d, f) => d + f;
const iva   = x => x * 0.21;








//Lista de precios (no tengo idea de precios :d)
let vodka = 450, fernet = 600, whisky = 2000;

//para la suma
let producto1 = 0;
let producto2 = 0;
let producto3 = 0;

//Entrada
function entrada() {
    let entrar = prompt("Le gustaría comprar alguna de nuestras bebidas? \n (si/no)");
    if(entrar == "si") {
        tienda();
    }
    else if(entrar == "no") {
        alert("Gracias por elegirnos, vuelva pronto");
    }
    else {
        alert("error, vuelva a ingresar la opcion");
        entrada();
    }
}
//verificar edad, luego entra a la tienda
let edad = parseInt(prompt("Cual es tu edad?"));
if(edad >= 21) {
    alert("Bienvenidos a nuestra bodega");
    entrada();
}
else if(edad < 21 && edad >12){
    alert("Vuelva cuando termine el secundario");
}
else{
    alert("No deberías estar aquí");
};



//----------Tienda----------//
function tienda() {
    seleccion();
    carrito();
    total();
    vuelvaPronto(); 
};


//agregar al carrito
function seleccion() {
        producto1 = numeroProducto();
        producto2 = numeroProducto();
        producto3 = numeroProducto();
};

//para cada producto
function numeroProducto() {
    let numero = prompt("Seleccione su producto \n fernet(1) vodka (2) whisky(3) (maximo 3 productos)");
    switch (numero) {
        case "1":
            return fernet;
            break;
        case "2":
            return vodka;
            break;
        case "3":
            return whisky;
            break;
        default:
            return "No existe el producto";
            break;
    }
};


//suma?
function sumaProductos() {
    let resultadoSuma = producto1 + producto2 + producto3;
    let total= suma + iva(suma)
    prompt("El total es " + resultadoSuma + " mas " + iva)
}
const suma = (producto1, producto2, producto3) => {return producto1 + producto2 + producto3};

//agregar iva
const iva   = x => x * 0.21;




//suma de iva a cada producto


//entradas
//entro a la tienda

function carrito () {
    let idBebida = prompt("Seleccione su producto \n fernet(1) vodka (2) fernet(3) (maximo 3 productos)");
}




function obtenerBebida(idBebida) {
    switch (idBebida) {
        case 1:
            return "El " + vodka + "se sumó al carrito.";
            break;
        case 2:
            return "El " + fernet + "se sumó al carrito.";
            break;
            
    }

}




//suma de productos parseint productos
//pseudo calc
sumaProductos = producto1 + producto2 + producto3;

//impuestos
const iva = function (sumaProductos) { return sumaProductos * 0.21}
function calcIva(sumaProductos) ;
//p
function carrito(articulo1, articulo2, articulo3){
    return articulo1 + articulo2 + articulo3;
    //if not, sumar 0
    
};

function bienvenidos(cliente) {
    alert("Bienvenido/a " + cliente + " nuevamente a nuestra tienda");
    carrito();
};
function carrito(bebida1, bebida2) {
    bebidas = prompt("Qué le gustaría beber hoy? \n (Vodka, Fernet)");



};
bienvenidos();


var edad = parseInt(prompt("Cual es tu edad?"));
/*
function bebida(entrada1, entrada2) {
    alert(bebidaNombre + "  $" + bebidaPrecio  +" se a agregado al carrito");
}
*/



if(edad >= 21) {
    alert("Bienvenido a nuestra tienda de bebidas! \n En la siguiente alerta le preguntaremos qué quiere comprar");
    var bebida = prompt("Qué desea comprar? \n (Vino, Cerveza, Vodka, Whisky)");
    if(bebida == "Vodka" || bebida == "Vino"){
        bebida("Vodka", vodkaPrecio);
    }
    else if(bebida == "cerveza" || bebida == "Cerveza"){
        alert("Cerveza agrega al carrito");
    }
    else if(bebida == "Vodka" || bebida == "vodka"){
        alert("Vodka agregada al carrito");
    }
    else if(bebida == "Whisky" || bebida == "whisky"){
        alert("Vodka agregada al carrito");
    }
    else{
        alert("Disculpe, la opción ingresada no es correcta");
    }
    var pago = prompt("Quiere pagar con efectivo o tarjeta?")
    //Checkea si la tarjeta es valida (no funciona :c )
    if( pago == "Tarjeta" || pago == "tarjeta"){
        tarjetaNumero = parseInt(prompt("Ingrese el numero de tarjeta"));
        tarjetaCheck= tarjetaNumero.lenght;
        if(tarjetaCheck != 16 || tarjetaCheck !=19){
            alert(tarjetaCheck);
        }
    }
    
    alert("Gracias por comprar con nosotros \n Vuelva pronto");
};

