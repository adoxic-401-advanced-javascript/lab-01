const validator = require('./validator');

class Schema {

  constructor(schema) {
    this.schema = schema;      
  }

  validate(model) {
    const goodObject = {};
    const badObject = {};
    const invalid = {};
    Object.entries(model).forEach(([key, value]) => {
      const rule = this.schema[key];
      if(rule === undefined) {
        invalid.notValid = 'sorry that data is not in the schema';
      } else {
        if(validator.getCastor(value, rule.type) === true) {
          goodObject[key] = value;
      
        } else {
          badObject[key] = validator.getCastor(value, rule.type);
        }
      }
    });
    const baddnessValue = Object.keys(badObject);
    if(baddnessValue.length) {
      return badObject;
    } else {
      return goodObject;
    }
  }
  
}

module.exports = Schema;