
import { createContext, useCallback, useState, useMemo, Provider, useEffect } from 'react';
import Modal from 'react-modal';

import { ConnectWithSelect, getName } from 'utils/WalletConnect';
import { hooks as metaMaskHooks, metaMask } from 'connectors/metaMask';
import { hooks as walletConnectHooks, walletConnect } from 'connectors/walletConnect';
import { hooks as walletLinkHooks, walletLink } from 'connectors/walletLink';
import { hooks as networkHooks, network } from 'connectors/network'

import { Connector } from '@web3-react/types';
import type { Web3Provider } from '@ethersproject/providers';

interface IWeb3ModalContext {
    openModal?: () => void,
    closeModal?: () => void,
    ChainId?: number,
    IsActivating?: boolean,
    Error?: Error,
    Accounts?: string[],
    Account?: string,
    IsActive?: boolean,
    Provider?: Web3Provider,
    ENSNames?: (string | null)[],
    ENSName?: string | null,
    priorityConnector?: Connector
}

export const Web3ModalContext = createContext<IWeb3ModalContext>({ });

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
                overlayClassName="fixed left-0 top-0 w-full h-full flex justify-center items-center backdrop-blur-sm"
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

    // NftContract = (): Contract => {
    //     return new ethers.Contract(NFT_CONTRACT[CHAIN_ID].address, NFT_CONTRACT[CHAIN_ID].abi);
    // }
    return (
        <Web3ModalContext.Provider 
            value={{
                openModal,
                closeModal,
            }}
        >
        { children }
        { WalletConnectModal }
        </Web3ModalContext.Provider>
    )
}

export default Web3ModalContextProvider;