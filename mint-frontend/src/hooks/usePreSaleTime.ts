import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const usePreSaleTime = (
    contract?: NftMint,
): Date | undefined => {
    const [ preSaleTime, setPreSaleTime ] = useState<Date | undefined>()
    useEffect(() => {
        if (contract) {
            (async () => {
                let preSaleTime_ = await contract?.preSaleTime();
                let timestamp = preSaleTime_ * 1000;
                setPreSaleTime(new Date(timestamp));
            })()
        }
    }, [contract]);
    return preSaleTime
}