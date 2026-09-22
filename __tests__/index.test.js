import { expect, test } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("compares nested JSON files", () => {
  const filepath1 = path.join(__dirname, "../__fixtures__/file1.json");
  const filepath2 = path.join(__dirname, "../__fixtures__/file2.json");

  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test("compares nested YAML files", () => {
  const filepath3 = path.join(__dirname, "../__fixtures__/file1.yaml");
  const filepath4 = path.join(__dirname, "../__fixtures__/file2.yaml");

  const result = genDiff(filepath3, filepath4);

  expect(result).toBe(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test("the date is string", () => {
  const filepath1 = path.join(__dirname, "../__fixtures__/file1.json");
  const filepath2 = path.join(__dirname, "../__fixtures__/file2.json");

  const result = genDiff(filepath1, filepath2);

  expect(typeof result).toBe(`string`);
});
