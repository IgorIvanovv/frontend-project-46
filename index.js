import parseFile from './parser.js';
import _ from 'lodash';
const genDiff = (filepath1, filepath2) => { 
    const firstObject = parseFile(filepath1);
    const secondObject = parseFile(filepath2);
    const firstKeys = Object.keys(firstObject);
    const secondKeys = Object.keys(secondObject);
    const allKeys = [...firstKeys, ...secondKeys];
    const uniqueKeys = allKeys.filter((key, index) => allKeys.indexOf(key) === index);
    const sortedKeys = _.sortBy(uniqueKeys);
   const diffResult = sortedKeys.map((key) => {
  const hasFirst = key in firstObject;
  const hasSecond = key in secondObject;

  if (hasFirst === true && hasSecond === false) {
    return `  - ${key}: ${firstObject[key]}`;
  }

  if (hasFirst === false && hasSecond === true) {
    return `  + ${key}: ${secondObject[key]}`;
  }

  if (hasFirst === true && hasSecond === true) {
    if (firstObject[key] === secondObject[key]) {
      return `    ${key}: ${firstObject[key]}`;
    }

    return [
      `  - ${key}: ${firstObject[key]}`,
      `  + ${key}: ${secondObject[key]}`
    ];
  }
});
  const result = `{\n${diffResult.flat().join('\n')}\n}`;
  return result;
};

export default genDiff;