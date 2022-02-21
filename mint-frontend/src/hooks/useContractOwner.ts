import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useContractOwner = (
    contract?: NftMint,
): string | undefined => {
    const [ owner, setOwner ] = useState<string | undefined>()
    useEffect(() => {
        if (contract) {
            (async () => {
                let owner_ = await contract?.owner();
                setOwner(owner_);
            })()
        }
    }, [contract]);
    return owner
}