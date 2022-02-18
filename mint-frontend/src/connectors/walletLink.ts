import { initializeConnector } from '@web3-react/core'
import { WalletLink } from '@web3-react/walletlink'
import { URLS } from '../chains'
import { CHAIN_ID } from 'constant'

export const [walletLink, hooks] = initializeConnector<WalletLink>(
  (actions) =>
    new WalletLink(actions, {
      url: URLS[CHAIN_ID][0],
      appName: 'web3-react',
    })
)
