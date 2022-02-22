import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useBaseExtension = (
    contract?: NftMint,
    account?: string,
    update?: number
): string | undefined => {
    const [ baseExtension, setBaseExtension ] = useState<string | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.getBaseExtension({ from: account})]).then(([baseExtension_]) => {
                if (!stale) {
                    setBaseExtension(baseExtension_);
                }
            })
            return () => {
              stale = true
              setBaseExtension(undefined)
            }
        }
    }, [contract, update]);
    return baseExtension
}