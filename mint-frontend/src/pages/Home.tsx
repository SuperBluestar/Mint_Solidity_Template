import { FC, useState, useCallback } from "react";
import { 
    useAccount, 
    useConnector, 
    useIsActive, 
    useProvider, 
    useNftContract,
    usePreSaleTime,
    usePublicSaleTime,
    useCurrentSupply,
    useTotalSupply,
    useCost,
    useApiInWhitelist
} from 'hooks';
import { formatEther } from '@ethersproject/units'
import apiService from 'services/apiService';
import { 
    publicMint, 
    preMint
} from 'utils/ContractActions';

const Home: FC = () => {
    const [update, refresh] = useState<number>(0);
    const connector = useConnector();
    const IsActive = useIsActive(connector);
    const Account = useAccount(connector);
    const provider = useProvider(connector);

    const contract = useNftContract(provider)
    const preSaleTime = usePreSaleTime(contract);
    const publicSaleTime = usePublicSaleTime(contract);
    const currentSupply = useCurrentSupply(contract, update);
    const totalSupply = useTotalSupply(contract);
    const cost = useCost(contract);

    const inWhitelist = useApiInWhitelist(Account, update);

    const [mintCnt, setMintCnt] = useState<number>(1);
    const publicMintHandler = useCallback(async () => {
        if (Account) {
            let res = await publicMint(mintCnt, Account, contract, cost);
            if (res.success) {
                alert("Tx is done successfully");
            } else {
                alert("Failed to Tx");
            }
        }
    }, [Account, contract, mintCnt, cost])
    const preMintHandler = useCallback(async () => {
        if (Account) {
            let merkleProof = await apiService.getMerkleProof(Account);
            if (merkleProof.success) {
                let res = await preMint(mintCnt, merkleProof.content, Account, contract, cost);
                if (res.success) {
                    alert("Tx is done successfully");
                } else {
                    alert("Failed to Tx");
                }
            } else {
                alert("Failed to get merkle proof");
            }
        }
    }, [Account, contract, mintCnt, cost])
    const registerWhitelistHandler = async () => {
        if (Account) {
            if ((inWhitelist !== undefined && !inWhitelist)) {
                let result = await apiService.registerWalletAddressFree(Account)
                if (result.success) {
                    alert("registered Successfully");
                    refresh(val => val + 1)
                } else {
                    alert(result.content);
                }
            } else {
                alert("already registered in whitelist")
            }
        } else {
            alert("Wait few secs");
        }
    }
    return (
        <div className="w-full">
            <div className="container mx-auto h-96 flex justify-center items-center">
                <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl animate-bounce shadow-pink-400 shadow-md font-extrabold">NFT Template</h3>
            </div>
            { IsActive && Account ? (
                <div className="flex flex-col items-center">
                    <div className="my-2 text-2xl animate-pulse">{currentSupply} / {totalSupply}</div>
                    <div className="">{ cost ? formatEther(cost) + " Eth" : "loading ..." }</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button className="rounded-full px-6 py-3 border hover:bg-pink-600 transition" onClick={preMintHandler}>Pre Mint</button>
                        <input type="number" value={mintCnt} onChange={e => setMintCnt(parseInt(e.target.value))} min={1} max={10} className="rounded-full px-6 py-3 border"/>
                        <button className="rounded-full px-6 py-3 border hover:bg-pink-600 transition" onClick={publicMintHandler}>Public Mint</button>
                    </div>
                    <div className="w-80 text-center my-4">
                        <button className={`rounded-full px-6 py-3 border ${ inWhitelist ? "" : "hover:" }bg-pink-600 ${ inWhitelist ? "" : "hover:" }text-white transition`} onClick={registerWhitelistHandler}>
                        Register as whitelist
                        </button>
                    </div>
                    <div className="flex my-1">
                        <label htmlFor="preSaleTime_id" className="px-4 py-2 font-extrabold w-36 text-right">preSale</label>
                        { 
                            preSaleTime ? 
                            <input className="text-center outline-none border-b-4 w-44" id="preSaleTime_id" type="text" readOnly value={preSaleTime.toLocaleDateString() + " " + preSaleTime.toLocaleTimeString()} /> : 
                            <div className="flex justify-center items-center outline-none border-b-4 w-44">Loading ...</div>
                        }
                    </div>
                    <div className="flex my-1">
                        <label htmlFor="preSaleTime_id" className="px-4 py-2 font-extrabold w-36 text-right">publicSale</label>
                        { 
                            publicSaleTime ? 
                            <input className="text-center outline-none border-b-4 w-44" id="preSaleTime_id" type="text" readOnly value={publicSaleTime.toLocaleDateString() + " " + publicSaleTime.toLocaleTimeString()} /> : 
                            <div className="flex justify-center items-center outline-none border-b-4 w-44">Loading ...</div>
                        }
                    </div>
                </div>
            ) : (
                <></>
            ) }
        </div>
    )
}

export default Home;