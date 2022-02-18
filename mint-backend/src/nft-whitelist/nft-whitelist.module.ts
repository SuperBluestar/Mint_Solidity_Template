import { Module } from '@nestjs/common';
import { NftWhitelistController } from './nft-whitelist.controller';
import { NftWhitelistService } from './nft-whitelist.service';
import { NftWhitelistSchema } from './schemas/nft-whitelist.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NftWhitelist', schema: NftWhitelistSchema },
    ]),
  ],
  controllers: [NftWhitelistController],
  providers: [NftWhitelistService],
})
export class NftWhitelistModule {}
