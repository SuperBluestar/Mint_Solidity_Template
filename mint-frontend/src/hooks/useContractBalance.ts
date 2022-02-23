import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";
import type { BigNumber } from '@ethersproject/bignumber'

export const useContractBalance = (
    contract?: NftMint,
    account?: string,
    update?: number
): BigNumber | undefined => {
    const [ contractBalance, setContractBalance ] = useState<BigNumber | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.balance({ from: account})]).then(([balance_]) => {
                if (!stale) {
                    setContractBalance(balance_);
                }
            });
            return () => {
              stale = true
              setContractBalance(undefined)
            }
        }
    }, [contract, update]);
    return contractBalance
}