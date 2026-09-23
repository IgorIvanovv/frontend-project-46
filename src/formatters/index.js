import stylish from "./stylish.js";
import formatPlain from "./plain.js";

const formatTree = (tree, formatName) => {
  switch (formatName) {
    case "stylish":
      return stylish(tree);
    case "plain":
      return formatPlain(tree);
    default:
      throw new Error(`Unknown status: ${formatName}`);
  }
};

export default formatTree;
