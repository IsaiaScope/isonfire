#!/usr/bin/env node

import { Command } from 'commander';
import { copy } from './commands/copy.js';
import { see } from './commands/see.js';
import { add } from './commands/add.js';
import { deployTest } from './commands/deploy-test.js';

export const program = new Command();

program
	.version(PKG_VERSION, '-v, --version', 'check CLI version')
	.name(PKG_NAME)
	.description(
		'Copy from GitHub repository https://github.com/IsaiaScope/isonfireCLI'
	);

program.addCommand(copy).addCommand(see).addCommand(add).addCommand(deployTest);

program.parse(process.argv);
