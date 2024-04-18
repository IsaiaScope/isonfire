#!/usr/bin/env node

import { Command } from "commander"
import { copy } from './commands/copy.js';


export const program = new Command();

program
	.version(PKG_VERSION, '-v, --version', 'check CLI version')
	.name(PKG_NAME)
	.description('isonfireCLI to copy from GitHub repository');


program.addCommand(copy)


program.parse(process.argv);

