import importCommand from "./import";
import exportCommand from "./export";

const commands = [importCommand, exportCommand];

export const registerCommands = program =>
  commands.forEach(registerCommand => registerCommand(program));
