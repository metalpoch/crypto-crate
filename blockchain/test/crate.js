const CrateContract = artifacts.require("CrateContract");

contract("CrateContract", () => {
  let wallet;
  before(async () => {
    this.crateContract = await CrateContract.deployed();
  });

  it("should migrate deployed successfully", async () => {
    const address = await this.crateContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("should create the genesis crate", async () => {
    const genesis = await this.crateContract.crates(0);
    wallet = genesis.owner;

    assert.equal(
      genesis.title,
      "Genesis",
      "the title of the 'genesis' crate is not the corresponding one"
    );
    assert.equal(genesis.premium, true, "'genesis' crate must be premium");
    assert.equal(
      genesis.isSalable,
      false,
      "the 'genesis' crate cannot be salable"
    );
    assert.equal(
      genesis.amount.toNumber(),
      genesis.id.toNumber(),
      "the 'genesis' crate must have the same cost as the index"
    );
  });

  it("should create a new crate", async () => {
    const crate = await this.crateContract.createCrate(
      "New crate",
      "Any Description",
      "Also URL",
      false,
      0,
      false
    );
    const counter = await this.crateContract.crateCounter();
    const infoCrate = await crate.logs[0].args;

    assert.equal(counter.toNumber(), infoCrate.id.toNumber());
    assert.equal(infoCrate.title, "New crate");
    assert.equal(infoCrate.description, "Any Description");
    assert.equal(infoCrate.imageUrl, "Also URL");
    assert.equal(infoCrate.premium, false);
    assert.equal(infoCrate.amount, 0);
    assert.equal(infoCrate.isSalable, false);
  });

  it("should update the last crate", async () => {
    const counter = await this.crateContract.crateCounter();
    const crate = await this.crateContract.updateCrate(
      counter - 1,
      "Pixel Art",
      "Pixel Art de Keiber usado en https://pochland.com.ve",
      "https://pochland.com.ve/assets/KeiberUrbila.webp",
      true,
      999999000000000,
      true
    );

    const infoCrate = crate.logs[0].args;

    assert.equal(counter.toNumber(), infoCrate.id.toNumber());
    assert.equal(infoCrate.title, "Pixel Art");
    assert.equal(
      infoCrate.description,
      "Pixel Art de Keiber usado en https://pochland.com.ve"
    );
    assert.equal(
      infoCrate.imageUrl,
      "https://pochland.com.ve/assets/KeiberUrbila.webp"
    );
    assert.equal(infoCrate.premium, true);
    assert.equal(infoCrate.amount, 999999000000000);
    assert.equal(infoCrate.isSalable, true);
  });

  it("should return the last crate", async () => {
    const counter = await this.crateContract.crateCounter();
    const crate = await this.crateContract.crates(counter.toNumber() - 1);

    assert.equal(counter.toNumber(), 2);
    assert.equal(crate.title, "Pixel Art");
    assert.equal(
      crate.description,
      "Pixel Art de Keiber usado en https://pochland.com.ve"
    );
    assert.equal(
      crate.imageUrl,
      "https://pochland.com.ve/assets/KeiberUrbila.webp"
    );
    assert.equal(crate.premium, true);
    assert.equal(crate.amount, 999999000000000);
    assert.equal(crate.isSalable, true);
  });

  it("should return a list by owner", async () => {
    const crates = await this.crateContract.getCratesByOwner(wallet);
    assert.equal(crates.length, 2);
    assert.equal(crates[0].length, 11);
    assert.equal(crates[1].length, 11);
  });
});
