var IpfsHash = artifacts.require("./IpfsHash.sol");

module.exports = function(deployer) {
  deployer.deploy(IpfsHash);
};
