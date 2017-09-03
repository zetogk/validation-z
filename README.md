# validation-z
Validation for fields/values in NodeJS.

## How to use
`const ValidationZ = require('validation-z');`

You can create a new object or call the **makeValidation** static method.

### New object
```
const inputs = {
	name: 'Santiago,
	age: '25'
}

const rules = {
	name: ['required'],
	age: ['integer', 'between:1,20']
}

let v = new ValidationZ(inputs, rules);
let errors = v.validate();
```


### Using the static method
```
const inputs = {
	name: 'Santiago',
	age: '25'
}

const rules = {
	name: ['required'],
	age: ['integer', 'between:1,20']
}

let errors = ValidationZ.makeValidation(inputs, rules);
```

### How to set custom messages?
	
```
const inputs = {
	name: 'Santiago',
	age: '25'
}

const rules = {
	name: ['required'],
	age: ['integer', 'between:1,20']
}

const messages = {
	required: ':elName es requerido',
	age: {
		between: 'La edad debe ser mayor que :param1 y menor que :param2',
		required: 'La edad es un campo obligatorio'
	}
}

let errors = ValidationZ.makeValidation(inputs, rules, messages);
```

* **:elName** *Will replaced by the name of input/variable*
* **:elValue** *Will replaced by the value of input/variable*
* **:paramx** (For example :param1, :param2, :param3, etc...) *Will replaced by the parameter value* => For example: `between:1,5` when param1 is 1 and param2 is 5

## Current rules

  * **min** min:1
  * **max** max:5
  * **integer** integer
  * **between** between:1,5
  * **required** required
  * **colorhex** colorhex
  
