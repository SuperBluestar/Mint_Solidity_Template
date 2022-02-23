import { Injectable } from '@nestjs/common';
import { INftMerkleRoot } from './interfaces/nft-merkleroot.interface';
import { NftMerkleRootDto } from './dto/nft-merkleroot.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NftMerkleRoot } from './schemas/nft-merkleroot.schema';

@Injectable()
export class NftMerkleTreeService {
  constructor(
    @InjectModel(NftMerkleRoot.name)
    private readonly nftMerkleRootModel: Model<INftMerkleRoot>,
  ) {}

  /**
   * CREATE
   * @param NftMerkleRootDto 
   */
  async registerMerkleRoot(
    nftMerkleRootDto: NftMerkleRootDto,
  ): Promise<INftMerkleRoot> {
    const createdNftMerkle = new this.nftMerkleRootModel(
        nftMerkleRootDto,
    );
    return await createdNftMerkle.save();
  }

  /**
   * READ
   * @param NftMerkleRootDto 
   */
  async find(): Promise<INftMerkleRoot[]> {
    return await this.nftMerkleRootModel.find();
  }

  /**
   * UPDATE
   * Not use in here
   */
  async update(nftMerkleRootDto: NftMerkleRootDto): Promise<any> {
    return await this.nftMerkleRootModel.updateMany(
        {
            "createAt": nftMerkleRootDto.createdAt
        }, {
            "$set": nftMerkleRootDto
        }
    );
  }

  /**
   * DELETE
   */
  async delete(nftMerkleRootDto: NftMerkleRootDto): Promise<any> {
    return await this.nftMerkleRootModel.remove({
        merkleroot: nftMerkleRootDto.merkleroot
    })
  }
}