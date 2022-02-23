import { 
    useConnector, 
    useProvider,
    useNftContract,
    useCurrentSupply,
    useTotalSupply,
    useContractBalance,
    usePaused,
    useAccount
} from 'hooks';
import { formatEther } from '@ethersproject/units';
import { 
    pause, 
    unpause, 
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
    const paused = usePaused(contract, update);
    const balance = useContractBalance(contract, Account, update);
    const pauseHandler = useCallback(async () => {
        if (paused !== undefined) {
            if (paused) {
                let res = await unpause(Account, contract);
                if (res.success) {
                    alert("Tx is done successfully");
                    refresh(val => val + 1);
                } else {
                    alert("Failed to Tx");
                }
            } else {
                let res = await pause(Account, contract);
                if (res.success) {
                    alert("Tx is done successfully");
                    refresh(val => val + 1);
                } else {
                    alert("Failed to Tx");
                }
            }
        } else {
            alert("wait few secs");
        }
    }, [contract, Account, paused]);
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-24 rounded-md border flex justify-center items-center text-3xl">
                { currentSupply !== undefined ? currentSupply : "~" } / { totalSupply ? totalSupply : "~" }
            </div>
            <div className={`h-24 rounded-md border flex justify-center items-center text-3xl cursor-pointer transition ${paused ? "bg-red-600 hover:bg-red-400" : "bg-green-500 hover:bg-green-300"}`} onClick={pauseHandler}>
                { paused === undefined ? "~" : ( paused ? "UnPause" : "Pause")}
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