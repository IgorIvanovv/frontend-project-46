import path from "node:path";
import jsonParser from "./jsonParser.js";
import yamlParser from "./yamlParser.js";
function parseFile(filepath) {
  const fileExt = path.extname(filepath);
  switch (fileExt) {
    case ".yaml":
    case ".yml":
      return yamlParser(filepath);
    case ".json":
      return jsonParser(filepath);
    default:
      throw new Error(`Unknown extension: ${fileExt}`);
  }
}
export default parseFile;
