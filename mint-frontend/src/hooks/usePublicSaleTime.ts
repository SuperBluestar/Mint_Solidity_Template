import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const usePublicSaleTime = (
    contract?: NftMint,
): Date | undefined => {
    const [ publicSaleTime, setPublicSaleTime ] = useState<Date | undefined>()
    useEffect(() => {
        if (contract) {
            (async () => {
                let publicSaleTime_ = await contract?.publicSaleTime();
                let timestamp = publicSaleTime_ * 1000;
                setPublicSaleTime(new Date(timestamp));
            })()
        }
    }, [contract]);
    return publicSaleTime
}