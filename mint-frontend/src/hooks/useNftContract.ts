import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import type { Provider } from '@ethersproject/providers';
import { NFT_CONTRACT, CHAIN_ID } from "constant";
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useNftContract = (
    provider?: Provider,
): NftMint | undefined => {
    const [ contract, setContract ] = useState<NftMint | undefined>()
    useEffect(() => {
        if (provider) {
            (async () => {
                const NftContract = (new ethers.Contract(NFT_CONTRACT[CHAIN_ID].address, NFT_CONTRACT[CHAIN_ID].abi, provider)) as NftMint;
                setContract(NftContract);
            })()
        }
    }, [provider]);
    return contract
}