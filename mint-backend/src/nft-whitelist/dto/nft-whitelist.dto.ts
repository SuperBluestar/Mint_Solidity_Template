// import { IsEmail } from 'class-validator';

export class NftWhitelistDto {
  walletAddress: string;
  allowed?: number;
}

export class NftWhitelistDtos {
  NftWhitelistDtos: NftWhitelistDto[];
  allowed?: number;
}