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
    // WRITE
    async registerWalletAddressOwner(walletAddress: string) {
        try {
            let result = await apiServer.post("nft-whitelist", { walletAddress });
            if (result.data.status === 201) {
                return ({
                    success: true,
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
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
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
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
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
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
                    content: result.data.message,
                })
            } else {
                return ({
                    success: false,
                    content: result.data.message,
                })
            }
        } catch (err) {
            let errorMsg = getError(err);
            return ({
                success: false,
                content: errorMsg,
            })
        }
    }
}