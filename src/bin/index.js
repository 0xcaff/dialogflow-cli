#!/usr/bin/env node
const program = require("commander");
const { registerCommands } = require("../commands");

program.option(
  "--credentials [path]",
  "The path of the credentials json file."
);

registerCommands(program);

program.parse(process.argv);
