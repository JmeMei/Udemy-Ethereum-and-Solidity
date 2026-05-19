const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
	language: 'Solidity',
	sources: {
		'Inbox.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['abi', 'evm.bytecode.object'],
			},
		},
	},
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
	for (const error of output.errors) {
		console.log(error.formattedMessage);
	}
}

if (!output.contracts || !output.contracts['Inbox.sol'] || !output.contracts['Inbox.sol'].Inbox) {
	throw new Error('Compilation failed.');
}

console.log(JSON.stringify(output.contracts['Inbox.sol'].Inbox, null, 2));
