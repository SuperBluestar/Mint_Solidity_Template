import { Module } from '@nestjs/common';
import { NftWhitelistController } from './nft-whitelist.controller';
import { NftWhitelistService } from './nft-whitelist.service';
import { NftWhitelistSchema } from './schemas/nft-whitelist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NftWhitelist', schema: NftWhitelistSchema },
    ]),
  ],
  controllers: [NftWhitelistController],
  providers: [
    NftWhitelistService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class NftWhitelistModule {}
