#!/usr/bin/env node

import { Command } from "commander"
import { copy } from './commands/copy.js';
import { see } from './commands/see.js';


export const program = new Command();

program
	.version(PKG_VERSION, '-v, --version', 'check CLI version')
	.name(PKG_NAME)
	.description('Copy from GitHub repository https://github.com/IsaiaScope/isonfireCLI');


program.addCommand(copy).addCommand(see);


program.parse(process.argv);

