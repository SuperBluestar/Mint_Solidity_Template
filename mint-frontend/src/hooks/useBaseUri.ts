import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useBaseUri = (
    contract?: NftMint,
    account?: string,
    update?: number
): string | undefined => {
    const [ baseUri, setBaseUri ] = useState<string | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.getBaseUri({ from: account})]).then(([baseUri_]) => {
                if (!stale) {
                    setBaseUri(baseUri_);
                }
            });
            return () => {
              stale = true
              setBaseUri(undefined)
            }
        }
    }, [contract, update]);
    return baseUri
}