import archiver from "archiver";
import program from "commander";
import getRawBody from "raw-body";

import { handleArguments } from "../globalFlags";

// Given a path, compress the files at the path and make a string of the
// contents.
const makeArchive = async path => {
  const archive = archiver("zip", {});
  const zipStringPromise = getRawBody(archive);

  archive.on("warning", err => {
    if (err.code === "ENOENT") {
      // log warning
      // eslint-disable-next-line no-console
      console.warn(err);
    } else {
      // throw error
      throw err;
    }
  });

  archive.on("error", err => {
    throw err;
  });

  archive.directory(path, ".");

  archive.finalize();

  return await zipStringPromise;
};

const main = async () => {
  const { agent, path, parent } = await handleArguments(program);
  const agentContent = await makeArchive(path);

  // Make Request
  const [operation] = await agent.importAgent({ parent, agentContent });
  await operation.promise();
};

const attachCommand = program => {
  program
    .command("import [path]")
    .description(
      "Zips and imports the files at the specified path into the dialogflow agent"
    )
    .action(() => {
      main();
    });
};

export default attachCommand;
