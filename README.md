# joi-country-extension
Small node.js package to validate country by full name, country alpha-2 and alpha-3 characters code. Also it allows convert country to country alpha-2 and alpha-3 characters code

### How to install

```
npm install joi-country-and-codes-validation-extension
```

### How to use

```
const Joi = require('joi');
const countryExtension = require('joi-country-and-codes-validation-extension');

const extendedJoi = Joi.extend(countryExtension);

const schema = extendedJoi.country();
schema.validate('Poland') // valid country
schema.validate('PL') // valid alpha-2 country code
schema.validate('POL') // valid alpha-3 country code
schema.validate('Test') // { error: {
    ...
    details: [{
      ...
      message: `"value" must be a valid or existing country name`
      ...
  }]
    ...
} }
```

### Convert country to alpha-2 iso country code

```
const Joi = require('joi');
const countryExtension = require('joi-country-and-codes-validation-extension');

const extendedJoi = Joi.extend(countryExtension);

const schema = extendedJoi.country().toCountryCode();
const { value } = schema.validate('Poland') // pl. Extract value to use converted string

```

### Convert country to alpha-3 iso country code

```
const Joi = require('joi');
const countryExtension = require('joi-country-and-codes-validation-extension');

const extendedJoi = Joi.extend(countryExtension);

const schema = extendedJoi.country().toCountryCode(3);
const { value } = schema.validate('Pl') // pol. Extract value to use converted string

```

#### Check 'test' folder to see more examples

* Error is standard Joi validation error object with custom messages
* toCountryCode rule - converts by default country (or country code) to alpha-2 iso country code. Pass 3 if you need to convert to alpha-3 iso country code
