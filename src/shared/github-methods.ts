import fs from 'fs';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
	auth: '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',
});

export async function cloneDirectory({
	owner,
	repo,
	directory,
}: {
	owner: string;
	repo: string;
	directory: string;
}) {
	const { data }: any = await octokit.repos.getContent({
		owner,
		repo,
		path: directory,
	});

	for (const folder of data) {
		const { type, path } = folder;

		if (type === 'dir') {
			fs.mkdirSync(path, { recursive: true });
			await cloneDirectory({ owner, repo, directory: path });
		} else if (type === 'file') {
			const { data: fileData }: any = await octokit.repos.getContent({
				owner,
				repo,
				path,
			});
			const content = Buffer.from(fileData.content, 'base64').toString('utf-8');

			if (!fs.existsSync(path)) {
				const newFolderStructure = path.split('/').slice(0, -1).join('/');
				fs.mkdirSync(newFolderStructure, { recursive: true });
			}

			fs.writeFileSync(fileData.path, content);
		}
	}
}

export async function seeAllFolder(params: any) {}
