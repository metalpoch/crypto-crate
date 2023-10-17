var Prueba = artifacts.require("Prueba");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Prueba);
};
