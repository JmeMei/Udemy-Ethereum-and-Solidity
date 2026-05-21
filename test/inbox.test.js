const assert = require('assert'); //Loads the built-in node.js tools
const { ethers } = require('hardhat'); // Use Hardhat's built-in tools, loads the ethers library, a standard tool to talk to Ethereum

//npx hardhat test --show-stack-traces
describe("Inbox", () => {
  let accounts;

  beforeEach(async () => { //async to ensure we wait for the accounts to be fetched before running tests
    // Hardhat provides a list of pre-funded accounts automatically
    accounts = await ethers.getSigners(); //Instead of web3.eth.getAccounts(), we use ethers.getSigners() to get the list of accounts provided by Hardhat. This returns an array of Signer objects, which represent the accounts and allow us to interact with them (e.g., send transactions).
    
    // Equivalent to your console.log(fetchedAccounts)
    // We print the address of the first account to verify it's connected
    console.log("Using account:", accounts[0].address);
  });

  it("deploys a contract", async () => {
    // Using your compiled code
    const { abi, evm } = require('../compile');
    
    // Create the factory
    const Inbox = await ethers.getContractFactory(abi, evm.bytecode.object);
    
    // Deploy
    const inbox = await Inbox.deploy('Hi there!');
    await inbox.waitForDeployment();
    
    // Assert
    assert.ok(inbox.target);
  });
});

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

// it('deploys a contract', async () => {
//     const { abi, evm } = require('../compile');
    
//     // Create the factory using the abi and bytecode directly
//     const Inbox = await ethers.getContractFactory(abi, evm.bytecode.object);
//     const inbox = await Inbox.deploy('Hi there!');
    
//     // In newer ethers (v6+), wait for the deployment to finish
//     await inbox.waitForDeployment();
    
//     // Verify the address
//     assert.ok(inbox.target); 
// });

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car; 
// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });