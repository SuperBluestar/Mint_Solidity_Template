import { CHAIN_ID } from "constant";
import { apiGetAccountNonce } from 'helpers/api';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";
import type { BigNumber } from '@ethersproject/bignumber';

export const publicMint = async (
    cnt: number,
    Account?: string,
    contract?: NftMint,
    cost?: BigNumber,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.publicMint(cnt, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                value: cost?.mul(cnt).toString(),
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const preMint = async (
    cnt: number,
    _proof: string[],
    Account?: string,
    contract?: NftMint,
    cost?: BigNumber,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        let proof = _proof.map(prf => Buffer.from(prf, 'hex'))
        try {
            let nftTxn = await contract?.preMint(cnt, proof, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                value: cost?.mul(cnt).toString(),
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

// Owner
export const setBaseExtension = async (
    baseExtension_: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setBaseExtension(baseExtension_, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setBaseUri = async (
    baseBaseUri_: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setBaseUri(baseBaseUri_, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setMaxMintAmount = async (
    maxMintAmount_: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setMaxMintAmount(maxMintAmount_, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setCost = async (
    cost_: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setCost(cost_, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setNewAssignedId = async (
    assignedId_: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setNewAssignedId(assignedId_, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setPreMintMaxBalance = async (
    preMintMaxBalance_: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setPreMintMaxBalance(preMintMaxBalance_, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setPreSaleTime = async (
    preSalteTime: Date,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setPreSaleTime(preSalteTime.getTime() / 1000, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setPublicSaleTime = async (
    publicSaleTime: Date,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setPublicSaleTime(publicSaleTime.getTime() / 1000, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setMerkleRoot = async (
    merkleRoot_: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        let root = Buffer.from(merkleRoot_, 'hex')
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.setMerkleRoot(root, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const pause = async (
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.pause({
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const unpause = async (
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.unpause({
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const withdraw = async (
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.withdraw({
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}

export const setContractOwner = async (
    newOwner: string,
    Account?: string,
    contract?: NftMint,
) => {
    if (Account) {
        const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
        try {
            let nftTxn = await contract?.transferOwnership(newOwner, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                nonce: nonce
            })
            await nftTxn?.wait()
            return {
                success: true,
                message: nftTxn?.hash
            }
        } catch (err) {
            return {
                success: false
            }
        }
    } else {
        return {
            success: false
        }
    }
}
