const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "soap deny clerk dial enforce sell decade bulb kitchen tank slot poverty"; // 12 word mnemonic
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/6c856ca626e0466e916528000e3f29c0");
let web3 = new Web3(provider);
let{interface,bytecode}=require("./compile");
deploy=async()=>{
    const accounts =await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode,
        })
        .send({
            from:accounts[0],
            gas:"1000000"
        });
    console.log(result.options.address);
    console.log(interface);
}
deploy();