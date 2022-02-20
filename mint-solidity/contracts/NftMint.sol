// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract NftMint is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;

    string private _baseUri = "";
    string private _baseExtension = ".json";
    uint16 private _totalSupply = 65535;
    uint16 private _currentTokenId = 0;
    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseUri_
    ) ERC721(name_, symbol_) {
        setBaseUri(baseUri_);
    }

    // Public
    function mint() public nonReentrant returns (bool) {
        console.log("Msgsender: ", _msgSender());
        require(_currentTokenId < _totalSupply, "NftMint: Total NFTs are sold out");
        _currentTokenId ++;
        _safeMint(_msgSender(), _currentTokenId);
        return true;
    }

    function totalSupply() public view returns (uint16) {
        return _totalSupply;
    }

    function currentSupply() public view returns (uint16) {
        return _currentTokenId;
    }

    // @Overrides
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseUri;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), _baseExtension)) : "";
    }

    // Owners: BaseUri
    function getBaseUri() public onlyOwner view returns (string memory) {
        return _baseUri;
    }
    function setBaseUri(string memory baseUri_) public onlyOwner returns (bool) {
        require(bytes(baseUri_).length > 0, "NftMint: cannot empty string");
        _baseUri = baseUri_;
        return true;
    }
    // Owners: BaseExtension
    function getBaseExtension() public onlyOwner view returns (string memory) {
        return _baseUri;
    }
    function setBaseExtension(string memory baseExtension_) public onlyOwner returns (bool) {
        _baseExtension = baseExtension_;
        return true;
    }
    // Owners & Users: TotalSupply
    function setTotalSupply(uint16 totalSupply_) public virtual returns (bool) {
        _totalSupply = totalSupply_;
        return true;
    }
}