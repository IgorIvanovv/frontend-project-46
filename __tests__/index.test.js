import { expect, test } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("compares flat JSON files", () => {
  const filepath1 = path.join(__dirname, "../__fixtures__/file1.json");
  const filepath2 = path.join(__dirname, "../__fixtures__/file2.json");

  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test("the date is string", () => {
  const filepath1 = path.join(__dirname, "../__fixtures__/file1.json");
  const filepath2 = path.join(__dirname, "../__fixtures__/file2.json");

  const result = genDiff(filepath1, filepath2);

  expect(typeof result).toBe(`string`);
});
