
import { CHAIN_ID } from "constant";
import { apiGetAccountNonce } from 'helpers/api';
import { parseEther } from '@ethersproject/units'
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const publicMintHandler = async (
    Account?: string,
    contract?: NftMint
) => {
    if (Account) {
        // const gasPrice = await apiGetGasPrices();
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.publicMint(1, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                value: parseEther("0.077").toString(),
                nonce: nonce
            })
            await nftTxn?.wait()
            return nftTxn?.hash;
        } catch (err) {
            throw new Error("");
        }
    } else {
        return false
    }
}