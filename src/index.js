const BJ = require('joi');

const { COUNTRY_CODE_MIN_LENGTH, COUNTRY_CODE_MAX_LENGTH, ERROR_MESSAGES } = require('./constants');
const countries = require('./artifacts/country-to-country-codes.json');
const reverseObject = require('./utils/reverse-object');

const countryType = (joi) => ({
  type: 'country',
  base: joi.string().min(COUNTRY_CODE_MIN_LENGTH).prefs({ abortEarly: false }),
  messages: {
    'country.name': `{{#label}} ${ERROR_MESSAGES.INVALID_COUNTRY_NAME}`,
    'country.code': `{{#label}} ${ERROR_MESSAGES.INVALID_COUNTRY_CODE}`,
  },
  coerce(value, helpers) {
    const outputValue = String(value).trim().toLowerCase();
    const toCountryCode = helpers.schema.$_getFlag('toCountryCode');

    let countryCode;

    if (toCountryCode) {
      if (toCountryCode === COUNTRY_CODE_MIN_LENGTH) {
        if (outputValue.length > COUNTRY_CODE_MAX_LENGTH && countries[outputValue]) {
          countryCode = countries[outputValue].iso2Code;
        } else if (outputValue.length === COUNTRY_CODE_MAX_LENGTH) {
          countryCode = reverseObject(countries, { key: 'iso3Code', value: 'iso2Code'})[outputValue];
        }
      } else {
        if (outputValue.length > COUNTRY_CODE_MAX_LENGTH && countries[outputValue]) {
          countryCode = countries[outputValue].iso3Code;
        } else if (outputValue.length === COUNTRY_CODE_MIN_LENGTH) {
          countryCode = reverseObject(countries, { key: 'iso2Code', value: 'iso3Code'})[outputValue];
        }
      }
      return { value: countryCode || value };
    }

    return { value };
  },
  validate(inputValue, helpers) {
    if (typeof inputValue !== 'string') {
      return { value, errors: helpers.error('string.base')};
    }
    const value = inputValue.trim().toLowerCase();

    if (value.length > COUNTRY_CODE_MAX_LENGTH && !countries[value]) {
      return { value: inputValue, errors: helpers.error('country.name') };
    }
    const codes = Object.values(countries);
    const invalidIsoTwoCountryCode = value.length === COUNTRY_CODE_MIN_LENGTH && !codes.some(code => code.iso2Code.toUpperCase() === value.toUpperCase());
    const invalidIsoThreeCountryCode = value.length === COUNTRY_CODE_MAX_LENGTH && !codes.some(code => code.iso3Code.toUpperCase() === value.toUpperCase());
    if (invalidIsoTwoCountryCode || invalidIsoThreeCountryCode) {
      return { value: inputValue, errors: helpers.error('country.code') };
    }
  },
  rules: {
    toCountryCode: {
      convert: true,
      method(codeLength = COUNTRY_CODE_MIN_LENGTH) {
        return this.$_setFlag('toCountryCode',  codeLength);
      },
      args: [
        {
          name: 'codeLength',
          ref: true,
          assert: (value) => typeof value === 'number' && !isNaN(value) && [COUNTRY_CODE_MIN_LENGTH,COUNTRY_CODE_MAX_LENGTH].includes(value),
          message: `{{#label}} ${ERROR_MESSAGES.INVALID_COUNTRY_CODE_LENGTH}`
        }
      ],
    },
  },
});

module.exports = countryType;