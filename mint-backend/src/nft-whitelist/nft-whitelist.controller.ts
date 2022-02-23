import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Query,
    HttpStatus,
    HttpException,
    UsePipes,
    SetMetadata,
} from '@nestjs/common';
import { NftWhitelistService } from './nft-whitelist.service';
import { NftWhitelistDto, NftWhitelistDtos } from './dto/nft-whitelist.dto';
import { RegisterWalletValidationPipe } from "./validation/walletAddressValidation.pipe";
import { ADMIN, MANAGER } from "src/roles.guard";
import { isAddress } from "@ethersproject/address";

@Controller('nft-whitelist')
export class NftWhitelistController {
    constructor(private nftWhitelistService: NftWhitelistService) {}
  
    @Post()
    @SetMetadata('roles', [ ADMIN, MANAGER ])
    async registerWalletAddresses(@Body() nftWhitelistDtos: NftWhitelistDtos) {
      let result = {
        success: 0,
        failed: 0,
      };
      for (let nftWhitelistDto of nftWhitelistDtos.NftWhitelistDtos) {
        if (isAddress(nftWhitelistDto.walletAddress)) {
          const duplicated = await this.nftWhitelistService.findOne(
            nftWhitelistDto,
          );
          if (!duplicated) {
            try {
              await this.nftWhitelistService.registerWalletAddress(nftWhitelistDto);
              result.success ++;
            } catch(e) {
              result.failed ++;
            }
          } else {
            result.failed ++;
          }
        } else {
          result.failed ++;
        }
      }
      return {
        status: HttpStatus.OK,
        message: result
      }
    }

    @Post("remove")
    @SetMetadata('roles', [ ADMIN, MANAGER ])
    async removeWalletAddresses(@Body() nftWhitelistDtos: NftWhitelistDtos) {
      let result = {
        success: 0,
        failed: 0,
      };
      for (let nftWhitelistDto of nftWhitelistDtos.NftWhitelistDtos) {
        const existing = await this.nftWhitelistService.findOne(
          nftWhitelistDto,
        );
        if (existing) {
          let res;
          try {
            res = await this.nftWhitelistService.removeWalletAddress(nftWhitelistDto);
            result.success ++;
          } catch(e) {
            result.success --;
          }
        } else {
          result.failed ++;
        }
      }
      return {
        status: HttpStatus.OK,
        message: result
      }
    }
    
    @Post("force-remove")
    @SetMetadata('roles', [ ADMIN, MANAGER ])
    async forceRemoveWalletAddresses(@Body() nftWhitelistDtos: NftWhitelistDtos) {
      let result = {
        success: 0,
        failed: 0,
      };
      for (let nftWhitelistDto of nftWhitelistDtos.NftWhitelistDtos) {
        const existing = await this.nftWhitelistService.findOne(
          nftWhitelistDto,
        );
        if (existing) {
          let res;
          try {
            res = await this.nftWhitelistService.forceRemoveWalletAddress(nftWhitelistDto);
            result.success ++;
          } catch(e) {
            result.failed ++;
          }
        } else {
          result.failed ++;
        }
      }
      return {
        status: HttpStatus.OK,
        message: result
      }
    }

    @UsePipes(RegisterWalletValidationPipe)
    @Post("free")
    async registerWalletAddressFree(@Body() nftWhitelistDto: NftWhitelistDto) {
      if (await this.nftWhitelistService.count() >= parseInt(process.env.FREE_REGISTER_LIMIT)) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            message: process.env.FREE_REGISTER_LIMIT + ' of wallet addresses are already registered',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      } else {
        const duplicated = await this.nftWhitelistService.findOne(
          nftWhitelistDto,
        );
        if (!duplicated) {
          try {
            await this.nftWhitelistService.registerWalletAddress(nftWhitelistDto);
            return {
              status: HttpStatus.CREATED,
              message: 'wallet address is registered successfully',
            };
          } catch(e) {
            throw new HttpException(
              {
                status: HttpStatus.TOO_MANY_REQUESTS,
                message: 'failed to register',
              },
              HttpStatus.CONFLICT,
            );
          }
        } else {
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'wallet address already taken',
            },
            HttpStatus.CONFLICT,
          );
        }
      }
    }

    @Get("count")
    @SetMetadata('roles', [ ADMIN, MANAGER ])
    async findAllCount() {
      try {
        const cnt = await this.nftWhitelistService.count();
        return {
          status: HttpStatus.OK,
          message: cnt
        }
      } catch(e) {
        return {
          status: HttpStatus.TOO_MANY_REQUESTS,
          message: -1
        }
      }
    }

    @Get("paginate")
    @SetMetadata('roles', [ ADMIN, MANAGER ])
    async findByPaginate(@Query('page') page?: number, @Query('cntperpage') cntperpage?: number, @Query('search') search?: string) {
      page = page === undefined ? 1 : page;
      cntperpage = cntperpage === undefined ? 50 : cntperpage;
      search = search === undefined ? "" : search;
      try {
        const walletList = await this.nftWhitelistService.findByPaginate(page, cntperpage, search);
        return {
          status: HttpStatus.OK,
          message: walletList.map(data => ({
            walletAddress: data.walletAddress,
            allowed: data.allowed
          }))
        }
      } catch(e) {
        return {
          status: HttpStatus.TOO_MANY_REQUESTS,
          message: []
        }
      }
    }

    @Get("free-:walletAddress")
    async findByWalletAddress(@Param('walletAddress') walletAddress: string) {
      const data = await this.nftWhitelistService.findByWalletAddress(walletAddress);
      if (data && data.allowed > 0) {
        return {
          status: HttpStatus.OK,
          message: data
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'wallet address already taken',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
}
  