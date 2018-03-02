#!/usr/bin/env node
const { PassThrough } = require("stream");
const unzip = require("unzip");
const program = require("commander");

const { handleArguments } = require("../globalFlags");

const main = async () => {
  const { agent, path, parent } = await handleArguments(program);

  // Make Request
  const [operation] = await agent.exportAgent({ parent });
  const [response] = await operation.promise();

  const unzipper = unzip.Extract({ path });

  const bufferStream = new PassThrough();
  bufferStream.end(response.agentContent);
  bufferStream.pipe(unzipper);
};

module.exports = program => {
  program
    .command("export [output]")
    .description("Exports the dialogflow agent to the specified path.")
    .action(() => {
      main();
    });
};
