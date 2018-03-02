#!/usr/bin/env node
import program from "commander";
import { registerCommands } from "../commands";

program.option(
  "--credentials [path]",
  "The path of the credentials json file."
);

registerCommands(program);

program.parse(process.argv);
