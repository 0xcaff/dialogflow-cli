const importCommand = require("./import");
const exportCommand = require("./export");

const commands = {
  importCommand,
  exportCommand
};

const registerCommands = program =>
  Object.entries(commands).forEach(([key, value]) => value(program));

module.exports = {
  registerCommands
};
