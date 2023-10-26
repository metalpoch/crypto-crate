var Cratenaut = artifacts.require("CratenautContract");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Cratenaut);
};
