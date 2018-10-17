var IpfsHash = artifacts.require("IpfsHash");

const deployIpfsHash = () => {
    return IpfsHash.new();
} 
contract('IpfsHash', function(accounts) {
  let instance
  beforeEach(async () => {
    instance = await deployIpfsHash();
    assert.ok(instance);
  });

  it("should upload Hash successfully", async function() {
    let rootHashID = "0x1";
    let rootHash = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';
    await instance.uploadHash(rootHashID, rootHash);
    let expectedHashIndex = await instance.rootHashIndexes(0);
    assert.equal(expectedHashIndex, "0x1000000000000000000000000000000000000000");
  });

  it("should download Hash successfully", async function() {
    let rootHashID = "0x1";
    let rootHash = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';
    await instance.uploadHash(rootHashID, rootHash);
    let expectedHashIndex = await instance.rootHashIndexes(0);
    assert.equal(expectedHashIndex, "0x1000000000000000000000000000000000000000");
    let expectedRootHash = await instance.downloadHash(rootHashID);
    assert.equal(expectedRootHash, 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4');
  });

})