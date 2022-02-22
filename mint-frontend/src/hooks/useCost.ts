import type { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";
import { formatEther } from '@ethersproject/units'

export const useCost = (
    contract?: NftMint,
    update?: number
): BigNumber | undefined => {
    const [ cost, setCost ] = useState<BigNumber | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.cost()]).then(([cost_]) => {
                if (!stale) {
                    setCost(cost_);
                }
            });
            return () => {
              stale = true
              setCost(undefined)
            }
        }
    }, [contract, update]);
    return cost
}