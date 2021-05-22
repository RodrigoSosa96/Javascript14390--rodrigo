//mensaje inicial
let nombre = prompt("Hola, cual es su nombre?");
//pregunta nombre
let edad = prompt("Qué edad tiene " + nombre + "?");
//Año de nacimiento basico
let nacimiento = 2021 - edad;
//resultado concatenados con las variables y alert
let resultado = "Hola " + nombre + ", su año de nacimiento es " + nacimiento;

console.log(resultado);
