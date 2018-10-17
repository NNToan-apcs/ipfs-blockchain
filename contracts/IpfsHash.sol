pragma solidity ^0.4.23;

import '/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract IpfsHash is Ownable {
    // Variables
    mapping(bytes20 => string) rootHashes;
    bytes20[] public rootHashIndexes;

    // CONSTRUCTOR
    constructor() public {
    }

    // MODIFIERS
    modifier HashIsExist(bytes20 rootHashID) {
        require(keccak256(rootHashes[rootHashID]) != keccak256('')); 
        _;
    }
    
    modifier HashIsNotExist(bytes20 rootHashID) {
        require(keccak256(rootHashes[rootHashID]) == keccak256('')); 
        _;
    }
    
    modifier HashIsValid(string rootHash)
    {
        require(keccak256(rootHash) != keccak256(''));
        _;
    }
    // EVENTS
    event RootHashUploaded(bytes20 ID, string value);
    // FUNCTION
    function uploadHash(bytes20 rootHashID, string rootHash)
        public
        HashIsNotExist(rootHashID)
        HashIsValid(rootHash)
    {
        rootHashes[rootHashID] = rootHash;
        rootHashIndexes.push(rootHashID);
        emit RootHashUploaded(rootHashID, rootHash);
    }

    function downloadHash(bytes20 rootHashID) 
        view
        public 
        HashIsExist(rootHashID) 
        returns(string)
    {
        return rootHashes[rootHashID];
    }
}