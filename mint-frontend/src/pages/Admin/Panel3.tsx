import { useApiWhitelist } from "hooks";
import { useCallback, useState } from "react";
import { isAddress } from "@ethersproject/address";
import apiService from "services/apiService";
import { ellipseAddress } from 'helpers/utilities'
import { 
    useConnector,
    useMerkleRoot, 
    useProvider,
    useNftContract,
    useAccount
} from "hooks";
import { TimeZone } from "constant";
import {
    setMerkleRoot
} from 'utils/ContractActions';

interface IMerkleRoot {
    merkleroot: string,
    createdAt: Date,
    updatedAt: Date
}

const Panel3 = () => {
    const [ update, refresh ] = useState<number>(0);
    const [ page, setPage ] = useState<number>(1);
    const [ cntperpage, setCntPerPage ] = useState<number>(20);
    const [ search, setSearch ] = useState<string>("");
    const { whitelist, totalCnt } = useApiWhitelist(page, cntperpage, search, update);
    
    const [ newWhitelist, setNewWhitelist ] = useState<string>();

    const addWhitelist = async () => {
        if (newWhitelist && newWhitelist !== "") {
            let result = await apiService.registerWalletAddressesOwner(newWhitelist.split("\n"))
            if (result.success) {
                console.log(result.content)
                refresh(val => val + 1)
            } else {
                alert(result.content);
            }
        } else {
            alert("Empty addresses, confirm again");
        }
    }
    const removeWhitelist = async () => {
        if (newWhitelist && newWhitelist !== "") {
            let result = await apiService.removeWalletAddressesOwner(newWhitelist.split("\n"))
            if (result.success) {
                console.log(result.content)
                refresh(val => val + 1)
            } else {
                alert(result.content);
            }
        } else {
            alert("Empty addresses, confirm again");
        }
    }
    const forceRemoveWhitelist = async () => {
        if (newWhitelist && newWhitelist !== "") {
            let result = await apiService.forceRemoveWalletAddressesOwner(newWhitelist.split("\n"))
            if (result.success) {
                console.log(result.content)
                refresh(val => val + 1)
            } else {
                alert(result.content);
            }
        } else {
            alert("Empty addresses, confirm again");
        }
    }

    const connector = useConnector();
    const Account = useAccount(connector);
    const provider = useProvider(connector);
    const contract = useNftContract(provider);
    const contractMerkleRoot = useMerkleRoot(contract, Account, update);
    const [ _merkleRoot_, _setMerkleRoot_ ] = useState<IMerkleRoot | undefined>();
    const getMerkleRoot = async () => {
        let res = await apiService.getMerkleRoot();
        if (res.success) {
            _setMerkleRoot_(res.content)
        } else {
            alert(res.message)
        }
    }
    const calculateMerkleRoot = async () => {
        let res = await apiService.generateMerkleRoot();
        if (res.success) {
            _setMerkleRoot_(res.content)
        } else {
            alert(res.message)
        }
    }
    const _setMerkleRoot = useCallback(async (merkleRoot_: string) => {
        if (Account) {
            let res = await setMerkleRoot(merkleRoot_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account])
    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row mb-2">
                <label className="flex-shrink-0 flex-grow-0 flex items-center justify-center">Contract MerkleRoot</label>
                <div className="flex-shrink-0 flex-grow-0 border-b-2 mx-2 px-2 flex items-center justify-center">{ contractMerkleRoot ? ellipseAddress(contractMerkleRoot, 5) : "Loading" }</div>
                <div className="flex-shrink flex-grow border-b-2 mx-2 px-2 text-center">{ _merkleRoot_ ? `0x${ellipseAddress(_merkleRoot_.merkleroot, 5)}\n(updated at ${new Date(_merkleRoot_.createdAt).toLocaleString("en-US", { timeZone: TimeZone })})` : "~~" }</div>
                <div className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 bg-pink-400 hover:bg-pink-700 hover:text-white cursor-pointer flex items-center justify-center" onClick={getMerkleRoot}>GET</div>
                <div className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 bg-pink-400 hover:bg-pink-700 hover:text-white cursor-pointer flex items-center justify-center" onClick={calculateMerkleRoot}>CALCULATE</div>
                <div className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 bg-pink-400 hover:bg-pink-700 hover:text-white cursor-pointer flex items-center justify-center" onClick={() => _merkleRoot_ ? _setMerkleRoot(_merkleRoot_.merkleroot) : alert("please get merkleroot from server")}>UPDATE</div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow flex-shrink mr-2">
                    <div className="flex flex-col">
                        <h3 className="border border-transparent">New Address to Whitelist {newWhitelist?.split("\n").filter(val => val !== "").length}</h3>
                        <textarea value={newWhitelist} onChange={e => setNewWhitelist(e.target.value)} className="rounded border outline-none p-2 mt-2" />
                        <div className="flex flex-col md:flex-row justify-between">
                            <button className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 hover:bg-pink-700 hover:text-white" onClick={() => {
                                setNewWhitelist((oldVal) => oldVal && oldVal !== "" ? oldVal?.replaceAll(",","\n").replaceAll("\"","").replaceAll(" ","").split("\n").filter(val => val !== "").join("\n") : "")
                            }}>Prettier</button>
                            <button className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 hover:bg-pink-700 hover:text-white" onClick={() => {
                                setNewWhitelist((oldVal) => oldVal && oldVal !== "" ? oldVal.split("\n").filter(val => isAddress(val)).join("\n") : "")
                            }}>Validate</button>
                            <div className="flex-shrink flex-grow"></div>
                            <button className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 bg-pink-400 hover:bg-pink-700 hover:text-white" onClick={addWhitelist}>Add</button>
                            <button className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 bg-pink-400 hover:bg-pink-700 hover:text-white" onClick={removeWhitelist}>Remove</button>
                            <button className="flex-shrink-0 flex-grow-0 px-3 py-1 border-b-2 bg-pink-400 hover:bg-pink-700 hover:text-white" onClick={forceRemoveWhitelist}>Force Remove</button>
                        </div>
                    </div>
                </div>
                <div className="flex-grow-0 flex-shrink-0">
                    <div className="flex flex-col md:flex-row">
                        <label>Page</label>
                        <input min="1" value={page} onChange={e => setPage(parseInt(e.target.value))} className="rounded border outline-none w-12 text-center" type="number"/>
                        <label>Cnt/page</label>
                        <input min="2" value={cntperpage} onChange={e => setCntPerPage(parseInt(e.target.value))} className="rounded border outline-none w-12 text-center" type="number"/>
                        <label>Total</label>
                        <div className="rounded border outline-none w-12 text-center">{ totalCnt === undefined ? "~" : totalCnt }</div>
                        <label>Search</label>
                        <input value={search} onChange={e => setSearch(e.target.value)} className="rounded border outline-none w-32 text-center" type="text"/>
                    </div>
                    <div className="overflow-scroll flex flex-col border rounded mt-2">
                    { whitelist && whitelist.length > 0 ? whitelist.map((user, id) => {
                        return (
                            <div key={id} className={`p-1 ${user.allowed > 0 ? "" : "bg-black text-white"}`}>{ user.walletAddress }</div>
                        )
                    }) : "" }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panel3;