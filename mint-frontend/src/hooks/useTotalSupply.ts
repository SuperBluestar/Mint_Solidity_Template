import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useTotalSupply = (
    contract?: NftMint,
): number | undefined => {
    const [ totalSupply, setTotalSupply ] = useState<number | undefined>()
    useEffect(() => {
        if (contract) {
            (async () => {
                let totalSupply_ = await contract?.totalSupply();
                setTotalSupply(totalSupply_);
            })()
        }
    }, [contract]);
    return totalSupply
}