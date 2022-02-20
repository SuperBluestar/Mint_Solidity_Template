
import type { Web3ReactHooks } from '@web3-react/core'
import type { Actions, Connector, Web3ReactState, Web3ReactStore, Provider } from '@web3-react/types';
import type { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import { useEffect } from 'react'
import { ethers } from "ethers";
import { CHAIN_ID, NFT_CONTRACT } from "constant";

export const useNftMintContract = (
    signer?: JsonRpcSigner
) => {
    var nftContract = new ethers.Contract(NFT_CONTRACT[CHAIN_ID].address, NFT_CONTRACT[CHAIN_ID].abi, signer);
    // useEffect(() => {
        
    // }, [])
    return nftContract
}