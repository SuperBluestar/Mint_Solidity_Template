import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useCurrentSupply = (
    contract?: NftMint,
): number | undefined => {
    const [ currentSupply, setCurrentSupply ] = useState<number | undefined>()
    useEffect(() => {
        if (contract) {
            (async () => {
                let currentSupply_ = await contract?.currentSupply();
                setCurrentSupply(currentSupply_);
            })()
        }
    }, [contract]);
    return currentSupply
}