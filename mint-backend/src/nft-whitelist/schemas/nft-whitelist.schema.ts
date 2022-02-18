import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NftWhitelistDocument = NftWhitelist & Document;

@Schema()
export class NftWhitelist {
  @Prop({ required: true })
  walletAddress: string;
  
  @Prop({ default: 1 })
  allowed: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const NftWhitelistSchema =
  SchemaFactory.createForClass(NftWhitelist);
