import {
    Body,
    Controller,
    Post,
    Get,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
  import { NftWhitelistService } from './nft-whitelist.service';
  import { NftWhitelistDto } from './dto/nft-whitelist.dto';
  
  @Controller('nft-whitelist')
  export class NftWhitelistController {
    constructor(private nftWhitelistService: NftWhitelistService) {}
  
    @Post()
    async registerWalletAddress(@Body() nftWhitelistDto: NftWhitelistDto) {
      const duplicated = await this.nftWhitelistService.findOne(
        nftWhitelistDto,
      );
      if (!duplicated) {
        this.nftWhitelistService.registerWalletAddress(nftWhitelistDto);
        return {
          status: HttpStatus.CREATED,
          message: 'wallet address is registered successfully',
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'address already taken',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
  
    @Get()
    async findAll() {
      const walletList = await this.nftWhitelistService.findAll();
      return {
        status: HttpStatus.OK,
        message: walletList.map(data => ({
          walletAddress: data.walletAddress
        }))
      }
    }
  }
  