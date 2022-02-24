// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftMint is ERC721Royalty, Ownable, ReentrancyGuard {
    using Strings for uint256;

    string private _baseUri = "";
    string private _baseExtension = ".json";
    uint24 private _currentTokenId = 0;
    uint24 private _totalSupply = 1000000; // uint24 (0 ~ 16,777,215)
    uint64 private _cost = 0.01 ether; // uint64 (0 ~ 18,446,744,073,709,551,615)

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseUri_
    ) ERC721(name_, symbol_) {
        require(bytes(baseUri_).length > 0, "NftMint: cannot empty string");
        _baseUri = baseUri_;
    }

    function mint(uint8 mintAmount_) internal {
        for (uint8 i = 1; i <= mintAmount_; i ++) {
            _safeMint(_msgSender(), _currentTokenId + i);
        }
        _currentTokenId += mintAmount_;
        require(_currentTokenId <= _totalSupply, "NftMint: Total NFTs are sold out");
    }

    // Public
    function publicMint(uint8 mintAmount_) external nonReentrant payable {
        require(msg.value >= _cost * mintAmount_, "NftMint: payment is not enough");
        mint(mintAmount_);
    }

    // Views
    function totalSupply() external view returns (uint24) {
        return _totalSupply;
    }

    function currentSupply() external view returns (uint24) {
        return _currentTokenId;
    }

    function cost() external view returns (uint64) {
        return _cost;
    }

    // @Overrides
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return bytes(_baseUri).length > 0 ? string(abi.encodePacked(_baseUri, tokenId.toString(), _baseExtension)) : "";
    }

    // Owners: BaseUri
    function getBaseUri() external onlyOwner view returns (string memory) {
        return _baseUri;
    }
    function setBaseUri(string memory baseUri_) external onlyOwner {
        require(bytes(baseUri_).length > 0, "NftMint: cannot empty string");
        _baseUri = baseUri_;
    }
    // Owners: BaseExtension
    function getBaseExtension() external onlyOwner view returns (string memory) {
        return _baseExtension;
    }
    function setBaseExtension(string memory baseExtension_) external onlyOwner {
        require(bytes(baseExtension_).length > 0, "NftMint: cannot empty string");
        _baseExtension = baseExtension_;
    }
    // Owners: TotalSupply
    function setTotalSupply(uint24 totalSupply_) external onlyOwner {
        require(totalSupply_ > 0, "NftMint: cannot set as zero");
        _totalSupply = totalSupply_;
    }
    // Owners: Cost
    function setCost(uint64 cost_) external onlyOwner {
        _cost = cost_;
    }

    function balance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdraw() external onlyOwner {
        require(payable(_msgSender()).send(address(this).balance));
    }
}