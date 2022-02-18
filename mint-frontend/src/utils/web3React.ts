import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import Web3 from 'web3'
import { CHAIN_ID, RPC_URL } from 'constant'

export enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect"
}

const injected = new InjectedConnector({ 
    supportedChainIds: [CHAIN_ID] 
})

const walletconnect = new WalletConnectConnector({
    rpc: { 
        [CHAIN_ID]: RPC_URL 
    },
    qrcode: true,
    // pollingInterval: POLLING_INTERVAL,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    // [ConnectorNames.BSC]: bscConnector,
    // [ConnectorNames.DEFI]: defiConnector,
    // [ConnectorNames.CoinBase]: coinbaseConnector,
}
  
export const getLibrary = (provider: any): Web3 => {
    return provider
}
  