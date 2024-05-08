// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract MyEpicNFT is ERC721 {
    uint256 private _tokenIds;

    constructor() ERC721("SquareNFT", "SQUARE") {}

    function makeAnEpicNFT() public {
        uint256 newItemId = _tokenIds;
        _safeMint(msg.sender, newItemId);
        tokenURI(newItemId);
        ++_tokenIds;
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        bool ok = ownerOf(_tokenId) == msg.sender;
        require(ok, "You are not the owner of this NFT");
        return "blah";
    }
}
