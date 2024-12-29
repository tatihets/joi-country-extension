const COUNTRY_CODE_MIN_LENGTH = 2;
const COUNTRY_CODE_MAX_LENGTH = 3;

const ERROR_MESSAGES = {
  INVALID_MIN_LENGTH: `must be at least ${COUNTRY_CODE_MIN_LENGTH} characters`,
  INVALID_COUNTRY_CODE_LENGTH: `must be a valid country code with ${COUNTRY_CODE_MIN_LENGTH} or ${COUNTRY_CODE_MAX_LENGTH} length`,
  INVALID_COUNTRY_NAME: 'must be a valid or existing country name',
  INVALID_COUNTRY_CODE: 'must be a valid country code',
};


module.exports = {
  COUNTRY_CODE_MIN_LENGTH,
  COUNTRY_CODE_MAX_LENGTH,
  ERROR_MESSAGES
};