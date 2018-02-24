#!/usr/bin/env node
const archiver = require("archiver");
const program = require("commander");
const getRawBody = require("raw-body");

const { handleArguments } = require("./globalFlags");

// Given a path, compress the files at the path and make a string of the
// contents.
const makeArchive = async path => {
  const archive = archiver("zip", {});
  const zipStringPromise = getRawBody(archive);

  archive.on("warning", err => {
    if (err.code === "ENOENT") {
      // log warning
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

main();
