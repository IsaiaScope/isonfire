import { Command } from 'commander';
import { GITHUB_INFO } from '../../types/github-info.js';
import { cloneDirectory } from '../../shared/github-methods.js';

const { OWNER, REPO, REPO_FOLDER_DATA } = GITHUB_INFO;

export const copy = new Command('copy');

copy
	.name('copy')
	.description('Copy from GitHub repo, default is data-on-fire folder')
	.argument('[path]', 'Directory path to copy')
	.option('-p, --path <path>', 'Folder path to copy')
	.action(async (path = REPO_FOLDER_DATA) => {
		await cloneDirectory({ owner: OWNER, repo: REPO, path }).catch(console.error);
		console.log(`${path} Copied`);
	});
