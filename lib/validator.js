const isString = input => {
  if(typeof input === 'number' || typeof input === 'boolean') {
    input = `${input}`;
  }
  return typeof input === 'string';
};

const isArrayOfStrings = input => {
  for(let i = 0; i < input.length; i++) {
    const maybeString = input[i];
    if(typeof maybeString !== 'string') {
      return false;
    }
    return true;
  }
};

const isBoolean = input => {
  if(input === 'true' || input === 'false') {
    input = eval(input);
  }
  return typeof input === 'boolean';
};

const isArrayOfBooleans = input => {
  for(let i = 0; i < input.length; i++) {
    const maybeString = input[i];
    if(typeof maybeString !== 'boolean') {
      return false;
    }
    return true;
  }
};

const isNumber = input => {
  const regex = /^[1-9]*$/;
  if(regex.test(input)) {
    input = parseInt(input); 
  }
  return typeof input === 'number';
};

const isArrayOfNumbers = input => {
  for(let i = 0; i < input.length; i++) {
    const maybeString = input[i];
    if(typeof maybeString !== 'number') {
      return false;
    }
    return true;
  }
};

const isObject = input => {
  if(Array.isArray(input)) {
    return false;
  }
  return typeof input === 'object';
};

const isArrayOfObjects = input => {
  for(let i = 0; i < input.length; i++) {
    const maybeString = input[i];
    if(typeof maybeString !== 'object') {
      return false;
    }
    return true;
  }
};

const isArray = input => {
  return Array.isArray(input);
};

const isFunction = input => {
  return typeof input === 'function';
};

const isDate = input => {
  return input instanceof Date;
};

function getCastor(input, expected) {
  const expectedType = getValidator(expected);

  try {
    const output = expectedType(input);
    if(output) {
      return output;
    } 
    throw `I'm sorry I'm not sure that is a ${expected}`;
  }
  catch(err) {
    return err;
  }
}

const getValidator = rules => {
  if(Array.isArray(rules)) {
    const name = `isArrayOf${rules}`;
    return eval(name);
  } else {
    const functionName = `is${rules}`;
  
    return eval(functionName);
  }
};

module.exports = {
  isString,
  isArrayOfStrings,
  isBoolean,
  isArrayOfBooleans,
  isNumber,
  isArrayOfNumbers,
  isObject,
  isArrayOfObjects,
  isArray,
  isFunction,
  isDate,
  getCastor,
  getValidator 
};
