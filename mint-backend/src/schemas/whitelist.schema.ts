import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type WhiteListDocument = WhiteList & mongoose.Document;

@Schema()
export class WhiteList {
  @Prop({ required: true })
  walletAddress: string;

  @Prop()
  allowed: number;
}

export const CatSchema = SchemaFactory.createForClass(WhiteList);