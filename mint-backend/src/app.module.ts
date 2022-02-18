import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MongooseModule } from '@nestjs/mongoose';
import { NftWhitelistModule } from './nft-whitelist/nft-whitelist.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mint-temp-nest'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      serveRoot: '',
      serveStaticOptions: {
        cacheControl: true,
      },
    }),
    NftWhitelistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
