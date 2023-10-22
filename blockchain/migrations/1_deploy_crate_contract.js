var CrateContract = artifacts.require("CrateContract");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(CrateContract);
};
