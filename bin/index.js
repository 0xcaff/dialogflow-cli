#!/usr/bin/env node
const program = require("commander");

program
  .command(
    "import [path]",
    "Zips and imports the files at the specified path into the dialogflow agent"
  )
  .command(
    "export [output]",
    "Exports the dialogflow agent to the specified path."
  )
  .parse(process.argv);
