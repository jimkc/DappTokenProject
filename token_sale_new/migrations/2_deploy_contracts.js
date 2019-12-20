const DappToken = artifacts.require("./DappToken.sol"); //The root is set to contracts dir

module.exports = function(deployer) {
  deployer.deploy(DappToken, 1000000);
};
