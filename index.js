const validatorRules = {


	/*
	* Name: min
	* Function: Validates if a given number is greater than a established number
	* Params:
	*		elementName 	(String): Name of element or variable which will be analyzed
	*		el: 			(String): Value of variable
	*		otherRules: 	(Array): List of the others rules which can be used to modify the result of this function
	*		ruleParams: 	(Array): List of parameters to evaluate the element. Should be only one parameter (min expected)
	*		customMessages:	(object): List of custom messages which replaces the original messages. The names of valid messages: min
	*		
	*/
	'min': (elementName, elementValue, otherRules = [], ruleParams = [], customMessages = {}) => {

		if (ruleParams.length == 1) {

			if (elementValue >= ruleParams[0]) {
				
				return { error: false };
	
			} else {
				
				return { error: true, message: buildValidationMessage(customMessages, 'min', elementName, elementValue, ruleParams) };
				
			}

		} else {

			return { error: true, message: buildValidationMessage(customMessages, 'invalid-params', elementName, elementValue, ruleParams) };

		}
		
	},
	'max': (elementName, elementValue, otherRules = [], ruleParams = [], customMessages = {}) => {

		if (ruleParams.length == 1) {
			
			if (elementValue <= ruleParams[0]) {
				
				return { error: false };
	
			} else {
				
				return { error: true, message: buildValidationMessage(customMessages, 'max', elementName, elementValue, ruleParams) };
				
			}

		} else {

			return { error: true, message: buildValidationMessage(customMessages, 'invalid-params', elementName, elementValue, ruleParams) };

		}

	},
	'integer': (elementName, elementValue, otherRules = [], ruleParams = [], customMessages = {}) => {

		if (elementValue === parseInt(elementValue, 10)) {

			return { error: false };
			
		} else {

			return { error: true, message: buildValidationMessage(customMessages, 'integer', elementName, elementValue, ruleParams) };

		}

	},
	'between': (elementName, elementValue, otherRules = [], ruleParams = [], customMessages = {}) => {
		
		if (ruleParams.length == 2) {
			
			if (elementValue >= ruleParams[0] && elementValue <= ruleParams[1]) {
				
				return { error: false };

			} else {

				return { error: true, message: buildValidationMessage(customMessages, 'between', elementName, elementValue, ruleParams) };
				
			}

		} else {

			return { error: true, message: buildValidationMessage(customMessages, 'invalid-params', elementName, elementValue, ruleParams) };

		}

	},
	'required': (elementName, elementValue, otherRules = [], ruleParams = [], customMessages = {}) => {

		if (elementValue === '' || elementValue === null || elementValue === undefined) {
			
			return { error: true, message: buildValidationMessage(customMessages, 'required', elementName, elementValue, ruleParams) };

		} else {

			return { error: false };

		}

	},
	'colorhex': (elementName, elementValue, otherRules = [], ruleParams = [], customMessages = {}) => {

		const re = /^[#]{1}[A-Fa-f0-9]{6}$/;

		if (re.test(elementValue)) {
			
			return { error: false };

		} else {

			return { error: true, message: buildValidationMessage(customMessages, 'colorhex', elementName, elementValue, ruleParams) };

		}

	}

};

let messagesForValidation = {

	'between': ':elName is out of data range',
	'colorhex': ':elName is not a valid color in hex.',
	'invalid-params': 'Invalid type or quantity of params for :elName',
	'integer': ':elName is not integer',
	'min': ':elName should be greater than :param1',
	'max': ':elName should be minor than :param1',
	'required': ':elName is required.'

};

let validRules = ['between', 'colorhex', 'integer', 'min', 'max', 'required'];

const buildValidationMessage = (customMessages, ruleName, elementName, elementValue, ruleParams) => {
	
	let messageBase = '';
	if (customMessages.hasOwnProperty(elementName) && customMessages[elementName].hasOwnProperty(ruleName)) {
		
		messageBase = customMessages[elementName][ruleName];
		
	} else if (customMessages.hasOwnProperty(ruleName)) {

		messageBase = customMessages[ruleName];

	} else {

		messageBase = messagesForValidation[ruleName];

	}

	m = messageBase.replace(':elName', elementName).replace(':elValue', elementValue);

	for (pIndex of Object.keys(ruleParams)) {

		m = m.replace(`:param${parseInt(pIndex) + 1}`, ruleParams[pIndex]);

	}

	return m;

}

class ValidationZ {

	constructor (vars = {}, rules = {}, messages = {}) {
		this.errors = {};
		this.messages = messages;
		this.rules = rules;
		this.vars = vars;
	}

	setVars(vars) {
		
		this.vars = vars;

	}

	setRules(rules) {

		this.rules = rules;

	}

	setMessages(messages) {
		
		this.messages = messages;

	}

	validate() {

		//console.log('Running');
		//ruleKey is the name of variable which will be uses to load the rules for already said variable
		for (let ruleKey in this.rules) {

			let ruleErrors = [];
			let rules = this.rules[ruleKey];
			if (rules.includes('required') && this.vars[ruleKey] === undefined) { // If the rules include the 'required' rule and no exist a variable's name same to ruleKey

				ruleErrors.push(`${ruleKey} var is undefined - Is required`);

			} else {

				// key is the index for rules. rules[key] is equal to: integer or min:16 or between:4,16 and so
				for (let key in rules) {

					//temp var is used to separate the structure of rules => integer|min:16|between:4,16
					let temp = rules[key].split(':');
					let ruleName = temp[0];
					let ruleParams = [];

					if (temp.length > 1) {

						ruleParams = temp[1].split(',');
						temp = null;
						
					}

					if (validRules.includes(ruleName)) { // Should be a valid rule, if no is valid, will be omitted

						let result = validatorRules[ruleName](ruleKey, this.vars[ruleKey], rules, ruleParams, this.messages);
						if (result.error) {
	
							ruleErrors.push(result.message);
	
						}

					}// End if: Valid rules

				}

			}

			if (ruleErrors.length > 0) {

				this.errors[ruleKey] = ruleErrors;

			}


		}// End for

		console.log(this.errors);
		return this.errors;

	}

	static makeValidation (vars, rules, messages) {

		let v = new ValidationZ(vars, rules, messages);
		v.validate();

	}

}// End class

module.exports = ValidationZ;
