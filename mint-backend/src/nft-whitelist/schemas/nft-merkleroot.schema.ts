import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NftMerkleRootDocument = NftMerkleRoot & Document;

@Schema()
export class NftMerkleRoot {
  @Prop({ required: true })
  merkleroot: string;

  @Prop({ required: true })
  addressCount: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const NftMerkleRootSchema =
  SchemaFactory.createForClass(NftMerkleRoot);
