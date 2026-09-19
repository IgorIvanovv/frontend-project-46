#!/usr/bin/env node

import { Command } from "commander";
import genDiff from "./index.js";
import path from "node:path";
const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    const result = genDiff(path.resolve(filepath1), path.resolve(filepath2));
    console.log(result);
  });
program.parse();
