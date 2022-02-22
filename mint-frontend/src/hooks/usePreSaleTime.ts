import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const usePreSaleTime = (
    contract?: NftMint,
    update?: number
): Date | undefined => {
    const [ preSaleTime, setPreSaleTime ] = useState<Date | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.preSaleTime()]).then(([preSaleTime_]) => {
                if (!stale) {
                    let timestamp = preSaleTime_ * 1000;
                    setPreSaleTime(new Date(timestamp));
                }
            });
            return () => {
              stale = true
              setPreSaleTime(undefined)
            }
        }
    }, [contract, update]);
    return preSaleTime
}