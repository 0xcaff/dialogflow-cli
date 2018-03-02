import { PassThrough } from "stream";
import unzip from "unzip";
import program from "commander";

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

const attachCommand = program => {
  program
    .command("export [output]")
    .description("Exports the dialogflow agent to the specified path.")
    .action(() => {
      main();
    });
};

export default attachCommand;
