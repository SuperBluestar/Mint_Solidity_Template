import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useMerkleRoot = (
    contract?: NftMint,
    account?: string,
    update?: number
): string | undefined => {
    const [ merkleRoot, setMerkleRoot ] = useState<string | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.getMerkleRoot({ from: account})]).then(([merkleRoot_]) => {
                if (!stale) {
                    setMerkleRoot(merkleRoot_);
                }
            })
            return () => {
              stale = true
              setMerkleRoot(undefined)
            }
        }
    }, [contract, update]);
    return merkleRoot
}