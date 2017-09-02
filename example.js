var ValidationZ = require('./index.js'),

nombre = 'Atlético Nacional';
estrellas = 16;
color1 = '#FFFFFF';
color2 = '#00FF00';
posicion = 1;

//Using the static method makeValidation
let error = ValidationZ.makeValidation(
    {nombre, estrellas, color1, color2, posicion},
    {nombre: ['required'], estrellas: ['integer', 'required', 'min:20', 'max:84'], posicion: ['integer', 'min:1'], color1: ['colorhex'], color2: ['colorhex']},
    {
        min: ':element debería ser mayor a :param1',
        estrellas: { min: 'Deberían ser mas de :param1 estrellas' },
    }
);

/*
//Creating a new object of ValizationZ class
let v = new ValidationZ();
v.setVars( {nombre, estrellas, color1, color2, posicion} );
v.setRules( {nombre: ['required'], estrellas: ['integer','max:84'], posicion: ['integer', 'between:1,20']} );
v.validate();
*/
return;