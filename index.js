const validatorRules = {

	'min': (el, otherRules, ruleParams = []) => {

		if (ruleParams.length == 1) {

			if (el >= ruleParams[0]) {
				
				return { error: false };
	
			} else {
	
				return { error: true, message: 'Is smaller than min value' };
				
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

let validRules = ['between', 'colorhex', 'integer', 'max', 'min', 'required'];

class ValidationZ {

	constructor (vars = {}, rules = {}) {
		this.errors = {};
		this.vars = vars;
		this.rules = rules;
	}

	setVars(vars) {
		
		this.vars = vars;

	}

	setRules(rules) {

		this.rules = rules;

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

						let result = validatorRules[ruleName](this.vars[ruleKey], rules, ruleParams);
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

	static makeValidation (vars, rules) {

		let v = new ValidationZ(vars, rules);
		v.validate();

	}

}// End class

module.exports = ValidationZ;
