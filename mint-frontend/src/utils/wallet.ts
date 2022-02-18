import { CHAIN_ID, RPC_URL, NETWORK_NAME, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMAL } from "constant"

interface WindowChain {
    ethereum?: {
        isMetaMask?: true
        request: (...args: any[]) => void
    }
}

export const setupNetwork = async () => {
    const provider = (window as WindowChain).ethereum
    if (provider) {
        const chainId = CHAIN_ID
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                    },
                ],
            })
            return true
        } catch (error) {
            try {
                await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: NETWORK_NAME,
                            nativeCurrency: {
                                name: TOKEN_NAME,
                                symbol: TOKEN_SYMBOL,
                                decimals: TOKEN_DECIMAL,
                            },
                            rpcUrls: RPC_URL,
                            blockExplorerUrls: [``],
                        },
                    ],
                })
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        }
    } else {
        console.error("Can't setup the MATIC network on metamask because window.ethereum is undefined")
        return false
    }
}