const Schema = require('../lib/Schema');

describe('Schema', () => {

  const personScheme = {
    firstName: {
      type: 'String',
      required: true
    },
    lastName: {
      type: 'String',
      required: true
    },
    married: {
      type: 'Boolean',
      required: true
    },
    kids: {
      type: 'Number',
      required: true
    }
  };

  const schema = new Schema(personScheme);

  it('validates a correct model', () => {
    const guy = {
      'firstName': 'Chris',
      'lastName': 'Sample',
      'married': true,
      'kids': 3
    };

    const correct = schema.validate(guy);

    expect(correct).toEqual({
      'firstName': 'Chris',
      'lastName': 'Sample',
      'married': true,
      'kids': 3
    });
  });

  it('throws on invalid model', () => {
    const guy = {
      'firstName': true,
      'lastName': { 'thing': 'other' },
      'married': 6,
      'kids': true
    };
    const correct = schema.validate(guy);
    expect(correct).toEqual({ lastName: 'I\'m sorry I\'m not sure that is a String',
      married: 'I\'m sorry I\'m not sure that is a Boolean',
      kids: 'I\'m sorry I\'m not sure that is a Number' });

  });

  it('doesnt add information that is out of the schema', () => {
    const guy = {
      'firstName': 'Chris',
      'lastName': 'Sample',
      'married': true,
      'kids': 3,
      'elephant': true,
      'goats': 5
    };

    const correct = schema.validate(guy);

    expect(correct).toEqual({
      'firstName': 'Chris',
      'lastName': 'Sample',
      'married': true,
      'kids': 3
    });
  });

});