# validation-z
Validation for fields/values in NodeJS. Inspired by the Laravel validation.

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
		between: 'La edad debe ser menor que :param1 y mayor que :param2',
		required: 'La edad es un campo obligatorio'
	}
}

let errors = ValidationZ.makeValidation(inputs, rules, messages);
```

* **:elName** *Will replaced by the name of input/variable*
* **:elValue** *Will replaced by the value of input/variable*
* **:paramx** (For example :param1, :param2, :param3, etc...) *Will replaced by the parameter value* => For example: `between:1,5` when param1 is 1 and param2 is 5

## Current rules

  * **rule_name:param1,param2,paramx** (Version when was released) `Example`

  * **between:min,max** *(1.1.0)* `between:1,5`
  
  The value must be between the min and max value.


  * **colorhex** *(1.1.0)* `colorhex`
  
  The value must be a hexadecimal color like: `#00FF00` or `#3c3c3c`


  * **email** *(1.2.0)* `email`
  
  The value must be a valid email address


  * **in** *(1.2.0)* `in:value1,value2,value3`
  `
  The variable's value must be equal to one of the value passed like parameter.


  * **integer** *(1.1.0)* integer `integer`
  
  The value must be an integer.


  * **max:max_value** *(1.1.0)* `max:5`
  
  The value must be equal or less than the given value.

  
  * **min:min_value** *(1.1.0)* `min:5`
  
  The value must be equal or greater than the given value.
  
  
  * **required** *(1.1.0)* `required`
  
  The value must be different to: `''`, `null` and `undefinded`
    
  
## Future rules

  * **accepted**
  * **date**
