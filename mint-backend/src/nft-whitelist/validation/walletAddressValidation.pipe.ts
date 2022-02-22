import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException  } from '@nestjs/common';
import { INftWhitelist } from "../interfaces/nft-whitelist.interface";
import {
    isAddress,
} from "@ethersproject/address";

@Injectable()
export class RegisterWalletValidationPipe implements PipeTransform {
  transform(value: INftWhitelist, metadata: ArgumentMetadata) {
    // POST method
    if (metadata.type === "body") {
        if (value.walletAddress && value.walletAddress !== "" && isAddress(value.walletAddress)) {
            return value;
        } else {
            throw new BadRequestException({ walletAddress: 'invalid address' }, "Invalid parameter");
        }
    } else {
        return value;
    }
  }
}