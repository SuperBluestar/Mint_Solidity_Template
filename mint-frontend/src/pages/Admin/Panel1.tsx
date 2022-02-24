import { 
    useConnector, 
    useProvider,
    useNftContract,
    useCurrentSupply,
    useTotalSupply,
    useContractBalance,
    useAccount
} from 'hooks';
import { formatEther } from '@ethersproject/units';
import { 
    withdraw 
} from 'utils/ContractActions';
import { useCallback, useState } from 'react';

const Panel1 = () => {
    const [ update, refresh ] = useState<number>(0);
    const connector = useConnector();
    const Account = useAccount(connector);
    const provider = useProvider(connector);
    const contract = useNftContract(provider);
    const currentSupply = useCurrentSupply(contract, update);
    const totalSupply = useTotalSupply(contract, update);
    const balance = useContractBalance(contract, Account, update);
    const withdrawHandler = useCallback(async () => {
        if (Account) {
            if (balance && balance.gt(0)) {
                let res = await withdraw(Account, contract);
                if (res.success) {
                    alert("Tx is done successfully");
                    refresh(val => val + 1);
                } else {
                    alert("Failed to Tx");
                }
            } else {
                alert("Balance is not ready")
            }
        } else {
            alert("wait few secs");
        }
    }, [contract, Account, balance]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-24 rounded-md border flex justify-center items-center text-3xl">
                { currentSupply !== undefined ? currentSupply : "~" } / { totalSupply ? totalSupply : "~" }
            </div>
            <div className="h-24 rounded-md border flex justify-center items-center text-3xl">
                { balance ? formatEther(balance.toString()) + " Eth" : "~" }
            </div>
            <div className="h-24 rounded-md border flex justify-center items-center text-3xl cursor-pointer" onClick={withdrawHandler}>
                Withdraw
            </div>
        </div>
    )
}

export default Panel1;