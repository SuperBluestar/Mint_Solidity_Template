import { FC, useMemo, useRef, useState, useCallback } from 'react';
import { 
    useConnector, 
    useAccount,
    useProvider, 
    useNftContract,
    useBaseExtension,
    useBaseUri,
    useMaxMintAmount,
    useCost
} from 'hooks';
import { apiGetAccountNonce } from 'helpers/api';
import { formatEther, parseEther } from '@ethersproject/units'
import { CHAIN_ID } from "constant";

const Panel2 = () => {
    const [update, refresh] = useState(0);

    const connector = useConnector();
    const Account = useAccount(connector);
    const provider = useProvider(connector);
    const contract = useNftContract(provider);

    /**
     * BaseExtension
     */
    const baseExtension = useBaseExtension(contract, Account, update);
    const setBaseExtension = useCallback(async (baseExtension_: string) => {
        if (Account) {
            // const gasPrice = await apiGetGasPrices();
            const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
            try {
                let nftTxn = await contract?.setBaseExtension(baseExtension_, {
                    // gasPrice: gasPrice.average.price,
                    from: Account,
                    nonce: nonce
                })
                await nftTxn?.wait()
        
                console.log(nftTxn?.hash)
            } catch (err) {
                console.log(err)
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
                await setBaseExtension(baseExtensionInput.current?.value || "");
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
    const setBaseUrl = useCallback(async (baseUri_: string) => {
        if (Account) {
            // const gasPrice = await apiGetGasPrices();
            const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
            try {
                let nftTxn = await contract?.setBaseUri(baseUri_, {
                    // gasPrice: gasPrice.average.price,
                    from: Account,
                    nonce: nonce
                })
                await nftTxn?.wait()
        
                console.log(nftTxn?.hash)
            } catch (err) {
                console.log(err)
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
                await setBaseUrl(baseUriInput.current?.value || "");
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
    const setMaxMintAmount = useCallback(async (maxMintAmount_: string) => {
        if (Account) {
            // const gasPrice = await apiGetGasPrices();
            const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
            try {
                let nftTxn = await contract?.setMaxMintAmount(maxMintAmount_, {
                    // gasPrice: gasPrice.average.price,
                    from: Account,
                    nonce: nonce
                })
                await nftTxn?.wait()
        
                console.log(nftTxn?.hash)
            } catch (err) {
                console.log(err)
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
                await setMaxMintAmount(maxMintAmountInput.current?.value || "1");
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
    const setCost = useCallback(async (cost_: string) => {
        if (Account) {
            // const gasPrice = await apiGetGasPrices();
            const nonce = await apiGetAccountNonce(Account, CHAIN_ID);
            try {
                let nftTxn = await contract?.setCost(parseEther(cost_), {
                    // gasPrice: gasPrice.average.price,
                    from: Account,
                    nonce: nonce
                })
                await nftTxn?.wait()
        
                console.log(nftTxn?.hash)
            } catch (err) {
                console.log(err)
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
                await setCost(costInput.current?.value || "1");
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
        </div>
    )
}

export default Panel2;