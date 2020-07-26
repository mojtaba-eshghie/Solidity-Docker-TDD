const assert = require('assert')
const ganache = require('ganache-cli')

// Web3 is a constructor function, so, it is uppercased
const Web3 = require('web3')

const contract_output = require(`../compile`)
const {abi, evm} = contract_output['Inbox']
const bytecode = evm["bytecode"]

//console.log(abi)
//console.log("===========================================================")
//console.log(bytecode)

 

// This one is an instance of Web3 
const web3 = new Web3(ganache.provider())


// Let's define a global accounts variable
let accounts
let inbox


// Use one of those accounts to deploy the contract
beforeEach(async () => {
    // Get a list of all accounts 
    // Every function that you call within web3 is an async function, meaning that 
    // it will return a promise!
    /*
    web3.eth.getAccounts()
        .then((fetchedAccounts) => {
            console.log(fetchedAccounts)
        })
    */

    // Rather than using promises, let's use async/await syntax!
    // Remember to label the sorounding function as the async (callback of beforeEach)
    accounts = await web3.eth.getAccounts()
    
    

    // Let's deploy the contract!
    // Remember that in this case the abi itself is a js object (no need to JSON.parse to convert json to js obj then)
    
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode.object,
            arguments: ["Hi  There!"]
        })
        .send({ 
            from: accounts[0],
            gas: '1000000' 
        })
});

describe('Inbox Smart Contract Tests', () => {
    
    it('Checks to see if the accounts are fetched successfully from ganache (using web3.eth.getAccounts promise)', () => {
        console.log(inbox)
    })

})