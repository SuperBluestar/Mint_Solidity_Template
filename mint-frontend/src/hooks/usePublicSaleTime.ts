import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const usePublicSaleTime = (
    contract?: NftMint,
    update?: number
): Date | undefined => {
    const [ publicSaleTime, setPublicSaleTime ] = useState<Date | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.publicSaleTime()]).then(([publicSaleTime_]) => {
                if (!stale) {
                    let timestamp = publicSaleTime_ * 1000;
                    setPublicSaleTime(new Date(timestamp));
                }
            });
            return () => {
              stale = true
              setPublicSaleTime(undefined)
            }
        }
    }, [contract, update]);
    return publicSaleTime
}