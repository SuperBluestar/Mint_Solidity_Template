import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useNewAssignedId = (
    contract?: NftMint,
    update?: number
): number | false | undefined => {
    const [ assignedId, setAssignedId ] = useState<number | false | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.newAssignedId()]).then(([assignedId_]) => {
                if (!stale) {
                    setAssignedId(assignedId_);
                }
            }).catch(e => {
                if (!stale) {
                    setAssignedId(false);
                }
            })
            return () => {
              stale = true
              setAssignedId(undefined)
            }
        }
    }, [contract, update]);
    return assignedId
}