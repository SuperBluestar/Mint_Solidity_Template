import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  SetMetadata,
  UsePipes,
} from '@nestjs/common';
import { NftWhitelistService } from './nft-whitelist.service';
import { NftMerkleTreeService } from './nft-merkletree.service';
import { NftWhitelistDto } from './dto/nft-whitelist.dto';
import { NftMerkleRootDto, NftMerkleProofDto } from './dto/nft-merkleroot.dto';
import { ADMIN, MANAGER } from "src/roles.guard";
import { MerkleTree } from 'merkletreejs';
import { MerkleProofWalletValidationPipe } from './validation/walletAddressValidation.pipe';
//@ts-ignore
const keccak256 = require("keccak256");

@Controller('nft-merkletree')
export class NftMerkleTreeController {
  private merkleTree: MerkleTree;
  constructor(
      private nftWhitelistService: NftWhitelistService,
      private nftMerkleTreeService: NftMerkleTreeService,
  ) {
    void Promise.all([this.nftWhitelistService.findAll()]).then(([whitelist]) => {
      let leafNodes = whitelist.map(addr => keccak256(addr.walletAddress));
      this.merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    })
  }

  @Post()
  @SetMetadata('roles', [ ADMIN, MANAGER ])
  async generateMerkleRoot() {
    let whitelist: NftWhitelistDto[] = await this.nftWhitelistService.findAll();
    let leafNodes = whitelist.map(addr => keccak256(addr.walletAddress));
    this.merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    let root = this.merkleTree.getRoot();
    let totalCnt: number = await this.nftWhitelistService.count();
    let existings: NftMerkleRootDto[] = await this.nftMerkleTreeService.find();
    if (existings && existings.length > 0) {
        for(let singleExisting of existings) {
          await this.nftMerkleTreeService.delete(singleExisting);
        }
    }
    let saved: NftMerkleRootDto = await this.nftMerkleTreeService.registerMerkleRoot({
      merkleroot: root.toString('hex'),
      addressCount: totalCnt,
    });
    if (saved) {
      return {
        status: HttpStatus.CREATED,
        message: 'merkle root is registered successfully',
        content: saved,
      };
    } else {
      return {
          status: HttpStatus.CONFLICT,
          message: 'generating merkle root is failed, unfortuantely',
          content: saved,
      };
    }
  }

  @Get()
  @SetMetadata('roles', [ ADMIN, MANAGER ])
  async getMerkleRoot() {
    let existings: NftMerkleRootDto[] = await this.nftMerkleTreeService.find();
    if (existings && existings.length > 0) {
      return {
        status: HttpStatus.OK,
        message: 'Success',
        content: existings[0],
      };
    } else {
      return {
          status: HttpStatus.CONFLICT,
          message: 'Fail',
          content: existings,
      };
    }
  }

  @UsePipes(MerkleProofWalletValidationPipe)
  @Post("merkleproof")
  async getMerkleProof(@Body() nftMerkleProof: NftMerkleProofDto) {
    const leaf = keccak256(nftMerkleProof.walletAddress);
    const proof_1 = this.merkleTree.getProof(leaf)
    let proof = []
    for (let i = 0; i < proof_1.length; i ++) {
        proof.push(proof_1[i].data.toString('hex'))
    }
    if (this.merkleTree.verify(proof, leaf, this.merkleTree.getRoot())) {
      return {
        status: HttpStatus.OK,
        message: "Successfully get the merkle proof",
        content: proof
      }
    } else {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Failed to get merkle proof',
        content: "",
      };
    }
  }
}