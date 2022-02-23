import { Injectable } from '@nestjs/common';
import { INftWhitelist } from './interfaces/nft-whitelist.interface';
import { NftWhitelistDto } from './dto/nft-whitelist.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NftWhitelist } from './schemas/nft-whitelist.schema';

@Injectable()
export class NftWhitelistService {
  constructor(
    @InjectModel(NftWhitelist.name)
    private readonly nftWhitelistModel: Model<INftWhitelist>,
  ) {}

  /**
   * CREATE
   * @param nftWhitelistDto 
   */
  async registerWalletAddress(
    nftWhitelistDto: NftWhitelistDto,
  ): Promise<INftWhitelist> {
    const createdNftWhitelist = new this.nftWhitelistModel(
      nftWhitelistDto,
    );
    return await createdNftWhitelist.save();
  }

  /**
   * READ
   * @param payload 
   */
  async findOne(payload: NftWhitelistDto): Promise<INftWhitelist> {
    return await this.nftWhitelistModel.findOne({
        walletAddress: payload.walletAddress,
    });
  }

  async findByWalletAddress(payload: string): Promise<INftWhitelist> {
    return await this.nftWhitelistModel.findOne({
      walletAddress: payload,
    })
  }

  async findAll(): Promise<INftWhitelist[]> {
    return await this.nftWhitelistModel.find();
  }

  async findByPaginate(page: number, countperpage: number, search: string): Promise<INftWhitelist[]> {
    return await this.nftWhitelistModel.find(
      { 
        walletAddress: { $regex: search, $options: "i" }
      }, 
      {}, 
      { 
        skip: (page - 1) * countperpage, 
        limit: countperpage 
      }
    );
  }

  async count(): Promise<number> {
    return await this.nftWhitelistModel.count();
  }

  /**
   * Delete
   */
  async removeWalletAddress(nftWhitelistDto: NftWhitelistDto): Promise<any> {
    return await this.nftWhitelistModel.updateMany(
      {
        "walletAddress": nftWhitelistDto.walletAddress
      }, {
        "$set": {
          "walletAddress": nftWhitelistDto.walletAddress,
          "allowed": 0
        }
      }
    );
  }
  async forceRemoveWalletAddress(nftWhitelistDto: NftWhitelistDto): Promise<any> {
    return await this.nftWhitelistModel.remove(
      {
        "walletAddress": nftWhitelistDto.walletAddress
      }
    );
  }
}
