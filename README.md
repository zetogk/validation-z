# validation-z
Validation for fields/values in NodeJS.


## How to use
`const ValidationZ = require('validation-z');`

You can create a new object or call the **makeValidation** static method.

### New object
```
const inputs = {
	name: 'Santiago',
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
