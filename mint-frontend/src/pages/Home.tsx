import React, { useCallback } from 'react';
import Loader from 'components/Loader';
import Header from 'layouts/Header';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from '@web3-react/walletconnect-connector';

import { CHAIN_ID } from 'constant';
import { connectorsByName, ConnectorNames } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'

const Home = () => {
    const { connector, chainId, account, active, error, activate, deactivate } = useWeb3React()
    const login = useCallback(
        (connectorID: ConnectorNames) => {
            const connector = connectorsByName[connectorID]
            if (connector) {
                activate(connector, async (error: Error) => {
                    console.log(error)
                    if (error instanceof UnsupportedChainIdError) {
                        const hasSetup = await setupNetwork()
                        if (hasSetup) {
                            activate(connector)
                        }
                    } else {
                        if (error instanceof NoEthereumProviderError) {
                            alert('Provider Error, No provider was found')
                        } else if (
                            error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof UserRejectedRequestErrorWalletConnect
                        ) {
                            alert('Authorization Error, Please authorize to access your account')
                        } else if (connector instanceof WalletConnectConnector) {
                            const walletConnector = connector as WalletConnectConnector
                            walletConnector.walletConnectProvider = null
                        } else {
                            console.log(error)
                            alert(`${error.name}, ${error.message}`)
                        }
                    }
                })
            }
        }
    , [active]);

    const logout = useCallback(
        () => {
            deactivate()
            connectorsByName.walletconnect.close()
            connectorsByName.walletconnect.walletConnectProvider = null
        }
    , [deactivate]);
    return (
        <div className="Home items-center justify-center h-screen">
            <Header 
                connected={active}
                address={account || ""}
                chainId={chainId || CHAIN_ID}
                loginMetamask={() => { 
                    login(ConnectorNames.Injected)
                }}
                loginWalletConnector={() => {
                    login(ConnectorNames.WalletConnect)
                }}
                killSession={deactivate}
            />
            <Loader />
        </div>
    );
}

export default Home;
