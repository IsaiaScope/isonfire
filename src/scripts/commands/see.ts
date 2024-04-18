import { Command } from 'commander';
import { GITHUB_INFO } from '../../types/github-info.js';
import { seeAllFolder } from '../../shared/github-methods.js';

const { OWNER, REPO, REPO_FOLDER_DATA } = GITHUB_INFO;

export const see = new Command('see');

see
	.name('see')
	.description('See all paths from GitHub repository')
	.action(async () => {
		await seeAllFolder({ owner: OWNER, repo: REPO, path: REPO_FOLDER_DATA }).catch(
			console.error
		);
	});
