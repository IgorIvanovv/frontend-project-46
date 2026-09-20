import * as fs from "node:fs";
function parseFile(filepath) {
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}
export default parseFile;
