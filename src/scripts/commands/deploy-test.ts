import { Command } from 'commander';
import { execSync } from 'child_process';
import path from 'path';

export const deployTest = new Command('deploy-test');

deployTest
	.name('deploy-test')
	.description('Run the deploy-test.js script')
	.action(() => {
		const scriptPath = path.resolve(
			__dirname,
			'../../../data-on-fire/scripts/deploy-test.js'
		);
		execSync(`node ${scriptPath}`, { stdio: 'inherit' });
	});
