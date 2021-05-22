//var firstName = prompt("enter your first name");
//var lastName = prompt("enter your last name");
//var gender = prompt("enter your gender");
//var birthMonth = prompt("enter the two digits of your birth month");
//var birthDay = prompt("enter the two digits of your birth day");
//var birthYear = prompt("enter the four digits of your birth year");
//
//function person(firstName, lastName, gender, birthMonth, birthDay, birthYear){
//    return {
//        firstName: firstName,
//        lastName: lastName,
//        birthMonth: birthMonth,
//        birthDay: birthDay,
//        birthYear: birthYear
//    };
//}
//
//var test = new person(firstName, lastName, gender, birthMonth, birthDay, birthYear);
//

class Producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.vendido = false;
        this.iva = 0.21;
    }
    //USAMOS ESTE METODO PARA VENDER EL PRODUCTO
    vender(){
        this.vendido = true;
    }
    //USAMOS ESTE METODO PARA VERIFICAR QUE EL PRODUCTO ESTE DISPONIBLE PARA LA VENTA
    estaDisponible(){
        return !this.vendido;
    }
    //SUMAMOS EL IVA AL PRECIO DEL PRODUCTO
    sumarIva(){
        this.precio = this.precio + (this.precio * this.iva);
    }
}
//INSTANCIAMOS DOS OBJETO PRODUCTO USANDO LA FUNCION CONSTRUCTORA
const producto3 = new Producto(3, "HAMBURGUESA",400);
const producto4 = new Producto(4, "CARLITO",400);
//CREAMOS UN ARRAY DE TIPO PRODUCTO
const productos = [];
productos.push(new Producto(1, "HAMBURGESA", 300));
productos.push(new Producto(2, "PIZZA", 500));
productos.push(new Producto(3, "PANCHO", 200));
productos.push(new Producto(4, "PAPAS", 150));
console.log(productos);


let selectData = productos.map(producto => {
    return {id: producto.id, nombre: producto.nombre}
});