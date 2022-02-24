import { FC, useMemo, useRef, useState, useCallback } from 'react';
import { 
    useConnector, 
    useAccount,
    useProvider, 
    useNftContract,
    useBaseExtension,
    useBaseUri,
    useCost,
    useContractOwner,
} from 'hooks';
import { formatEther } from '@ethersproject/units'
import {
    setBaseExtension,
    setBaseUri,
    setCost,
    setContractOwner
} from "utils/ContractActions"
import DateTimePicker from 'react-datetime-picker';
import { isAddress } from '@ethersproject/address';
import { ellipseAddress } from 'helpers/utilities';

const Panel2 = () => {
    const [update, refresh] = useState<number>(0);

    const connector = useConnector();
    const Account = useAccount(connector);
    const provider = useProvider(connector);
    const contract = useNftContract(provider);

    /**
     * BaseExtension
     */
    const baseExtension = useBaseExtension(contract, Account, update);
    const _setBaseExtension = useCallback(async (baseExtension_: string) => {
        if (Account) {
            let res = await setBaseExtension(baseExtension_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const baseExtensionInput = useRef<HTMLInputElement>(null);
    const [baseExtensionInputError, setBaseExtensionInputError] = useState<string>("");
    const baseExtensionClickHandler = () => {
        if (baseExtensionInput.current?.value === "" || (baseExtensionInput.current?.value && baseExtensionInput.current?.value.length > 1000)) {
            baseExtensionInput.current.focus();
            setBaseExtensionInputError("Invalid value");
        } else {
            (async () => {
                await _setBaseExtension(baseExtensionInput.current?.value || "");
            })();
        }
    }
    const BaseExtensionPart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set BaseExtension</label>
                <div className="border-b-4 text-center">{ baseExtension ? baseExtension : "loading ..." }</div>
                <input 
                    ref={baseExtensionInput} 
                    type="text" 
                    onBlur={() => setBaseExtensionInputError("")}
                    className={`border-b-4 text-center outline-none border-b-pink-400 active:border-b-pink-700 ${ baseExtensionInputError !== "" ? "bg-pink-600" : "" }`}
                ></input>
                <button onClick={baseExtensionClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    Update
                </button>
            </>
        ), [baseExtension])
    }
    
    /**
     * BaseUri
     */
    const baseUri = useBaseUri(contract, Account, update);
    const _setBaseUrl = useCallback(async (baseUri_: string) => {
        if (Account) {
            let res = await setBaseUri(baseUri_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const baseUriInput = useRef<HTMLInputElement>(null);
    const [baseUriInputError, setBaseUriInputError] = useState<string>("");
    const baseUriClickHandler = () => {
        if (baseUriInput.current?.value === "" || (baseUriInput.current?.value && baseUriInput.current?.value.length > 1000)) {
            baseUriInput.current.focus();
            setBaseUriInputError("Invalid value");
        } else {
            (async () => {
                await _setBaseUrl(baseUriInput.current?.value || "");
            })();
        }
    }
    const BaseUrlPart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set BaseUrl</label>
                <div className="border-b-4 text-center">{ baseUri ? baseUri : "loading ..." }</div>
                <input 
                    ref={baseUriInput} 
                    type="text" 
                    onBlur={() => setBaseUriInputError("")}
                    className={`border-b-4 text-center outline-none border-b-pink-400 active:border-b-pink-700 ${ baseUriInputError !== "" ? "bg-pink-600" : "" }`}
                ></input>
                <button onClick={baseUriClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    Update
                </button>
            </>
        ), [baseUri])
    }

    /**
     * Cost
     */
    const cost = useCost(contract, update);
    const _setCost = useCallback(async (cost_: string) => {
        if (Account) {
            let res = await setCost(cost_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const costInput = useRef<HTMLInputElement>(null);
    const [costInputError, setCostInputError] = useState<string>("");
    const costClickHandler = () => {
        if (costInput.current?.value === "" || (costInput.current?.value && parseInt(costInput.current?.value) < 0)) {
            costInput.current.focus();
            setCostInputError("Invalid value");
        } else {
            (async () => {
                await _setCost(costInput.current?.value || "1");
            })();
        }
    }
    const CostPart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set Cost</label>
                <div className="border-b-4 text-center">{ cost ? formatEther(cost) + " Eth" : "loading ..." }</div>
                <input 
                    ref={costInput} 
                    type="number" 
                    onBlur={() => setCostInputError("")}
                    className={`border-b-4 text-center outline-none border-b-pink-400 active:border-b-pink-700 ${ costInputError !== "" ? "bg-pink-600" : "" }`}
                ></input>
                <button onClick={costClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    Update
                </button>
            </>
        ), [cost])
    }

    /**
     * TransferOwnership
     */
    const contractOwner = useContractOwner(contract, update);
    const _setContractOwner = useCallback(async (contractOwner_: string) => {
        if (Account) {
            if (contractOwner_ && isAddress(contractOwner_)) {
                let res = await setContractOwner(contractOwner_, Account, contract);
                if (res.success) {
                    alert("Tx is done successfully");
                    refresh(val => val + 1);
                } else {
                    alert("Failed to Tx");
                }
            } else {
                alert("Invalid wallet address");
            }
        }
    }, [contract, Account]);
    const contractOwnerInput = useRef<HTMLInputElement>(null);
    const [contractOwnerInputError, setContractOwnerInputError] = useState<string>("");
    const contractOwnerClickHandler = () => {
        if (contractOwnerInput.current?.value === "" || (contractOwnerInput.current?.value && parseInt(contractOwnerInput.current?.value) < 0)) {
            contractOwnerInput.current.focus();
            setContractOwnerInputError("Invalid value");
        } else {
            (async () => {
                await _setContractOwner(contractOwnerInput.current?.value || "");
            })();
        }
    }
    const ContractOwnerPart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set ContractOwner</label>
                <div className="border-b-4 text-center">{ contractOwner ? ellipseAddress(contractOwner, 7) : "loading ..." }</div>
                <input 
                    ref={contractOwnerInput} 
                    type="text" 
                    onBlur={() => setContractOwnerInputError("")}
                    className={`border-b-4 text-center outline-none border-b-pink-400 active:border-b-pink-700 ${ contractOwnerInputError !== "" ? "bg-pink-600" : "" }`}
                ></input>
                <button onClick={contractOwnerClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    TransferOwnership
                </button>
            </>
        ), [contractOwner])
    }
    return (
        <div className="w-full">
            <div onClick={() => refresh(update => update + 1)} className="text-right cursor-pointer">Refresh</div>
            <div className="mx-1 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <BaseExtensionPart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <BaseUrlPart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <CostPart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <ContractOwnerPart />
            </div>
        </div>
    )
}

export default Panel2;