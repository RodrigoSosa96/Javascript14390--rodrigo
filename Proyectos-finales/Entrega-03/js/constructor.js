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
        this.stock = parseInt(datos.stock);
        this.select = false
    }
    vendido(){
            this.stock = this.stock - 1 //Control de stock
    }

    aplicarDescuento(descuento) {
        this.precio = this.precio - (this.precio * (descuento / 100))
    }
    sumarIva(){
        this.precio = this.precio + (this.precio * 0.21);
    }
    selected(){
        //! agregar para seleccionar en vez de crear otro array? reset con un filter y .select = false a todo?
        //! o es mejor tener arrays separados?
        this.select = true
    }
}