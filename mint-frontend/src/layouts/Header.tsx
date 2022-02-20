import { Web3ModalContext } from 'context/web3ModalContext'
import { useContext, useCallback } from 'react';
import { CHAINS } from 'chains';
import { CHAIN_ID } from 'constant';
import { useAccount, useChainId, useConnector, useIsActive, useBalances, useProvider, useAccounts, useIsActivating } from 'hooks';
import { ellipseAddress, toFixed } from 'helpers/utilities'
import { formatEther } from '@ethersproject/units'
import { getName } from 'utils/WalletConnect'
import { WalletConnect } from '@web3-react/walletconnect'
import { Network } from '@web3-react/network'
import { getAddChainParameters } from "chains"

const Header = () => {
    const { openModal } = useContext(Web3ModalContext);
    const connector = useConnector();
    const provider = useProvider(connector);
    const IsActive = useIsActive(connector);
    const IsActivating = useIsActivating(connector);
    const ChainId = useChainId(connector);
    const Account = useAccount(connector);
    const Accounts = useAccounts(connector);
    const Balances = useBalances(provider, Accounts);

    const switchChain = useCallback(
        async (desiredChainId: number) => {
    
          if (connector instanceof WalletConnect || connector instanceof Network) {
            await connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
          } else {
            await connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
        },
        [connector, ChainId]
    )

    return (
        <div className="w-full">
            <div className="border-b-2 bg-green-300 px-4 py-2 mx-auto md:container flex justify-between items-center">
                <h3>Header</h3>
                { !IsActive || getName(connector) === "Network" ? 
                <div className="" onClick={openModal}>
                    Connect Wallet
                </div> : (
                    IsActivating ? (
                        <div className="">
                            Connecting
                        </div>
                    ) : (
                        ChainId !== CHAIN_ID ? (
                            <div className="" onClick={() => switchChain(CHAIN_ID)}>
                                Switch Network
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="rounded-full border-2 border-pink-700 bg-pink-400 hover:bg-pink-500 px-4 py-1 mr-4 cursor-pointer">{ CHAINS[ChainId ? ChainId : CHAIN_ID].name }</span>
                                <span className="rounded-full border-2 border-pink-700 bg-pink-400 hover:bg-pink-500 px-4 py-1 mr-4 cursor-pointer">{ ellipseAddress(Account, 6) }</span>
                                <span>{ Balances ? "Ξ" + toFixed(formatEther(Balances[0]), 5) : "-" }</span>
                            </div>
                        )
                    )
                )
                }
            </div>
        </div>
    )
}

export default Header;