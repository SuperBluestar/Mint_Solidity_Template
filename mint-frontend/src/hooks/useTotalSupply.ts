import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useTotalSupply = (
    contract?: NftMint,
    update?: number
): number | undefined => {
    const [ totalSupply, setTotalSupply ] = useState<number | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.totalSupply()]).then(([totalSupply_]) => {
                if (!stale) {
                    setTotalSupply(totalSupply_);
                }
            });
            return () => {
              stale = true
              setTotalSupply(undefined)
            }
        }
    }, [contract, update]);
    return totalSupply
}