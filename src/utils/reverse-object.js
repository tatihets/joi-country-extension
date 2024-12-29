// by default if output.key or output.value is missed,object key would be used by default

function reverseObject(obj = {}, output = {}) {
  if (!isObject(obj)) {
    return {};
  }
  const entries = Object.entries(obj);
  const outputObj = {};
  let outputObjKey;
  let outputObjVal;
  entries.forEach(([key, value]) => {
    if (isObject(value)) {
      outputObjKey = output.key ? value[output.key] : key; 
      outputObjVal = output.value ? value[output.value] : value;
      if (outputObjKey && outputObjVal) {
        outputObj[outputObjKey] = outputObjVal;
      }
    } else {
      outputObj[String(value)] = key;
    }
  });
  return outputObj;
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

module.exports = reverseObject;