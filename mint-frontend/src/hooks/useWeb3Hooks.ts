import { hooks as metaMaskHooks, metaMask } from 'connectors/metaMask';
import { hooks as walletConnectHooks, walletConnect } from 'connectors/walletConnect';
import { hooks as walletLinkHooks, walletLink } from 'connectors/walletLink';
import { hooks as networkHooks, network } from 'connectors/network'

import { getPriorityConnector } from '@web3-react/core'

const { 
    usePriorityConnector, 
    useSelectedChainId, 
    useSelectedAccounts, 
    useSelectedIsActivating,
    useSelectedError,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedENSNames,
    useSelectedENSName
} = getPriorityConnector(
    [metaMask, metaMaskHooks],
    //@ts-ignore
    [walletConnect, walletConnectHooks],
    [walletLink, walletLinkHooks],
    [network, networkHooks]
)

export { usePriorityConnector as useConnector }
export { useSelectedChainId as useChainId }
export { useSelectedAccounts as useAccounts }
export { useSelectedIsActivating as useIsActivating }
export { useSelectedError as useError }
export { useSelectedAccount as useAccount }
export { useSelectedIsActive as useIsActive }
export { useSelectedProvider as useProvider }
export { useSelectedENSNames as useENSNames }
export { useSelectedENSName as useENSName }