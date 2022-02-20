import { FC } from "react";
import { useAccount, useChainId, useConnector, useIsActive, useBalances, useProvider, useAccounts } from 'hooks';
import { useNftMintContract } from "hooks"
import { apiGetGasPrices, apiGetAccountNonce } from 'helpers/api';
import { CHAIN_ID } from "constant";

const Home: FC = () => {
    const connector = useConnector();
    const IsActive = useIsActive(connector);
    const Account = useAccount(connector);
    const provider = useProvider(connector);
    const contract = useNftMintContract(provider?.getSigner());
    const mintHandler = async () => {
        if (Account) {
            const gasPrice = await apiGetGasPrices();
            const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
            let nftTxn = await contract.mint({
                // gasPrice: gasPrice.average.price,
                from: Account,
                value: 0,
                nonce: nonce
            })
            await nftTxn.wait()
    
            console.log(nftTxn.hash)
        }
    }
    return (
        <div className="w-full">
            <div className="container mx-auto h-96 flex justify-center items-center">
            Home
            </div>
            { IsActive && Account ? (
                <div className="flex justify-center">
                    <button className="rounded-full px-6 py-3 border hover:bg-pink-600" onClick={mintHandler}>Mint</button>
                </div>
            ) : (
                <></>
            ) }
        </div>
    )
}

export default Home;