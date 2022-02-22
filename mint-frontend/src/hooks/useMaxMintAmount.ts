import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useMaxMintAmount = (
    contract?: NftMint,
    update?: number
): number | undefined => {
    const [ maxMintAmount, setMaxMintAmount ] = useState<number | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.maxMintAmount()]).then(([maxMintAmount_]) => {
                if (!stale) {
                    setMaxMintAmount(maxMintAmount_);
                }
            });
            return () => {
              stale = true
              setMaxMintAmount(undefined)
            }
        }
    }, [contract, update]);
    return maxMintAmount
}