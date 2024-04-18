console.log('Hello, world!');
import fs from 'fs';
import { Octokit } from '@octokit/rest';
import { Command } from 'commander';
import { GITHUB_INFO } from '../models/github-info.js';

// const {OWNER, REPO} = GITHUB_INFO

console.log(`🧊 ~ PKG_VERSION: `, PKG_VERSION);

export const program = new Command();

program.version(PKG_VERSION);


// Create an Octokit instance
const octokit = new Octokit();
// Define the repository owner, repository name, and folder path
const owner = 'IsaiaScope'; // Replace with the repository owner's username or organization name
const repo = 'isonfireCLI'; // Replace with the repository name
const folderPath = 'data'; // Replace with the path to the folder in the repository

// // Function to fetch and copy each file from the GitHub repository
// async function fetchAndCopyFiles() {
//   try {
//     // Get the contents of the folder from the GitHub repository
//     const { data }: any = await octokit.repos.getContent({
//       owner,
//       repo,
//       path: folderPath,
//     });
//     console.log(`🧊 ~ data: `, data);

//     // Iterate through each file in the folder
//     for (const file of data) {
//       console.log(`🧊 ~ file2: `, file.path);
//       // Fetch the content of each file
//       const { data: fileContent }: any = await octokit.repos.getContent({
//         owner,
//         repo,
//         path: file.path,
//       });
    
//       fs.writeFileSync(`copy-folder/${file.name}`, Buffer.from(fileContent.content, 'base64'));
      
//       console.log(`File "${file.name}" copied successfully.`);
//     }

//     console.log('All files copied successfully.');
//   } catch (error: any) {
//     console.error('Error fetching or copying files:', error.message);
//   }
// }

// // Call the fetchAndCopyFiles function
// fetchAndCopyFiles();


const dir = 'data';

async function cloneDirectory(owner: string, repo: string, dir: string) {
  const { data }: any = await octokit.repos.getContent({ owner, repo, path: dir });

  for (const item of data) {
    console.log(`🧊 ~ item: `, item);
    if (item.type === 'dir') {
      fs.mkdirSync(item.path, { recursive: true });
      await cloneDirectory(owner, repo, item.path);
    } else if (item.type === 'file') {
      const { data: fileData }: any = await octokit.repos.getContent({ owner, repo, path: item.path });
      const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
      fs.writeFileSync(item.path, content);
    }
  }
}

cloneDirectory(owner, repo, dir).catch(console.error);