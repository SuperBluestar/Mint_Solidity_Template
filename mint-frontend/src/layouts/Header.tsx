import { useContext, useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Web3ModalContext } from 'context/web3ModalContext'
import { CHAINS } from 'chains';
import { CHAIN_ID, md } from 'constant';
import { 
    useAccount, 
    useChainId, 
    useConnector, 
    useIsActive, 
    useBalances, 
    useProvider, 
    useAccounts, 
    useIsActivating, 
    useContractOwner,
    useApiServerlive
} from 'hooks';
import { ellipseAddress, toFixed } from 'helpers/utilities'
import { formatEther } from '@ethersproject/units'
import { getName } from 'utils/WalletConnect'
import { WalletConnect } from '@web3-react/walletconnect'
import { Network } from '@web3-react/network'
import { getAddChainParameters } from "chains"
import { useNftContract } from 'hooks';
import { useApiInWhitelist } from 'hooks';
import { setAxiosHeader } from 'services/apiService';

const Header = () => {
    const [update, refresh] = useState<number>(0);
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

    const contract = useNftContract(provider)
    const owner = useContractOwner(contract)

    const isPortrait = useMediaQuery({ query: `(max-width: ${md})` });

    const inWhitelist = useApiInWhitelist(Account);
    const serverlive = useApiServerlive(update);

    useEffect(() => {
        if (Account && owner && Account === owner) {
            setAxiosHeader(Account);
        }
    }, [Account, owner]);

    return (
        <div className="w-full">
            <div className="border-b-2 bg-green-300 px-4 py-2 mx-auto md:container flex justify-between items-center">
                <Link to="/"><h3>Header</h3></Link>
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
                            <div className={`flex ${ isPortrait ? "flex-col items-end" : "items-center" }`}>
                                <span className={`w-8 h-8 rounded-full border flex justify-center items-center mr-4 cursor-pointer ${ serverlive ? "animate-pulse bg-pink-700 text-white" : "bg-pink-300 text-black hover:animate-pulse" }`} onClick={() => refresh(val => val + 1)}>
                                { serverlive === undefined ? "~" : "S" }
                                </span>
                                <span className={`w-8 h-8 rounded-full border flex justify-center items-center mr-4 ${ inWhitelist ? "animate-pulse bg-pink-700 text-white" : "bg-pink-300 text-black" }`}>
                                W
                                </span>
                                { 
                                    owner === Account ? 
                                    <Link to="/admin"><span className="px-4 py-1 my-1 mr-4 cursor-pointer">Admin</span></Link> : 
                                    "" 
                                }
                                <span className="rounded-full border-2 border-pink-700 bg-pink-400 hover:bg-pink-500 px-4 py-1 my-1 mr-4 cursor-pointer">{ CHAINS[ChainId ? ChainId : CHAIN_ID].name }</span>
                                <span className="rounded-full border-2 border-pink-700 bg-pink-400 hover:bg-pink-500 px-4 py-1 my-1 mr-4 cursor-pointer">{ ellipseAddress(Account, 6) }</span>
                                <span className="my-1 mr-4">{ Balances ? "Ξ" + toFixed(formatEther(Balances[0]), 5) : "-" }</span>
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