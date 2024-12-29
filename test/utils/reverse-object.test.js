const reverseObject = require('../../src/utils/reverse-object');

describe('Tests for util to reverse object', () => {
  const primitivePayloads = {
    input: {'andorra': 'ad', 'antarctica': true, 'belgium': null, 'switzerland': 2 },
    output: {'ad': 'andorra', 'true': 'antarctica', 'null': 'belgium', '2': 'switzerland' }
  };
  const payloadWithObjectValues = {
    input: {'andorra': {
      'iso2Code': 'ad',
      'iso3Code': 'and'
    }},
    output: {
      'andorra': 'ad'  
    }
  };


  test('Should reverse object with string values', () => {
    const reversedObj = reverseObject(primitivePayloads.input);

    expect(reversedObj).toStrictEqual(primitivePayloads.output);
  });

  test('Should return empty object if invalid input object is provided', () => {
    expect(reverseObject()).toStrictEqual({});
    expect(reverseObject({})).toStrictEqual({});
    expect(reverseObject(null)).toStrictEqual({});
    expect(reverseObject('test')).toStrictEqual({});
  });

  test('Should reverse object with object as values', () => {
    expect(reverseObject(payloadWithObjectValues.input, { value: 'iso2Code'})).toStrictEqual(payloadWithObjectValues.output);
    expect(reverseObject(payloadWithObjectValues.input, { key: 'iso3Code' ,value: 'iso2Code'})).toStrictEqual({
      [payloadWithObjectValues.input.andorra.iso3Code] : payloadWithObjectValues.input.andorra.iso2Code,
    });
    expect(reverseObject(payloadWithObjectValues.input, { key: 'iso3Code'})).toStrictEqual({
      [payloadWithObjectValues.input.andorra.iso3Code] : payloadWithObjectValues.input.andorra,
    });
  });

  test('Should return input object if no output value field is not provided', () => {
    expect(reverseObject(payloadWithObjectValues.input)).toStrictEqual(payloadWithObjectValues.input);
  });

  test('Should return empty object if invalid output value field is not provided', () => {
    expect(reverseObject(payloadWithObjectValues.input, {value: true})).toStrictEqual({});
    expect(reverseObject(payloadWithObjectValues.input, {key: {}, value: 'test'})).toStrictEqual({});
  });
});