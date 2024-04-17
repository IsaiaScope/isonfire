#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const download = require('download-git-repo');
const { Command } = require('commander');

const program = new Command();

program
  .description('An application for pizza ordering')
  .option('-f, --folder <folder>', 'Folder to clone')
  .parse();

const { folder } = program.opts();
console.log(`🧊 ~ folder: `, folder);

const sourceFolder = path.join(require.resolve('isonfirecli'), '..', 'src/types');
console.log(`🧊 ~ sourceFolder: `, sourceFolder);

// Define the destination folder in your local project directory
const destinationFolder = path.join(__dirname, 'ffrrrrrrrrrrtFolder');

// Copy the folder
fs.copy(sourceFolder, destinationFolder)
  .then(() => {
    console.log('Folder copied successfully.');
  })
  .catch((err) => {
    console.error('Error copying folder:', err);
  });
