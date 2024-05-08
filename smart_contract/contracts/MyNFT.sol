// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("MyNFT", "SQUARE") {}

    function mintNFT() public {
        require(_tokenIds <= 99999999999999, "Maximum NFTs have been minted");

        uint256 itemId = _tokenIds;
        string
            memory svg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 256 256'><style>.text { fill: white; font-family: serif; font-size: 36px; }</style><rect width='100%' height='100%' fill='black' />";
        svg = string(
            abi.encodePacked(
                svg,
                "<text x='50%' y='50%' class='text' dominant-baseline='middle' text-anchor='middle'>",
                Strings.toString(itemId),
                "</text></svg>"
            )
        );

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                '"MyNFT #',
                Strings.toString(itemId),
                '", "description": "A collection of numbers, maximum 99999999999999", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(svg)),
                '"}'
            )
        );

        string memory tokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, itemId);
        _setTokenURI(itemId, tokenUri);

        ++_tokenIds;
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            itemId,
            msg.sender
        );
    }
}
