/*
    Constructor en construcción
*/
const datos = []

const categoria = ['Fernet', 'Cerveza', 'Vodka', 'Whisky', 'Otro']

let id = 1 // Init id
class articulo{
    constructor(datos) {
        this.id = id++;
        this.categoria = datos.categoria;
        this.marca = datos.marca;
        this.features = datos.features
        this.precio = parseInt(datos.precio);
        this.iva = (21 * datos.precio) / 100
        this.stock = parseInt(datos.stock);
        this.urlImg = datos.urlImg
    }
    vendido(){
            this.stock = this.stock - 1 //Control de stock
    }

    aplicarDescuento(descuento) {
        this.precio = this.precio - (this.precio * (descuento / 100))
    }
}


