import { readFileSync, writeFileSync } from 'fs';
import { resolve as _resolve } from 'path';
import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { platform } from 'os';

const packageJsonPath = _resolve(__dirname, 'package.json');

function getPackageJson() {
	const data = readFileSync(packageJsonPath, 'utf8');
	return JSON.parse(data);
}

function updatePackageJson(newVersion) {
	const packageJson = getPackageJson();
	packageJson.version = newVersion;
	writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

function incrementVersion(version, type) {
	const [major, minor, patch] = version.split('.').map(Number);
	switch (type) {
		case 'major':
			return `${major + 1}.0.0`;
		case 'minor':
			return `${major}.${minor + 1}.0`;
		case 'patch':
			return `${major}.${minor}.${patch + 1}`;
		case 'skip':
			return version;
	}
}

function logMessage(message, color, type) {
	const icons = {
		positive: '✔',
		negative: '✖',
		info: 'ℹ',
		alert: '⚠',
		loading: '⏳',
	};

	const icon = icons[type] || '';
	const colorCodes = {
		reset: '\x1b[0m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',
	};

	const colorCode = colorCodes[color] || colorCodes.reset;
	const resetCode = colorCodes.reset;
	const boxLine = `${colorCode}${'-'.repeat(message.length + 4)}${resetCode}`;

	console.log(boxLine);
	console.log(`${colorCode}${icon}  ${message}${resetCode}`);
	console.log(boxLine);
}

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

function askQuestion(query, defaultValue = '') {
	return new Promise(resolve => {
		rl.question(`? ${query}`, answer => {
			resolve(answer || defaultValue);
		});
	});
}

async function promptAlertsAndInfos() {
	logMessage('File to commit must be already staged', 'yellow', 'alert');
	const staged = await askQuestion(
		'Have you already staged the files to commit? Y (default) or N : ',
		'Y'
	);
	if (staged.toLowerCase() !== 'y') {
		logMessage('Please stage the files and run the script again', 'red', 'negative');
		process.exit(1);
	}
}

async function promptVersionUpdate() {
	logMessage(
		`Current version of root package.json is: ${getPackageJson().version}`,
		'green',
		'info'
	);

	let updateType;
	while (true) {
		updateType = await askQuestion(
			'Select the version update type major, minor, patch (default), or skip: ',
			'patch'
		);
		if (['major', 'minor', 'patch', 'skip'].includes(updateType)) {
			break;
		} else {
			logMessage(
				'Invalid input. Please enter "major", "minor", "patch", or "skip".',
				'red',
				'negative'
			);
		}
	}

	if (updateType === 'skip') return;
	updatePackageJson(incrementVersion(getPackageJson().version, updateType));
	execSync('git add package.json');

	logMessage(
		`Version updated of root package.json to ${getPackageJson().version}`,
		'green',
		'positive'
	);
}

async function promptCommitMessageAndPush() {
	let message;
	while (true) {
		message = await askQuestion('Enter a commit message: ');

		if (!message || message.length < 5) {
			logMessage(
				'Commit message must be at least 5 characters long',
				'red',
				'negative'
			);
		} else {
			break;
		}
	}

	logMessage(`Commit message set to: ${message}`, 'green', 'positive');
	const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
		encoding: 'utf8',
	}).trim();

	if (platform() === 'linux') {
		execSync(`echo ${currentBranch} | clip.exe`);
	} else {
		execSync(`echo ${currentBranch} | clip`);
	}

	logMessage(`Current branch "${currentBranch}" copy to clipboard`, 'blue', 'info');

	let branch;
	while (true) {
		branch = await askQuestion(
			`Enter the branch name; "${currentBranch}" (default): `,
			currentBranch
		);

		if (!branch) {
			logMessage('Error: No branch specified', 'red', 'negative');
			continue;
		}

		try {
			execSync(`git rev-parse --verify ${branch}`, { stdio: 'ignore' });
		} catch {
			logMessage(
				`Error: Branch ${branch} does not exist locally`,
				'red',
				'negative'
			);
			continue;
		}

		try {
			execSync(`git ls-remote --exit-code --heads origin ${branch}`, {
				stdio: 'ignore',
			});
		} catch {
			logMessage(
				`Error: Branch ${branch} does not exist on remote`,
				'red',
				'negative'
			);
			continue;
		}

		break;
	}

	// Check if there are any staged files to commit
	const stagedChanges = execSync('git diff --cached --name-only', {
		encoding: 'utf8',
	}).trim();
	if (!stagedChanges) {
		logMessage('No staged changes to commit', 'red', 'negative');
		process.exit(1);
	}

	execSync(`git commit -m "${message}"`);
	execSync(`git push origin ${branch}`);
	rl.close();

	return branch;
}

async function updateDevAndTest(branch) {
	let devBranch;

	try {
		// Determine the correct development branch name
		const branches = execSync('git branch', { encoding: 'utf8' });
		devBranch = branches.includes('development') ? 'development' : 'dev';

		logMessage(`Merging ${branch} into ${devBranch} and test`, 'magenta', 'loading');

		execSync(`git switch ${devBranch}`, { stdio: 'inherit' });
		execSync('git pull', { stdio: 'inherit' });
		execSync(`git merge ${branch}`, { stdio: 'inherit' });
		execSync('git push', { stdio: 'inherit' });
		logMessage(`Merged ${branch} into ${devBranch}`, 'green', 'positive');

		execSync('git switch test', { stdio: 'inherit' });
		execSync('git pull', { stdio: 'inherit' });
		execSync(`git merge ${devBranch}`, { stdio: 'inherit' });
		execSync('git push', { stdio: 'inherit' });
		logMessage(`Merged ${devBranch} into test`, 'green', 'positive');

		execSync(`git switch ${branch}`, { stdio: 'inherit' });
	} catch (error) {
		logMessage(
			`Error: Unable to merge ${branch} into ${devBranch} and test`,
			'red',
			'negative'
		);
		process.exit(1);
	}

	rl.close();
}

(async () => {
	await promptAlertsAndInfos();
	await promptVersionUpdate();
	const branch = await promptCommitMessageAndPush();
	await updateDevAndTest(branch);
})();
