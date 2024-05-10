// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
    uint256 public constant MAX_NFT_SUPPLY = 99999999999999;

    constructor() ERC721("MyNFT", "MNFT") {}

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mintNFT() public {
        uint256 tokenId = totalSupply();
        require(tokenId <= MAX_NFT_SUPPLY, "All blocks have been minted.");

        string memory svg = string(
            abi.encodePacked(
                "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 256 256'><style>.text { fill: white; font-family: serif; font-size: 36px; }</style><rect width='100%' height='100%' fill='black' />",
                "<text x='50%' y='50%' class='text' dominant-baseline='middle' text-anchor='middle'>",
                Strings.toString(tokenId),
                "</text></svg>"
            )
        );

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                '"MyNFT #',
                Strings.toString(tokenId),
                '", "description": "A collection of numbers, maximum "',
                MAX_NFT_SUPPLY,
                ', "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(svg)),
                '"}'
            )
        );

        string memory uri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            tokenId,
            msg.sender
        );
    }

    function getOwnerNFTs(
        uint256 pageNo,
        uint256 pageSize
    ) public view returns (string[2][] memory) {
        uint256 total = balanceOf(msg.sender);
        uint256 start = (pageNo - 1) * pageSize;
        uint256 end = (pageNo * pageSize) > total ? total : pageNo * pageSize;
        string[2][] memory pairs = new string[2][](end - start);

        uint256 index = start;
        while (index < end) {
            uint256 tokenId = tokenOfOwnerByIndex(msg.sender, index);
            pairs[index] = [Strings.toString(tokenId), tokenURI(tokenId)];
            index += 1;
        }

        return pairs;
    }
}
