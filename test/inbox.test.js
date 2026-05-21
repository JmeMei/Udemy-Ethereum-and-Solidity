const assert = require('assert'); //Loads the built-in node.js tools
const { ethers } = require('hardhat'); // Use Hardhat's built-in tools, loads the ethers library, a standard tool to talk to Ethereum

// describe('Inbox', () => {
//     it('deploys a contract', async () => {
//         // You will use the bytecode and abi you compiled earlier
//         const { abi, evm } = require('../compile');
        
//         // This is how you deploy using Hardhat/Ethers
//         const Inbox = await ethers.getContractFactoryFromArtifact({
//             abi: abi,
//             bytecode: evm.bytecode.object
//         });
//         const inbox = await Inbox.deploy('Hi there!');
        
//         assert.ok(inbox.target); // Verifies the contract has an address
//     });
// });

it('deploys a contract', async () => {
    const { abi, evm } = require('../compile');
    
    // Create the factory using the abi and bytecode directly
    const Inbox = await ethers.getContractFactory(abi, evm.bytecode.object);
    const inbox = await Inbox.deploy('Hi there!');
    
    // In newer ethers (v6+), wait for the deployment to finish
    await inbox.waitForDeployment();
    
    // Verify the address
    assert.ok(inbox.target); 
});

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car; 
beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
});