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

  async registerWalletAddress(
    nftWhitelistDto: NftWhitelistDto,
  ): Promise<INftWhitelist> {
    const createdNftWhitelist = new this.nftWhitelistModel(
      nftWhitelistDto,
    );
    return await createdNftWhitelist.save();
  }

  async findOne(payload: NftWhitelistDto): Promise<INftWhitelist> {
    return await this.nftWhitelistModel.findOne({
        walletAddress: payload.walletAddress,
    });
  }

  async findAll(): Promise<INftWhitelist[]> {
    return await this.nftWhitelistModel.find();
  }
}
