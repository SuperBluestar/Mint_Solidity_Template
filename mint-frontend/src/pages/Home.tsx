import { FC, useState, useCallback } from "react";
import { 
    useAccount, 
    useConnector, 
    useIsActive, 
    useProvider, 
    useNftContract,
    useCurrentSupply,
    useTotalSupply,
    useCost,
} from 'hooks';
import { formatEther } from '@ethersproject/units'
import apiService from 'services/apiService';
import { 
    publicMint, 
} from 'utils/ContractActions';

const Home: FC = () => {
    const [update, refresh] = useState<number>(0);
    const connector = useConnector();
    const IsActive = useIsActive(connector);
    const Account = useAccount(connector);
    const provider = useProvider(connector);

    const contract = useNftContract(provider)
    const currentSupply = useCurrentSupply(contract, update);
    const totalSupply = useTotalSupply(contract);
    const cost = useCost(contract);

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
    return (
        <div className="w-full">
            <div className="container mx-auto h-96 flex justify-center items-center">
                <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl animate-bounce shadow-pink-400 shadow-md font-extrabold">NFT Template</h3>
            </div>
            { IsActive && Account ? (
                <div className="flex flex-col items-center">
                    <div className="my-2 text-2xl animate-pulse">{currentSupply} / {totalSupply}</div>
                    <div className="">{ cost ? formatEther(cost) + " Eth" : "loading ..." }</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input type="number" value={mintCnt} onChange={e => setMintCnt(parseInt(e.target.value))} min={1} max={10} className="rounded-full px-6 py-3 border"/>
                        <button className="rounded-full px-6 py-3 border hover:bg-pink-600 transition" onClick={publicMintHandler}>Public Mint</button>
                    </div>
                </div>
            ) : (
                <></>
            ) }
        </div>
    )
}

export default Home;