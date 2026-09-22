import stylish from "./formatters/stylish.js";
import parseFile from "./parsers/parserSelector.js";
import _ from "lodash";
const buildDiff = (firstObject, secondObject) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);
  const allKeys = [...firstKeys, ...secondKeys];

  const uniqueKeys = allKeys.filter((key, index) => allKeys.indexOf(key) === index);

  const sortedKeys = _.sortBy(uniqueKeys);

  const diffResult = sortedKeys.flatMap((key) => {
    const hasFirst = key in firstObject;
    const hasSecond = key in secondObject;

    if (
      hasFirst &&
      hasSecond &&
      typeof firstObject[key] === "object" &&
      firstObject[key] !== null &&
      !Array.isArray(firstObject[key]) &&
      typeof secondObject[key] === "object" &&
      secondObject[key] !== null &&
      !Array.isArray(secondObject[key])
    )
      return {
        key,
        status: "nested",
        children: buildDiff(firstObject[key], secondObject[key]),
      };

    if (hasFirst && !hasSecond) {
      return {
        key,
        status: "removed",
        value: firstObject[key],
      };
    }

    if (!hasFirst && hasSecond) {
      return {
        key,
        status: "added",
        value: secondObject[key],
      };
    }

    if (firstObject[key] === secondObject[key]) {
      return {
        key,
        status: "unchanged",
        value: firstObject[key],
      };
    }

    return {
      key,
      status: "changed",
      oldValue: firstObject[key],
      newValue: secondObject[key],
    };
  });
  return diffResult;
};
const genDiff = (filepath1, filepath2) => {
  const firstObject = parseFile(filepath1);
  const secondObject = parseFile(filepath2);

  const diffResult = buildDiff(firstObject, secondObject);
  return ["{", ...stylish(diffResult), "}"].join("\n");
};

export default genDiff;
