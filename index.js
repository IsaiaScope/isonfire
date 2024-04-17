#!/usr/bin/env node

const axios = require('axios');
const download = require('download-git-repo');
const fs = require('fs-extra');
const { Command } = require('commander');

const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool to clone a folder from a GitHub repository.')
  .option('-u, --user <username>', 'GitHub username')
  .option('-r, --repo <repository>', 'GitHub repository name')
  .option('-f, --folder <folder>', 'Folder to clone')
  .parse(process.argv);

const { user, repo, folder } = program;
console.log(`🧊 ~ program: `, user, repo, folder);

if (!user || !repo || !folder) {
  console.error('Please provide GitHub username, repository name, and folder name.');
  process.exit(1);
}

const githubUrl = `https://api.github.com/repos/${user}/${repo}/contents/${folder}`;

axios.get(githubUrl)
  .then(response => {
    const files = response.data;
    const folderPath = `${user}-${repo}-${folder}`;
    download(`${user}/${repo}`, folderPath, { clone: true }, error => {
      if (error) {
        console.error('Error cloning repository:', error);
        return;
      }
      console.log('Repository cloned successfully.');
      files.forEach(file => {
        const url = file.download_url;
        const fileName = file.name;
        axios.get(url, { responseType: 'arraybuffer' })
          .then(response => {
            fs.writeFileSync(`${folderPath}/${fileName}`, response.data);
          })
          .catch(error => {
            console.error('Error downloading file:', error);
          });
      });
    });
  })
  .catch(error => {
    console.error('Error fetching folder contents from GitHub:', error);
  });

