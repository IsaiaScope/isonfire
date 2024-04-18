import { Command } from 'commander';
import { GITHUB_INFO } from '../../models/github-info.js';
import { cloneDirectory } from '../../shared/github-methods.js';

const { OWNER, REPO, REPO_FOLDER_DATA } = GITHUB_INFO;

export const copy = new Command('copy');

copy
.name('copy')
	.description('Copy from GitHub repository')
	.argument('[directory]', 'Directory to copy')
	.argument('[owner]', 'Repository owner')
	.argument('[repo]', 'Repository name')
	.option('-d, --directory <directory>', 'Folder to copy', REPO_FOLDER_DATA)
	.option('-o, --owner <owner>', 'Repository owner')
	.option('-r, --repo <repo>', 'Repository name')
	.action(async (directory, owner = OWNER, repo = REPO) => {
		await cloneDirectory({ owner, repo, directory }).catch(console.error);
	});
