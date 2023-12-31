require('dotenv').config();

const { Web3 } = require('web3');
//const { signTransaction } = require('web3/lib/commonjs/eth.exports');
const apiKey = process.env['apiKey'];
const network = 'sepolia';

const node = `https://eth.getblock.io/${apiKey}/${network}`;
const web3 = new Web3(node);
//console.log(web3);

const createAccount = (user) => {
    user.account = web3.eth.accounts.create();
}

const user = {name: '', account: ''};
createAccount(user);
console.log(user.account.address);
const privateKey = process.env['privateKey'];
//console.log(privateKey);
const testAccount = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
console.log(testAccount)
const createSignedTx = async (rawTx) => {
    //rawTx.gas = await web3.eth.estimateGas(rawTx);
    try {
        return await testAccount.signTransaction(rawTx);
    } catch (error) {
        return error;
    }
}

const sendSignedTx = async (signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
}
const amount = '0.001'//ether
const rawTx = {
    from:testAccount.address,
    to: user.account.address,
    value: web3.utils.toWei(amount, 'ether'),
    gasPrice: "20000000000",
    gas: "21000",
    //gasPrice: await web3.eth.getGasPrice()
};
//createSignedTx(rawTx).then(console.log);
try {
    createSignedTx(rawTx).then(sendSignedTx);
} catch (error) {
    console.log(error);
}