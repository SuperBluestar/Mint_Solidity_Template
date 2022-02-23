// import { IsEmail } from 'class-validator';

export class NftMerkleRootDto {
  merkleroot: string;
  addressCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class NftMerkleProofDto {
  walletAddress: string;
}
