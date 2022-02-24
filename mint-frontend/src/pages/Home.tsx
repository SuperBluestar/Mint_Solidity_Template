import { FC, useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { Web3ModalContext } from 'context/web3ModalContext';
import { CHAIN_ID } from 'constant';
import { 
    useAccount, 
    useConnector, 
    useIsActive, 
    useIsActivating,
    useProvider, 
    useNftContract,
    useCurrentSupply,
    useContractBalance,
    useCost,
    useChainId,
    useContractOwner
} from 'hooks';
import { formatEther } from '@ethersproject/units';
import { getName } from 'utils/WalletConnect';
import { WalletConnect } from '@web3-react/walletconnect';
import { Network } from '@web3-react/network';
import { getAddChainParameters } from "chains";
import { 
    publicMint, 
} from 'utils/ContractActions';

const Home: FC = () => {
    const { openModal } = useContext(Web3ModalContext);
    const [update, refresh] = useState<number>(0);
    const connector = useConnector();
    const IsActive = useIsActive(connector);
    const IsActivating = useIsActivating(connector);
    const ChainId = useChainId(connector);
    const Account = useAccount(connector);
    const provider = useProvider(connector);

    const contract = useNftContract(provider);
    const balance = useContractBalance(contract);
    const owner = useContractOwner(contract);
    const currentSupply = useCurrentSupply(contract, update);
    const cost = useCost(contract);

    const [mintCnt, setMintCnt] = useState<number>(1);
    const [minting, setMinting] = useState<boolean>(false);
    const publicMintHandler = useCallback(async () => {
        if (Account) {
            setMinting(true)
            let res = await publicMint(mintCnt, Account, contract, cost);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1)
            } else {
                alert("Failed to Tx");
            }
            setMinting(false)
        }
    }, [Account, contract, mintCnt, cost])

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
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col">
                    <div className="flex">
                        <div className="flex-grow flex-shrink bg-ukraine-blue h-28 flex items-center px-7 md:px-16 font-bold text-xl font-montserrat">
                            <span className="text-white flex-grow-0 flex-shrink-0 mr-1">Ukraine Charity</span> 
                            <span className="text-ukraine-yellow flex-grow-0 flex-shrink-0">NFT</span>
                            <div className="flex-shrink flex-grow"></div>
                            <div className="flex-shrink-0 flex-grow-0 text-white">
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
                                            <>
                                            { 
                                                owner === Account ? 
                                                <Link to="/admin"><span className="px-4 py-1 my-1 mr-4 cursor-pointer">Admin</span></Link> : 
                                                "" 
                                            }
                                            </>
                                        )
                                    )
                                ) }
                            </div>
                        </div>
                        <div className="flex-grow-0 flex-shrink-0 w-2 md:w-3"></div>
                        <div className="flex-grow-0 flex-shrink-0 w-7 md:w-14 h-28 bg-ukraine-yellow"></div>
                    </div>
                    <div className="flex flex-col font-montserrat px-7 md:pl-16 md:pr-32 py-16 md:py-32 relative">
                        <h2 className="text-ukraine-light-black text-3xl md:text-6xl font-bold">Mint an NFT to Support Ukraine</h2>
                        <p className="text-black my-8" style={{ maxWidth: "450px" }}>100% of Proceeds will go to a Charity for Familes and Infratuture in Ukraine. Charity Foundation will be choosen by a vote from the NFT Holders.</p>
                        <hr className="border-b-black border-opacity-5"/>
                            <div className="flex flex-wrap">
                                <div className="flex py-6 mr-4">
                                    <span className="font-extrabold mr-1">Supply: </span>
                                    <span className="font-normal">Unlimited</span>
                                </div>
                                <div className="flex py-6 mr-4">
                                    <span className="font-extrabold mr-1">Amt Minted: </span>
                                    <span className="font-bold">{ currentSupply === undefined ? "~" : currentSupply }</span>
                                </div>
                                <div className="flex py-6">
                                    <span className="font-extrabold mr-1">ETH Raised: </span>
                                    <span className="font-bold">{ balance !== undefined ? formatEther(balance.toString()) : "~" }</span>
                                </div>
                            </div>
                            <div className="flex">
                                <input style={{ minWidth: "184px" }} type="number" value={mintCnt} onChange={e => setMintCnt(parseInt(e.target.value))} min={1} max={10} className="rounded-full px-6 py-3 border mr-6 h-14 flex items-center"/>
                                { !IsActive || getName(connector) === "Network" ? 
                                    <div className="rounded-full px-6 py-3 border bg-ukraine-blue text-white h-14 flex items-center justify-center" onClick={openModal}>
                                        Connect Wallet
                                    </div> : (
                                        IsActivating ? (
                                            <div className="rounded-full px-6 py-3 border bg-ukraine-blue text-white h-14 flex items-center justify-center">
                                                Connecting
                                            </div>
                                        ) : (
                                            ChainId !== CHAIN_ID ? (
                                                <div className="rounded-full px-6 py-3 border bg-ukraine-blue text-white h-14 flex items-center justify-center" onClick={() => switchChain(CHAIN_ID)}>
                                                    Switch Network
                                                </div>
                                            ) : (
                                                <button disabled={minting} style={{ minWidth: "146px" }} className="rounded-full px-6 py-3 border bg-ukraine-blue text-white h-14 flex items-center justify-center" onClick={publicMintHandler}>{minting ? "Minting" : "Mint"}</button>
                                            )
                                        )
                                    ) }
                            </div>
                        <div className="w-full mt-11 text-ukraine-gray text-xs md:text-sm flex justify-center items-center italic" style={{
                            background: "linear-gradient(-90deg, rgba(241, 231, 140, 0.54) 0%, rgba(140, 193, 241, 0) 100%)",
                            height: "200px"
                        }}>
                            “We pray that as many families and everyones love ones are safe. This is a major tradegy and hope that we can as a community provide some help to everyone affected by this!” - Enver Studio
                        </div>
                        <div className="absolute w-full h-full left-0 top-0 -z-10 flex justify-center items-center">
                            <img className="w-5/7 h-auto opacity-20" src="/assets/images/hand.png" alt="hand"/>
                        </div>
                    </div>
                </div>
                <div className="bg-ukraine-light-gray hidden md:flex justify-center items-center">
                    <img className="w-full" src="/assets/images/right-bg-cliped.png" alt="right-bg"/>
                </div>
            </div>

        </>
    )
}

export default Home;