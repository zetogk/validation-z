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
	'min': (elementName, el, otherRules = [], ruleParams = [], customMessages = {}) => {

		if (ruleParams.length == 1) {

			if (el >= ruleParams[0]) {
				
				return { error: false };
	
			} else {
				
				let message = '';
				if (customMessages.hasOwnProperty(elementName) && customMessages[elementName].hasOwnProperty('min')) {

					message = customMessages[elementName]['min'].replace(':element', elementName).replace(':param1', ruleParams[0]).replace(':value', el);

				} else if (customMessages.hasOwnProperty('min')) {

					message = customMessages['min'].replace(':element', elementName).replace(':param1', ruleParams[0]).replace(':value', el);

				} else {

					message = messagesForValidation['min'].replace(':element', elementName).replace(':param1', ruleParams[0]).replace(':value', el);

				}

				return { error: true, message };
				
			}

		} else {

			return { error: true, message: 'Invalid params for min validation' };

		}
		
	},
	'max': (el, otherRules,  ruleParams = []) => {

		if (ruleParams.length == 1) {
		
			if (el <= ruleParams[0]) {
				
				return { error: false };

			} else {

				return { error: true, message: 'Is higer than max value' };
				
			}

		} else {

			return { error: true, message: 'Invalid params for max validation' };

		}

	},
	'integer': (el, otherRules,  ruleParams = []) => {

		if (el === parseInt(el, 10)) {

			return { error: false };

		} else {

			return { error: true, message: 'Is not a integer' };
			
		}

	},
	'between': (el, otherRules,  ruleParams = []) => {
		
		if (ruleParams.length == 2) {
			
			if (el >= ruleParams[0] && el <= ruleParams[1]) {
				
				return { error: false };

			} else {

				return { error: true, message: 'Is out of data range' };
				
			}

		} else {

			return { error: true, message: 'Invalid params for between validation' };

		}

	},
	'required': (el, otherRules,  ruleParams = []) => {

		if (el === '' || el === null || el === undefined) {
			
			return { error: true, message: 'The variable is required. it should contain a value.' };

		} else {

			return { error: false };

		}

	},
	'colorhex': (el, otherRules, ruleParams = []) => {

		const re = /^[#]{1}[A-Fa-f0-9]{6}$/;

		if (re.test(el)) {
			
			return { error: false };

		} else {

			return { error: true, message: 'The variable is not a valid color in hex.' };

		}

	}

};

let messagesForValidation = {

	'min': ':element should be greater than :param1',

};

//let validRules = ['between', 'colorhex', 'integer', 'max', 'min', 'required'];
let validRules = ['min'];



class ValidationZ {

	constructor (vars = {}, rules = {}, messages = {}) {
		this.errors = {};
		this.vars = vars;
		this.rules = rules;
		this.messages = messages;
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

	buildValidationMessage() {
		//TODO
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
