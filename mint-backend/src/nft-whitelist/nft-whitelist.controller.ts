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
    BadRequestException,
  } from '@nestjs/common';
  import { NftWhitelistService } from './nft-whitelist.service';
  import { NftWhitelistDto } from './dto/nft-whitelist.dto';
  import { RegisterWalletValidationPipe } from "./validation/walletAddressValidation.pipe";
  import { ADMIN, MANAGER, FREE } from "src/roles.guard";
  import {
    isAddress,
  } from "@ethersproject/address";

  @Controller('nft-whitelist')
  export class NftWhitelistController {
    constructor(private nftWhitelistService: NftWhitelistService) {}
  
    @UsePipes(RegisterWalletValidationPipe)
    @Post()
    @SetMetadata('roles', [ ADMIN, MANAGER ])
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
            message: 'wallet address already taken',
          },
          HttpStatus.CONFLICT,
        );
      }
    }

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
        if (isAddress(nftWhitelistDto.walletAddress)) {
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
                message: 'wallet address already taken',
              },
              HttpStatus.CONFLICT,
            );
          }
        } else {
          throw new BadRequestException({ walletAddress: 'invalid address' }, "Invalid parameter");
        }
      }
    }

    @Get()
    @SetMetadata('roles', [ ADMIN, MANAGER ])
    async findAll() {
      const walletList = await this.nftWhitelistService.findAll();
      return {
        status: HttpStatus.OK,
        message: walletList.map(data => ({
          walletAddress: data.walletAddress
        }))
      }
    }

    @Get("paginate")
    @SetMetadata('roles', [ ADMIN, MANAGER ])
    async findByPaginate(@Query('page') page?: number, @Query('cntperpage') cntperpage?: number, @Query('search') search?: string) {
      page = page === undefined ? 1 : page;
      cntperpage = cntperpage === undefined ? 50 : cntperpage;
      search = search === undefined ? "" : search;
      const walletList = await this.nftWhitelistService.findByPaginate(page, cntperpage, search);
      return {
        status: HttpStatus.OK,
        message: walletList.map(data => ({
          walletAddress: data.walletAddress
        }))
      }
    }

    @Get("free-:walletAddress")
    async findByWalletAddress(@Param('walletAddress') walletAddress: string) {
      const data = await this.nftWhitelistService.findByWalletAddress(walletAddress);
      if (data) {
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
  