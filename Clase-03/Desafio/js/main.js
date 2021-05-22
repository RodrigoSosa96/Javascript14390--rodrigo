let orden = prompt("Bienvenido al bar Coder, le gustaría pedir algo?")
while (orden != "esc") {
    //piden su pedido para llevar o no
    let pedido1 = prompt("Qué le gustaría comer?");
    let ensalada = prompt("Quiere alguna ensalada para acompañar? \n (con o sin?)");
    let llevar = prompt(" Quiere la orden para comer aquí o llevar? \n (llevar, aqui)");

    switch (llevar) {
        case "llevar":
            alert("Su pedido de " + pedido1 + ensalada + " ensalada está listo para retirar.");
            break;
        case "aqui":
        alert("Su pedido de " + pedido1 + ensalada + " ensalada será llevado a su mesa.");
        break;
        default:
        alert("Operación no valida")
    }

    orden = prompt("Le gustaría hacer otra orden?")
}
alert("Vuelva pronto!")
