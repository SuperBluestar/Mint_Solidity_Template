import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import type { Provider, JsonRpcProvider } from '@ethersproject/providers';
import { NFT_CONTRACT, CHAIN_ID } from "constant";
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useNftContract = (
    provider?: JsonRpcProvider,
    update?: number
): NftMint | undefined => {
    const [ contract, setContract ] = useState<NftMint | undefined>()
    useEffect(() => {
        if (provider) {
            const NftContract = (new ethers.Contract(NFT_CONTRACT[CHAIN_ID].address, NFT_CONTRACT[CHAIN_ID].abi, provider?.getSigner())) as NftMint;
            setContract(NftContract);
        }
    }, [provider, update]);
    return contract
}