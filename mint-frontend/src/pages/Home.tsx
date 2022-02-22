import { FC } from "react";
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
    useCost
} from 'hooks';
import { apiGetAccountNonce } from 'helpers/api';
import { parseEther } from '@ethersproject/units'
import { CHAIN_ID } from "constant";
import apiService from 'services/apiService';

const Home: FC = () => {
    const connector = useConnector();
    const IsActive = useIsActive(connector);
    const Account = useAccount(connector);
    const provider = useProvider(connector);

    const contract = useNftContract(provider)
    const preSaleTime = usePreSaleTime(contract);
    const publicSaleTime = usePublicSaleTime(contract);
    const currentSupply = useCurrentSupply(contract);
    const totalSupply = useTotalSupply(contract);
    const cost = useCost(contract);

    const publicMintHandler = async () => {
        if (Account) {
            // const gasPrice = await apiGetGasPrices();
            const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
            try {
                let nftTxn = await contract?.publicMint(1, {
                    // gasPrice: gasPrice.average.price,
                    from: Account,
                    value: cost?.toString(),
                    nonce: nonce
                })
                await nftTxn?.wait()
        
                console.log(nftTxn?.hash)
            } catch (err) {
                console.log(err)
            }
        }
    }
    const preMintHandler = async () => {
        if (Account) {
            // const gasPrice = await apiGetGasPrices();
            const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
            let nftTxn = await contract?.publicMint(1, {
                // gasPrice: gasPrice.average.price,
                from: Account,
                value: parseEther("0.077").toString(),
                nonce: nonce
            })
            await nftTxn?.wait()
    
            console.log(nftTxn?.hash)
        }
    }
    const registerWhitelistHandler = async () => {
        if (Account) {
            let result = await apiService.registerWalletAddressFree(Account)
            if (result.success) {
                alert("registered Successfully");
            } else {
                alert(result.content);
            }
        } else {
            alert("Wait few secs");
        }
    }
    return (
        <div className="w-full">
            <div className="container mx-auto h-96 flex justify-center items-center">
                <h3 className="text-9xl animate-bounce shadow-pink-400 shadow-md font-extrabold">NFT Template</h3>
            </div>
            { IsActive && Account ? (
                <div className="flex flex-col items-center">
                    <div className="my-2 text-2xl animate-pulse">{currentSupply} / {totalSupply}</div>
                    <div className="grid grid-cols-3 gap-2">
                        <button className="rounded-full px-6 py-3 border hover:bg-pink-600 transition" onClick={preMintHandler}>Pre Mint</button>
                        <input type="number" min={0} max={10} className="rounded-full px-6 py-3 border"/>
                        <button className="rounded-full px-6 py-3 border hover:bg-pink-600 transition" onClick={publicMintHandler}>Public Mint</button>
                    </div>
                    <div className="w-80 text-center my-4">
                        <button className="rounded-full px-6 py-3 border hover:bg-pink-600 transition" onClick={registerWhitelistHandler}>
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
                        <label htmlFor="preSaleTime_id" className="px-4 py-2 font-extrabold w-36 text-right">publicSaleTime</label>
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