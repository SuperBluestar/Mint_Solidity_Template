import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const usePaused = (
    contract?: NftMint,
    update?: number
): Boolean | undefined => {
    const [ paused, setPaused ] = useState<Boolean | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.paused()]).then(([paused_]) => {
                if (!stale) {
                    setPaused(paused_);
                }
            });
            return () => {
              stale = true
              setPaused(undefined)
            }
        }
    }, [contract, update]);
    return paused
}