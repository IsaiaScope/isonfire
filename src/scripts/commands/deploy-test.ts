import { Command } from 'commander';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deployTest = new Command('deploy-test');

deployTest
  .name('deploy-test')
  .description('Run the deploy-test.cjs script')
  .action(() => {
    const scriptPath = path.resolve(__dirname, '../../../data-on-fire/scripts/deploy-test.cjs');
    execSync(`node ${scriptPath}`, { stdio: 'inherit' });
  });