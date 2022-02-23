import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const usePreMintMaxBalance = (
    contract?: NftMint,
    update?: number
): number | undefined => {
    const [ preMintMaxBalance, setPreMintMaxBalance ] = useState<number | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.preMintMaxBalance()]).then(([preMintMaxBalance_]) => {
                if (!stale) {
                    setPreMintMaxBalance(preMintMaxBalance_);
                }
            });
            return () => {
              stale = true
              setPreMintMaxBalance(undefined)
            }
        }
    }, [contract, update]);
    return preMintMaxBalance
}