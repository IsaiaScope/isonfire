#!/usr/bin/env node
console.log('Hello, world!');

import fs from 'fs';
import { Octokit } from '@octokit/rest';
console.log(`🧊 ~ process: `, process.env.USERNAME);

// Create an Octokit instance
const octokit = new Octokit();
// Define the repository owner, repository name, and folder path
const owner = 'IsaiaScope'; // Replace with the repository owner's username or organization name
const repo = 'isonfireCLI'; // Replace with the repository name
const folderPath = 'data/types'; // Replace with the path to the folder in the repository

// Function to fetch and copy each file from the GitHub repository
async function fetchAndCopyFiles() {
  try {
    // Get the contents of the folder from the GitHub repository
    const { data }: any = await octokit.repos.getContent({
      owner,
      repo,
      path: folderPath,
    });

    // Iterate through each file in the folder
    for (const file of data) {
      console.log(`🧊 ~ file2: `, file.path);
      // Fetch the content of each file
      const { data: fileContent }: any = await octokit.repos.getContent({
        owner,
        repo,
        path: file.path,
      });

      // Write the content of the file to a new file in the local directory
      fs.writeFileSync(file.name, Buffer.from(fileContent.content, 'base64'));
      
      console.log(`File "${file.name}" copied successfully.`);
    }

    console.log('All files copied successfully.');
  } catch (error: any) {
    console.error('Error fetching or copying files:', error.message);
  }
}

// Call the fetchAndCopyFiles function
fetchAndCopyFiles();



