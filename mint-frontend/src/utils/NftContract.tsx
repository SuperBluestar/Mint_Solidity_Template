
import { CHAIN_ID, NFT_CONTRACT } from "constant";
import { ethers, Contract } from "ethers";
import type { Provider } from '@ethersproject/providers';

export const NftContract = (
    provider?: Provider
): Contract => {
    return new ethers.Contract(NFT_CONTRACT[CHAIN_ID].address, NFT_CONTRACT[CHAIN_ID].abi, provider);
}
