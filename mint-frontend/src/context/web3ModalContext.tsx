
import { createContext, useCallback, useState, useMemo, Provider, useEffect } from 'react';
import Modal from 'react-modal';

import { ConnectWithSelect, getName } from 'utils/WalletConnect';
import { hooks as metaMaskHooks, metaMask } from 'connectors/metaMask';
import { hooks as walletConnectHooks, walletConnect } from 'connectors/walletConnect';
import { hooks as walletLinkHooks, walletLink } from 'connectors/walletLink';
import { hooks as networkHooks, network } from 'connectors/network'

import { getPriorityConnector } from '@web3-react/core'
import { Connector } from '@web3-react/types';
import BN from 'bn.js';
import { formatFixedDecimals } from 'helpers/bignumber'
import { CHAIN_ID, TOKEN_DECIMAL } from 'constant'

interface IWeb3ModalContext {
    openModal?: () => void,
    closeModal?: () => void,
    isActive?: boolean,
    wallet?: string,
    account?: string,
    chainId?: number,
    message?: string,
    balance?: BN | string,
    priorityConnector?: Connector
}

export const Web3ModalContext = createContext<IWeb3ModalContext>({ });

const { usePriorityConnector } = getPriorityConnector(
    [metaMask, metaMaskHooks],
    //@ts-ignore
    [walletConnect, walletConnectHooks],
    [walletLink, walletLinkHooks],
    [network, networkHooks]
)

//@ts-ignore
const Web3ModalContextProvider = ({ children }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, [modalIsOpen]);
    const openModal = useCallback(() => {
        setIsOpen(true);
    }, [modalIsOpen]);

    const chainIdMetaMask = metaMaskHooks.useChainId()
    const isActivatingMetaMask = metaMaskHooks.useIsActivating()
    const errorMetaMask = metaMaskHooks.useError()
    const isActiveMetaMask = metaMaskHooks.useIsActive()

    const chainIdWalletConnect = walletConnectHooks.useChainId()
    const isActivatingWalletConnect = walletConnectHooks.useIsActivating()
    const errorWalletConnect = walletConnectHooks.useError()
    const isActiveWalletConnect = walletConnectHooks.useIsActive()

    const chainIdWalletLink = walletLinkHooks.useChainId()
    const isActivatingWalletLink = walletLinkHooks.useIsActivating()
    const errorWalletLink = walletLinkHooks.useError()
    const isActiveWalletLink = walletLinkHooks.useIsActive()

    const chainIdNetwork = networkHooks.useChainId()
    const isActivatingNetwork = networkHooks.useIsActivating()
    const errorNetwork = networkHooks.useError()
    const isActiveNetwork = networkHooks.useIsActive()

    const WalletConnectModal = useMemo(() => {
        return (
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={() => {}}
                onAfterClose={() => {}}
                onRequestClose={closeModal}
                closeTimeoutMS={0}
                contentLabel="Wallet Connect Web3Modal"
                overlayClassName="fixed left-0 top-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-40"
                id="modal-id"
                className="w-96 px-6 py-4 border border-green-900 rounded-md outline-none"
                ariaHideApp={false}
                preventScroll={true}
            >
                <h3 className="text-center text-3xl mb-4">Wallet Connect</h3>
                <hr/>
                <ConnectWithSelect 
                    connector={metaMask}
                    chainId={chainIdMetaMask}
                    isActivating={isActivatingMetaMask}
                    error={errorMetaMask}
                    isActive={isActiveMetaMask}
                />
                <ConnectWithSelect 
                    connector={walletConnect}
                    chainId={chainIdWalletConnect}
                    isActivating={isActivatingWalletConnect}
                    error={errorWalletConnect}
                    isActive={isActiveWalletConnect}
                />
                <ConnectWithSelect 
                    connector={walletLink}
                    chainId={chainIdWalletLink}
                    isActivating={isActivatingWalletLink}
                    error={errorWalletLink}
                    isActive={isActiveWalletLink}
                />
                <ConnectWithSelect 
                    connector={network}
                    chainId={chainIdNetwork}
                    isActivating={isActivatingNetwork}
                    error={errorNetwork}
                    isActive={isActiveNetwork}
                />
            </Modal>
        )
    }, [
        modalIsOpen, 
        chainIdMetaMask, isActivatingMetaMask, errorMetaMask, isActiveMetaMask,
        chainIdWalletConnect, isActivatingWalletConnect, errorWalletConnect, isActiveWalletConnect,
        chainIdWalletLink, isActivatingWalletLink, errorWalletLink, isActiveWalletLink,
        chainIdNetwork, isActivatingNetwork, errorNetwork, isActiveNetwork,
    ]);

    const priorityConnector = usePriorityConnector()
    console.log(`Priority Connector: ${getName(priorityConnector)}`)

    const [wallet, setWallet] = useState<string>("");
    const [account, setAccount] = useState<string | undefined>("");
    const [chainId, setChainId] = useState<number>(CHAIN_ID);
    const [message, setMessage] = useState<string | undefined>("");
    const [balance, setBalance] = useState<BN | string>("");
    
    const accountChangeHandler = useCallback((accounts) => {
        setAccount(accounts[0])
    }, [priorityConnector]);
    const chainChangeHandler = useCallback((chainId) => {
        setChainId(chainId)
    }, [priorityConnector]);
    const messageHandler = useCallback((message) => {
        setMessage(message)
    }, [])
    useEffect(() => {
        let walletName: string = getName(priorityConnector);
        setWallet(walletName);
        if (walletName !== "Unknown") {
            (async () => {
                priorityConnector.provider?.request({
                    method: "eth_accounts",
                    params: []
                }).then((accounts: any) => {
                    setAccount(accounts[0])
                    console.log(accounts)
                    priorityConnector.provider?.request({
                        method: "eth_getBalance",
                        params: [
                            accounts[0], "latest"
                        ]
                    }).then((balance: any) => {
                        console.log(balance)
                        setBalance(formatFixedDecimals(balance, TOKEN_DECIMAL))
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
                // setBalance(balance);
                priorityConnector.provider?.on("accountsChanged", accountChangeHandler)
                priorityConnector.provider?.on("chainChanged", chainChangeHandler)
                priorityConnector.provider?.on("message", messageHandler)
            })()
        }
        return () => {
            priorityConnector.provider?.removeListener("accountsChanged", accountChangeHandler)
            priorityConnector.provider?.removeListener("chainChanged", chainChangeHandler)
            priorityConnector.provider?.removeListener("message", messageHandler)
        }
    }, [priorityConnector]);
    return (
        <Web3ModalContext.Provider 
            value={{
                openModal,
                closeModal,
                isActive: (wallet !== "Unknown" && wallet !== "" && balance !== ""),
                wallet,
                account,
                chainId,
                message,
                balance,
                priorityConnector
            }}
        >
        { children }
        { WalletConnectModal }
        </Web3ModalContext.Provider>
    )
}

export default Web3ModalContextProvider;