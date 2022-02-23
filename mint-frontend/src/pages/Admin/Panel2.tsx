import { FC, useMemo, useRef, useState, useCallback } from 'react';
import { 
    useConnector, 
    useAccount,
    useProvider, 
    useNftContract,
    useBaseExtension,
    useBaseUri,
    useMaxMintAmount,
    useCost,
    useNewAssignedId,
    usePreSaleTime,
    usePublicSaleTime,
    useContractOwner,
    usePreMintMaxBalance
} from 'hooks';
import { formatEther } from '@ethersproject/units'
import {
    setBaseExtension,
    setBaseUri,
    setMaxMintAmount,
    setCost,
    setNewAssignedId,
    setPreSaleTime,
    setPublicSaleTime,
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
     * MaxMintAmount
     */
    const maxMintAmount = useMaxMintAmount(contract, update);
    const _setMaxMintAmount = useCallback(async (maxMintAmount_: string) => {
        if (Account) {
            let res = await setMaxMintAmount(maxMintAmount_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const maxMintAmountInput = useRef<HTMLInputElement>(null);
    const [maxMintAmountInputError, setMaxMintAmountInputError] = useState<string>("");
    const maxMintAmountClickHandler = () => {
        if (maxMintAmountInput.current?.value === "" || (maxMintAmountInput.current?.value && parseInt(maxMintAmountInput.current?.value) > 9999)) {
            maxMintAmountInput.current.focus();
            setMaxMintAmountInputError("Invalid value");
        } else {
            (async () => {
                await _setMaxMintAmount(maxMintAmountInput.current?.value || "1");
            })();
        }
    }
    const MaxMintAmountPart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set MaxMintAmount</label>
                <div className="border-b-4 text-center">{ maxMintAmount ? maxMintAmount : "loading ..." }</div>
                <input 
                    ref={maxMintAmountInput} 
                    type="number" 
                    onBlur={() => setMaxMintAmountInputError("")}
                    className={`border-b-4 text-center outline-none border-b-pink-400 active:border-b-pink-700 ${ maxMintAmountInputError !== "" ? "bg-pink-600" : "" }`}
                ></input>
                <button onClick={maxMintAmountClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
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
     * NewAssignedId
     */
    const assignedId = useNewAssignedId(contract, update);
    const _setAssignedId = useCallback(async (assignedId_: string) => {
        if (Account) {
            let res = await setNewAssignedId(assignedId_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const assignedIdInput = useRef<HTMLInputElement>(null);
    const [assignedIdInputError, setAssignedIdInputError] = useState<string>("");
    const assignedIdClickHandler = () => {
        if (assignedIdInput.current?.value === "" || (assignedIdInput.current?.value && parseInt(assignedIdInput.current?.value) < 0)) {
            assignedIdInput.current.focus();
            setAssignedIdInputError("Invalid value");
        } else {
            (async () => {
                await _setAssignedId(assignedIdInput.current?.value || "1");
            })();
        }
    }
    const AssignedIdPart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set AssignedId</label>
                <div className="border-b-4 text-center">{ assignedId || assignedId === false ? assignedId : "loading ..." }</div>
                <input 
                    ref={assignedIdInput} 
                    type="number" 
                    onBlur={() => setAssignedIdInputError("")}
                    className={`border-b-4 text-center outline-none border-b-pink-400 active:border-b-pink-700 ${ assignedIdInputError !== "" ? "bg-pink-600" : "" }`}
                ></input>
                <button onClick={assignedIdClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    Update
                </button>
            </>
        ), [assignedId])
    }
    
    /**
     * PreMintMaxBalance
     */
    const preMintMaxBalance = usePreMintMaxBalance(contract, update);
    const _setPreMintMaxBalance = useCallback(async (preMintMaxBalance_: string) => {
        if (Account) {
            let res = await setNewAssignedId(preMintMaxBalance_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const preMintMaxBalanceInput = useRef<HTMLInputElement>(null);
    const [preMintMaxBalanceInputError, setPreMintMaxBalanceInputError] = useState<string>("");
    const preMintMaxBalanceClickHandler = () => {
        if (preMintMaxBalanceInput.current?.value === "" || (preMintMaxBalanceInput.current?.value && parseInt(preMintMaxBalanceInput.current?.value) < 0)) {
            preMintMaxBalanceInput.current.focus();
            setPreMintMaxBalanceInputError("Invalid value");
        } else {
            (async () => {
                await _setPreMintMaxBalance(preMintMaxBalanceInput.current?.value || "1");
            })();
        }
    }
    const PreMintMaxBalancePart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set PreMintMaxBalance</label>
                <div className="border-b-4 text-center">{ preMintMaxBalance ? preMintMaxBalance : "loading ..." }</div>
                <input 
                    ref={preMintMaxBalanceInput} 
                    type="number" 
                    onBlur={() => setPreMintMaxBalanceInputError("")}
                    className={`border-b-4 text-center outline-none border-b-pink-400 active:border-b-pink-700 ${ preMintMaxBalanceInputError !== "" ? "bg-pink-600" : "" }`}
                ></input>
                <button onClick={preMintMaxBalanceClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    Update
                </button>
            </>
        ), [preMintMaxBalance])
    }

    /**
     * Presale
     */
    const preSaleTime = usePreSaleTime(contract, update);
    const _setPreSaleTime = useCallback(async (preSaleTime_: Date) => {
        if (Account) {
            let res = await setPreSaleTime(preSaleTime_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const [_preSaleTime_, _setPreSaleTime_] = useState<Date>();
    const preSaleTimeClickHandler = () => {
        if (_preSaleTime_) {
            (async () => {
                await _setPreSaleTime(_preSaleTime_);
            })();
        }
    }
    const PreSaleTimePart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set PreSaleTime</label>
                <div className="border-b-4 text-center">{ preSaleTime ? preSaleTime.toLocaleDateString() + " " + preSaleTime.toLocaleTimeString() : "loading ..." }</div>
                <DateTimePicker
                    className={`text-center outline-none border-b-pink-400 active:border-b-pink-700`}
                    value={_preSaleTime_}
                    onChange={(newValue) => {
                        _setPreSaleTime_(newValue);
                    }}
                />
                <button onClick={preSaleTimeClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    Update
                </button>
            </>
        ), [preSaleTime])
    }

    /**
     * Publicsale
     */
    const publicSaleTime = usePublicSaleTime(contract, update);
    const _setPublicSaleTime = useCallback(async (publicSaleTime_: Date) => {
        if (Account) {
            let res = await setPublicSaleTime(publicSaleTime_, Account, contract);
            if (res.success) {
                alert("Tx is done successfully");
                refresh(val => val + 1);
            } else {
                alert("Failed to Tx");
            }
        }
    }, [contract, Account]);
    const [_publicSaleTime_, _setPublicSaleTime_] = useState<Date>();
    const publicSaleTimeClickHandler = () => {
        if (_publicSaleTime_) {
            (async () => {
                await _setPublicSaleTime(_publicSaleTime_);
            })();
        }
    }
    const PublicSaleTimePart:FC = () => {
        return useMemo(() => (
            <>
                <label className="text-center md:text-right">Set PublicSaleTime</label>
                <div className="border-b-4 text-center">{ publicSaleTime ? publicSaleTime.toLocaleDateString() + " " + publicSaleTime.toLocaleTimeString() : "loading ..." }</div>
                <DateTimePicker
                    className={`text-center outline-none border-b-pink-400 active:border-b-pink-700`}
                    value={_publicSaleTime_}
                    onChange={(newValue) => {
                        _setPublicSaleTime_(newValue);
                    }}
                />
                <button onClick={publicSaleTimeClickHandler} className="cursor-pointer hover:bg-pink-700 transition rounded-full text-black hover:text-white">
                    Update
                </button>
            </>
        ), [publicSaleTime])
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
                <MaxMintAmountPart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <CostPart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <AssignedIdPart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <PreMintMaxBalancePart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <PreSaleTimePart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <PublicSaleTimePart />
            </div>
            <div className="mx-1 mt-2 md:mx-6 rounded-md border p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                <ContractOwnerPart />
            </div>
        </div>
    )
}

export default Panel2;