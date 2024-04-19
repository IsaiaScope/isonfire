import { Command } from 'commander';
import { configOnFire } from '../../shared/store.js';

export const add = new Command('add');

add
	.name('add')
	.description('add personal access token for GitHub API')
	.requiredOption('-t, --token <token>', 'input token')
	.action(({ token }) => {
		configOnFire.set('token', token);
		console.log(`[Token path] -> ${configOnFire.path}`);
		console.log(`[Token] -> ${configOnFire.get('token')}`);
	});
