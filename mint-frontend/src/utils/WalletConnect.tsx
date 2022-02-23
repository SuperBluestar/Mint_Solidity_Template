import { useCallback, useEffect, useState } from 'react';
import { IconButton } from 'components/atoms/IconButton';
import { MetaMask as MetaMaskIcon, WalletConnect as WalletConnectIcon, WalletLink as WalletLinkIcon, Network as NetworkIcon } from 'components/icons';
import type { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletLink } from '@web3-react/walletlink';

import { WalletConnect } from '@web3-react/walletconnect';
import { Network } from '@web3-react/network';
import { getAddChainParameters } from "chains";
import { CHAIN_ID } from '../constant';
import { Connector } from '@web3-react/types';

export const ConnectWithSelect = ({
    connector,
    chainId,
    isActivating,
    error,
    isActive,
}: {
    connector: MetaMask | WalletConnect | WalletLink | Network
    chainId: ReturnType<Web3ReactHooks['useChainId']>
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
    error: ReturnType<Web3ReactHooks['useError']>
    isActive: ReturnType<Web3ReactHooks['useIsActive']>
}) => {
    const isNetwork = connector instanceof Network
    // const displayDefault = !isNetwork
    // const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) => Number(chainId))
  
    const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : CHAIN_ID)
  
    const switchChain = useCallback(
      async (desiredChainId: number) => {
        setDesiredChainId(desiredChainId)
        // if we're already connected to the desired chain, return
        if (desiredChainId === chainId) return
        // if they want to connect to the default chain and we're already connected, return
        if (desiredChainId === -1 && chainId !== undefined) return
  
        if (connector instanceof WalletConnect || connector instanceof Network) {
          await connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
        } else {
          await connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
        }
      },
      [connector, chainId]
    )

    useEffect(() => {
        if (isActive && chainId !== CHAIN_ID) {
            switchChain(CHAIN_ID);
        }
    }, [chainId, isActive]);
    useEffect(() => {
        console.log(error)
        if (error) {
            connector.deactivate();
        }
    }, [error])
    const Icon = connector instanceof MetaMask 
        ? MetaMaskIcon
        : ( connector instanceof WalletConnect
            ? WalletConnectIcon
            : (
                connector instanceof WalletLink
                ? WalletLinkIcon
                : NetworkIcon
            )
        )
    const wallet = connector instanceof MetaMask 
        ? "Connect Metamask"
        : ( connector instanceof WalletConnect
            ? "WalletConnect"
            : (
                connector instanceof WalletLink
                ? "Wallet Link"
                : (
                    connector instanceof Network
                    ? "Network"
                    : "Unknown"
                )
            )
        )

    const walletConnect = () => {
        connector instanceof WalletConnect || connector instanceof Network
        ? connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
        : connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
    }

    // useEffect(() => {
    //     if (!isActive && connector instanceof MetaMask) {
    //         walletConnect();
    //     }
    // }, [isActive])
    if (error) {
        return (
            <IconButton 
                Icon={Icon} 
                text="Failed, try again or install"
                onClick={ walletConnect }
                disabled={ isActivating || !!error }
            />
        )
    } else if (isActive) {
        return (
            <IconButton 
                Icon={Icon} 
                text="Disconnect"
                onClick={() => connector.deactivate()}
            />
        )
    } else {
        return (
            <IconButton 
                Icon={Icon} 
                text={wallet}
                onClick={ walletConnect }
                disabled={ isActivating }
            />
        )
    }
}

export const getName = (connector: Connector): string => {
    if (connector instanceof MetaMask) return 'MetaMask'
    if (connector instanceof WalletConnect) return 'WalletConnect'
    if (connector instanceof WalletLink) return 'WalletLink'
    if (connector instanceof Network) return 'Network'
    return 'Unknown'
}

export enum Hooks {
    "MetaMask"= "MetaMask"
}