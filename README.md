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

const schema = extendedJoi.country().toCountryCode();
```
* toCountryCode rule - converts by default country to alpha-2 iso country code. Pass 3 if you need to convert to alpha-3 iso country code
* It`s possible to convert between country codes. Example:

```
const Joi = require('joi');
const countryExtension = require('joi-country-and-codes-validation-extension');

const extendedJoi = Joi.extend(countryExtension);

const schema = extendedJoi.country().toCountryCode();
const {value} = schema.validate('Pol') // pl
```
