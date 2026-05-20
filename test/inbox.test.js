const assert = require('assert');
const { ethers } = require('hardhat'); // Use Hardhat's built-in tools

describe('Inbox', () => {
    it('deploys a contract', async () => {
        // You will use the bytecode and abi you compiled earlier
        const { abi, evm } = require('../compile');
        
        // This is how you deploy using Hardhat/Ethers
        const Inbox = await ethers.getContractFactoryFromArtifact({
            abi: abi,
            bytecode: evm.bytecode.object
        });
        const inbox = await Inbox.deploy('Hi there!');
        
        assert.ok(inbox.target); // Verifies the contract has an address
    });
});