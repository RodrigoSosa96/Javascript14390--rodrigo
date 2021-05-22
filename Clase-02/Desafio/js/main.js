var edad = parseInt(prompt("Cual es tu edad?"));


//Si la edad es mayor de 21, puede ingresar, else vuelva en # años
if(edad >= 21) {
    alert("Bienvenido a nuestra tienda de bebidas! \n En la siguiente alerta le preguntaremos qué quiere comprar");
    var bebida = prompt("Qué desea comprar? \n (Vino, Cerveza, Vodka, Whisky)");
    if(bebida == "vino" || bebida == "Vino"){
        alert("Vino Agregado al carrito");
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
        tarjetaCheck= tarjetaNumero.length;
        if(tarjetaCheck != 16 || tarjetaCheck !=19){
            alert(tarjetaCheck);
        }
    }
    
    alert("Gracias por comprar con nosotros \n Vuelva pronto");
}

//Si es menor
else if(edad < 21 && edad >12){
    alert("Vuelva cuando termine el secundario");
}
else{
    alert("No deberías estar aquí")
};
