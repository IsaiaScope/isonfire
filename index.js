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

fs.copy(folder, 'destinationFolder')
  .then(() => {
    console.log('Folder copied successfully.');

  })
  .catch((err) => {
    console.error('Error copying folder:', err);
  });
