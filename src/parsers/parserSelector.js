import path from "node:path";
import jsonParser from "./jsonParser.js";
import yamlParser from "./yamlParser.js";
function parseFile(filepath) {
  const fileExt = path.extname(filepath);
  if (fileExt === ".yaml" || fileExt === ".yml") {
    return yamlParser(filepath);
  } else {
    return jsonParser(filepath);
  }
}
export default parseFile;
