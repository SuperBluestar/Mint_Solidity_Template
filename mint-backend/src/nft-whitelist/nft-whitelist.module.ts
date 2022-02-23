import { Module } from '@nestjs/common';
import { NftWhitelistController } from './nft-whitelist.controller';
import { NftMerkleTreeController } from './nft-merkletree.controller';
import { NftWhitelistService } from './nft-whitelist.service';
import { NftMerkleTreeService } from './nft-merkletree.service';
import { NftWhitelistSchema } from './schemas/nft-whitelist.schema';
import { NftMerkleRootSchema } from './schemas/nft-merkleroot.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NftWhitelist', schema: NftWhitelistSchema },
      { name: 'NftMerkleRoot', schema: NftMerkleRootSchema },
    ]),
  ],
  controllers: [
    NftWhitelistController,
    NftMerkleTreeController,
  ],
  providers: [
    NftWhitelistService,
    NftMerkleTreeService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class NftWhitelistModule {}
