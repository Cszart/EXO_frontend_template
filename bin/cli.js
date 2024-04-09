#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const runCommand = (command) => {
	try {
		execSync(`${command}`, { stdio: 'inherit' });
	} catch (e) {
		console.error(`Failed to execute ${command}`, e);
		return false;
	}
	return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/Cszart/frontend-EXO-template ${repoName}`;
const installDepsCommand = `cd ${repoName} && yarn install`;

console.log(`Cloning the repository with name ${repoName}`);

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log(
	'Congratulations! You are ready. Follow the following commands to start'
);
console.log(`cd ${repoName} && yarn dev`);
