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
}