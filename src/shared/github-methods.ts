import fs from 'fs';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({

});

type Dir = {
	path: string;
	owner: string;
	repo: string;
};

export async function cloneDirectory({ owner, repo, path }: Dir) {
	// NOTE get repo content by folder path
	const { data } = await octokit.repos.getContent({
		owner,
		repo,
		path,
	});

	if (!Array.isArray(data)) {
		return;
	}

	for (const folder of data) {
		const { type, path } = folder;

		if (type === 'dir') {
			// NOTE create folder
			fs.mkdirSync(path, { recursive: true });
			await cloneDirectory({ owner, repo, path });
		} else if (type === 'file') {
			const { data: fileData } = await octokit.repos.getContent({
				owner,
				repo,
				path,
			});

			if (!('content' in fileData)) {
				return;
			}
			const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
			// NOTE create folder structure if not exist
			if (!fs.existsSync(path)) {
				const newFolderStructure = path.split('/').slice(0, -1).join('/');
				fs.mkdirSync(newFolderStructure, { recursive: true });
			}
			// NOTE create file
			fs.writeFileSync(fileData.path, content);
		}
	}
}

export async function seeAllFolder({ owner, repo, path }: Dir, depth = 1) {
	// NOTE get repo content by folder path
	const { data } = await octokit.repos.getContent({
		owner,
		repo,
		path,
	});

	if (!Array.isArray(data)) {
		return;
	}

	for (const folder of data) {
		const { type, path } = folder;

		if (type === 'dir') {
			const folderName = path.split('/').pop();
			console.log(
				`${'  '.repeat(depth)} ${folderName} -> npx isonfirecli copy ${path}`
			);
			await seeAllFolder({ owner, repo, path }, depth + 1);
		}
	}
}
