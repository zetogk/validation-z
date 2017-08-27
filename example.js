var ValidationZ = require('./index.js'),

nombre = 'Atlético Nacional';
estrellas = 16;
color1 = '#FFFFFF';
color2 = '#00FF00';
posicion = 1;

//Using the static method makeValidation
let error = ValidationZ.makeValidation(
    {nombre, estrellas, color1, color2, posicion},
    {nombre: ['required'], estrellas: ['integer', 'required', 'min:0', 'max:84'], posicion: ['integer', 'between:1,20'], color1: ['colorhex'], color2: ['colorhex']}
);

/*
//Creating a new object of ValizationZ class
let v = new ValidationZ();
v.setVars( {nombre, estrellas, color1, color2, posicion} );
v.setRules( {nombre: ['required'], estrellas: ['integer','max:84'], posicion: ['integer', 'between:1,20']} );
v.validate();
*/
return;