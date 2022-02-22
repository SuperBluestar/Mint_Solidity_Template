import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useCurrentSupply = (
    contract?: NftMint,
    update?: number
): number | undefined => {
    const [ currentSupply, setCurrentSupply ] = useState<number | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.currentSupply()]).then(([currentSupply_]) => {
                if (!stale) {
                    setCurrentSupply(currentSupply_);
                }
            });
            return () => {
              stale = true
              setCurrentSupply(undefined)
            }
        }
    }, [contract, update]);
    return currentSupply
}