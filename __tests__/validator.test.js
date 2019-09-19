const validator = require('../lib/validator.js');

describe('validator module', () => {
  
  const str = 'banana';
  const num = 1;
  const arr = ['a'];
  const obj = { x: 'y' };
  const func = () => {};
  const bool = false;
  const date = 'Tue Sep 17 2019 16:35:31 GMT-0700 (Pacific Daylight Time)';
  const strNum = '77';
  const strBool = 'true';

  describe('performs basic validation of', () => {

    test('strings', () => {
      expect(validator.isString(str)).toBeTruthy();
      expect(validator.isString(num)).toBeTruthy();
      expect(validator.isString(arr)).toBeFalsy();
      expect(validator.isString(obj)).toBeFalsy();
      expect(validator.isString(func)).toBeFalsy();
      expect(validator.isString(bool)).toBeTruthy();
      expect(validator.isString(strNum)).toBeTruthy();
      expect(validator.isString(strBool)).toBeTruthy();
    });

    test('numbers', () => {
      expect(validator.isNumber(str)).toBeFalsy();
      expect(validator.isNumber(num)).toBeTruthy();
      expect(validator.isNumber(arr)).toBeFalsy();
      expect(validator.isNumber(obj)).toBeFalsy();
      expect(validator.isNumber(func)).toBeFalsy();
      expect(validator.isNumber(bool)).toBeFalsy();
      expect(validator.isNumber(strNum)).toBeTruthy();
      expect(validator.isNumber(strBool)).toBeFalsy();
    });

    test('arrays', () => {
      expect(validator.isArray(str)).toBeFalsy();
      expect(validator.isArray(num)).toBeFalsy();
      expect(validator.isArray(arr)).toBeTruthy();
      expect(validator.isArray(obj)).toBeFalsy();
      expect(validator.isArray(func)).toBeFalsy();
      expect(validator.isArray(bool)).toBeFalsy();
    });

    test('objects', () => {
      expect(validator.isObject(str)).toBeFalsy();
      expect(validator.isObject(num)).toBeFalsy();
      expect(validator.isObject(arr)).toBeFalsy();
      expect(validator.isObject(obj)).toBeTruthy();
      expect(validator.isObject(func)).toBeFalsy();
      expect(validator.isObject(bool)).toBeFalsy();
    });

    test('booleans', () => {
      expect(validator.isBoolean(str)).toBeFalsy();
      expect(validator.isBoolean(num)).toBeFalsy();
      expect(validator.isBoolean(arr)).toBeFalsy();
      expect(validator.isBoolean(obj)).toBeFalsy();
      expect(validator.isBoolean(func)).toBeFalsy();
      expect(validator.isBoolean(bool)).toBeTruthy();
      expect(validator.isBoolean(strNum)).toBeFalsy();
      expect(validator.isBoolean(strBool)).toBeTruthy();
    });

    test('functions', () => {
      expect(validator.isFunction(str)).toBeFalsy();
      expect(validator.isFunction(num)).toBeFalsy();
      expect(validator.isFunction(arr)).toBeFalsy();
      expect(validator.isFunction(obj)).toBeFalsy();
      expect(validator.isFunction(func)).toBeTruthy();
      expect(validator.isFunction(bool)).toBeFalsy();
    });
  });

  describe('performs array validation of', () => {

    const arrayOfStrings = ['a', 'b', 'c'];
    const arrayOfNumbers = [1, 2, 3];
    const arrayOfObjects = [{}, {}, {}];
    const arrayOfBooleans = [true, false, true];

    test('strings', () => {
      expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
      expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
    });

    test('numbers', () => {
      expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
      expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();
    });

    test('objects', () => {
      expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
      expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();
    });

    test('booleans', () => {
      expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
    });
  });

  describe('get validator for', () => {

    test('strings', () => {
      // TODO: pass getValidator the rules
      expect(validator.getValidator('String')).toBe(validator.isString);
    });
    
    test('numbers', () => {
      expect(validator.getValidator('Number')).toBe(validator.isNumber);
    });

    test('arrays', () => {
      expect(validator.getValidator('Array')).toBe(validator.isArray);
    });

    test('objects', () => {
      expect(validator.getValidator('Object')).toBe(validator.isObject);
    });

    test('booleans', () => {
      expect(validator.getValidator('Boolean')).toBe(validator.isBoolean);
    });

    test('functions', () => {
      expect(validator.getValidator('Function')).toBe(validator.isFunction);
    });

    test('array of strings', () => {
      expect(validator.getValidator(['Strings'])).toBe(validator.isArrayOfStrings);
    });

    test('array of numbers', () => {
      expect(validator.getValidator(['Numbers'])).toBe(validator.isArrayOfNumbers);
    });

    test('array of objects', () => {
      expect(validator.getValidator(['Objects'])).toBe(validator.isArrayOfObjects);
    });

    test('array of booleans', () => {
      expect(validator.getValidator(['Booleans'])).toBe(validator.isArrayOfBooleans);
    });

  });
  describe('get errors', () => {

    test('strings error', () => {
      expect(validator.getCastor(str, 'String')).toBeTruthy();
      expect(validator.getCastor(num, 'String')).toBeTruthy();
      expect(validator.getCastor(arr, 'String')).toBe(`I'm sorry I'm not sure that is a String`);
      expect(validator.getCastor(obj, 'String')).toBe(`I'm sorry I'm not sure that is a String`);
      expect(validator.getCastor(func, 'String')).toBe(`I'm sorry I'm not sure that is a String`);
      expect(validator.getCastor(bool, 'String')).toBeTruthy();
    });

    test('num error', () => {
      expect(validator.getCastor(str, 'Number')).toBe(`I'm sorry I'm not sure that is a Number`);
      expect(validator.getCastor(num, 'Number')).toBeTruthy();
      expect(validator.getCastor(arr, 'Number')).toBe(`I'm sorry I'm not sure that is a Number`);
      expect(validator.getCastor(obj, 'Number')).toBe(`I'm sorry I'm not sure that is a Number`);
      expect(validator.getCastor(func, 'Number')).toBe(`I'm sorry I'm not sure that is a Number`);
      expect(validator.getCastor(bool, 'Number')).toBe(`I'm sorry I'm not sure that is a Number`);
    });

    test('bool error', () => {
      expect(validator.getCastor(str, 'Boolean')).toBe(`I'm sorry I'm not sure that is a Boolean`);
      expect(validator.getCastor(num, 'Boolean')).toBe(`I'm sorry I'm not sure that is a Boolean`);
      expect(validator.getCastor(arr, 'Boolean')).toBe(`I'm sorry I'm not sure that is a Boolean`);
      expect(validator.getCastor(obj, 'Boolean')).toBe(`I'm sorry I'm not sure that is a Boolean`);
      expect(validator.getCastor(func, 'Boolean')).toBe(`I'm sorry I'm not sure that is a Boolean`);
      expect(validator.getCastor(bool, 'Boolean')).toBeTruthy();
    });

    test('date error', () => {
      expect(validator.getCastor(str, 'Date')).toBe(`I'm sorry I'm not sure that is a Date`);
      expect(validator.getCastor(num, 'Date')).toBe(`I'm sorry I'm not sure that is a Date`);
      expect(validator.getCastor(arr, 'Date')).toBe(`I'm sorry I'm not sure that is a Date`);
      expect(validator.getCastor(obj, 'Date')).toBe(`I'm sorry I'm not sure that is a Date`);
      expect(validator.getCastor(func, 'Date')).toBe(`I'm sorry I'm not sure that is a Date`);
      expect(validator.getCastor(bool, 'Date')).toBe(`I'm sorry I'm not sure that is a Date`);
      expect(validator.getCastor(date, 'Date')).toBeTruthy();
    });

  });
});