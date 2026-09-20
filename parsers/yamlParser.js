import { load } from "js-yaml";
import * as fs from "node:fs";
function parseFile(filepath) {
  return load(fs.readFileSync(filepath, "utf-8"));
}

export default parseFile;
