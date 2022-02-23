import axios from "axios";
import { serverBaseUri } from "constant";
import { getError } from "helpers/errHandler";

export const setAxiosHeader = (account: string) => {
    apiServer.defaults.headers.common['requester'] = account;
}

export const apiServer = axios.create({
    baseURL: serverBaseUri,
    withCredentials: false, // required to handle the CSRF token
})

export default {
    /**
     * Ping to server
     */
    async pingToServer() {
        try {
            let result = await apiServer.get("");
            console.log(result);
            return {
                success: true,
            }
        } catch(err) {
            return {
                success: false,
            }
        }
    },
    /**
     * Whitelist
     */
    // WRITE
    async registerWalletAddressesOwner(walletAddresses: string[]) {
        try {
            let NftWhitelistDtos = walletAddresses.map(walletAddress => ({ walletAddress }))
            let result = await apiServer.post("nft-whitelist", { NftWhitelistDtos });
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    // WRITE
    async registerWalletAddressFree(walletAddress: string) {
        try {
            console.log(apiServer.defaults.headers.common)
            let result = await apiServer.post("nft-whitelist/free", { walletAddress });
            if (result.data.status === 201) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    // READ
    async registeredInWhitelist(walletAddress: string) {
        try {
            let result = await apiServer.get("nft-whitelist/free-" + walletAddress);
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    // READ
    async getWhitelist(page?: number, cntperpage?: number, search?: string) {
        try {
            let result = await apiServer.get(`nft-whitelist/paginate?${ page ? "page=" + page : "" }&${ cntperpage ? "cntperpage=" + cntperpage : "" }&${ search ? "search=" + search : "" }`);
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    // READ
    async getCountWhitelist() {
        try {
            let result = await apiServer.get(`nft-whitelist/count`);
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    // DELETE
    async removeWalletAddressesOwner(walletAddresses: string[]) {
        try {
            let NftWhitelistDtos = walletAddresses.map(walletAddress => ({ walletAddress }))
            let result = await apiServer.post("nft-whitelist/remove", { NftWhitelistDtos });
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    // DELETE
    async forceRemoveWalletAddressesOwner(walletAddresses: string[]) {
        try {
            let NftWhitelistDtos = walletAddresses.map(walletAddress => ({ walletAddress }))
            let result = await apiServer.post("nft-whitelist/force-remove", { NftWhitelistDtos });
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },

    /**
     * MerkleTree
     */
    async generateMerkleRoot() {
        try {
            let result = await apiServer.post("nft-merkletree");
            if (result.data.status === 201) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.content,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.content,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    async getMerkleRoot() {
        try {
            let result = await apiServer.get("nft-merkletree");
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.content,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.content,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    },
    async getMerkleProof(walletAddress: string) {
        try {
            let result = await apiServer.post("nft-merkletree/merkleproof", { walletAddress: walletAddress });
            if (result.data.status === 200) {
                return ({
                    success: true,
                    message: result.data.message,
                    content: result.data.content,
                })
            } else {
                return ({
                    success: false,
                    message: result.data.message,
                    content: result.data.content,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                message: errorMsg,
                content: errorMsg,
            })
        }
    }
}