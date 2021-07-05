function checkCard(num) {
    cardNumb = parseInt(num)
    cardLenght = cardNumb.lenght

}


pago = 1
if( pago == "Tarjeta" || pago == "tarjeta"){
    tarjetaNumero = parseInt(prompt("Ingrese el numero de tarjeta"));
    tarjetaCheck= tarjetaNumero.lenght;
    if(tarjetaCheck != 16 || tarjetaCheck !=19){
        alert(tarjetaCheck);
    }
}
edad=18
edad >= 18 ? console.log("bienvenido") : console.log("no puede entrar")
tarjetaCheck = 16
tarjetaCheck = 16 ? console.log("si") : console.log("no")