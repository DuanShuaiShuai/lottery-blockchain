const fs = require("fs");
const path = require("path");
const solc = require("solc");
const srcpath = path.resolve(__dirname,"Contract","Lottery.sol");
const source = fs.readFileSync(srcpath,"utf-8");
var output = solc.compile(source, 1);
module.exports= output.contracts[":Lottery"];
