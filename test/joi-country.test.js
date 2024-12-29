const Joi = require('joi').extend(require('../src'));
const { COUNTRY_CODE_MIN_LENGTH, COUNTRY_CODE_MAX_LENGTH, ERROR_MESSAGES } = require('../src/constants');

describe('Test new joi type country', () => {
  const country = Joi.country();

  test('Should validate country and alpha-2/3 country codes', () => {
    expect(country.type).toBe('country');
    expect(country.validate('PoLand')).toStrictEqual({ value: 'PoLand' });
    expect(country.validate('Pl')).toStrictEqual({ value: 'Pl' });
    expect(country.validate('Pol')).toStrictEqual({ value: 'Pol' });
  });

  test('Should return error if invalid country value is provided', () => {
    expect(country.validate('Test').error).toBeInstanceOf(Joi.ValidationError);
    expect(country.validate('Test').error.details).toStrictEqual([
      {
        message: `"country" ${ERROR_MESSAGES.INVALID_COUNTRY_NAME}`,
        path: [],
        type: 'country.name',
        context: { label: 'country', value: 'Test' }
      }
    ]);
  });

  test('Should return error if invalid country value length is provided', () => {
    expect(country.validate('t').error).toBeInstanceOf(Joi.ValidationError);
    expect(country.validate('t').error.details[0]).toEqual(expect.objectContaining(({
      message: `"country" length must be at least ${COUNTRY_CODE_MIN_LENGTH} characters long`,
      path: [],
      type: 'string.min',
    })));
  });

  test('Should return error if invalid country code value is provided', () => {
    const expectedError = {
      message: `"country" ${ERROR_MESSAGES.INVALID_COUNTRY_CODE}`,
      path: [],
      type: 'country.code',
    };

    expect(country.validate('aa').error).toBeInstanceOf(Joi.ValidationError);
    expect(country.validate('aa').error.details[0]).toEqual(expect.objectContaining((expectedError)));

    expect(country.validate('aaa').error).toBeInstanceOf(Joi.ValidationError);
    expect(country.validate('aaa').error.details[0]).toEqual(expect.objectContaining((expectedError)));
  });

  test('Should return error if not string is provided', () => {
    const expectedError = {
      message: '"country" must be a string',
      path: [],
      type: 'string.base',
    };

    expect(country.validate(true).error).toBeInstanceOf(Joi.ValidationError);
    expect(country.validate(true).error.details[0]).toEqual(expect.objectContaining((expectedError)));

    expect(country.validate(null).error).toBeInstanceOf(Joi.ValidationError);
    expect(country.validate(null).error.details[0]).toEqual(expect.objectContaining((expectedError)));

    expect(country.validate({}).error).toBeInstanceOf(Joi.ValidationError);
    expect(country.validate({}).error.details[0]).toEqual(expect.objectContaining((expectedError)));
  });


  test('Should retain string predefined options', () => {
    expect(country.lowercase().validate('PoLand')).toStrictEqual({ value: 'poland' });
    expect(country.min(COUNTRY_CODE_MAX_LENGTH).validate('p').error.details[0]).toEqual(expect.objectContaining(({
      message: `"country" length must be at least ${COUNTRY_CODE_MAX_LENGTH} characters long`,
      path: [],
      type: 'string.min',
    })));
    expect(country.max(COUNTRY_CODE_MIN_LENGTH).validate('pol').error.details[0]).toEqual(expect.objectContaining(({
      message: `"country" length must be less than or equal to ${COUNTRY_CODE_MIN_LENGTH} characters long`,
      path: [],
      type: 'string.max',
    })));
  });
});

describe(('Test country type conversion to country code'), () => {
  const countryCode = Joi.country().toCountryCode();

  test('Should convert to country code', () => {
    expect(countryCode.validate('Poland').value).toBe('pl');
    expect(Joi.country().toCountryCode(3).validate('Poland').value).toBe('pol');
    expect(countryCode.validate('pL').value).toBe('pL');
    expect(Joi.country().toCountryCode(3).validate('pL').value).toBe('pol');
    expect(countryCode.validate('pol').value).toBe('pl');
    expect(Joi.country().toCountryCode(3).validate('Pol').value).toBe('Pol');
  });

  test('Should return the same input country value if unknown country is provided', () => {
    expect(countryCode.validate('TestCountry').value).toBe('TestCountry');
  });
});