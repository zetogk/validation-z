var ValidationZ = require('./index.js'),

nombre = 'Atlético Nacional';
estrellas = 16;
color1 = '#FFFFFF';
color2 = '#00FF00';
posicion = 1;

//Using the static method makeValidation
let error = ValidationZ.makeValidation(
    { nombre, estrellas, color1, color2, posicion },
    { nombre: ['required'], estrellas: ['integer', 'required', 'min:0', 'max:84'], posicion: ['integer', 'between:1,20'], color1: ['colorhex'], color2: ['colorhex'] },
    {
        min: ':elName debería ser mayor a :param1',
        max: ':elName debería ser menor a :param1',
        integer: 'La variable :elName no es un entero',
        between: ':elName debe estar entre el rango :param1 y :param2',
        required: ':elName es requerido. Debe tener un valor.',
        colorhex: ':elName debe tener el formato #FFFFFF',
        nombre: { required: 'El nombre es obligatorio' },
        color2: { colorhex: 'No tiene el formato esperado' },
        posicion: { integer: 'La posición debe ser un número entero. El valor actual es :elValue', between: 'La posición debe de estar entre el número :param1 y :param2' },
        estrellas: { min: 'Deberían ser mas de :param1 estrellas', max: 'Error en la variable :elName: El número máximo de estrellas son :param1' },
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