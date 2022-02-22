import { 
    useConnector, 
    useProvider,
    useNftContract,
    useCurrentSupply,
    useTotalSupply
} from 'hooks';

const Panel1 = () => {
    const connector = useConnector();
    const provider = useProvider(connector);
    const contract = useNftContract(provider);
    const currentSupply = useCurrentSupply(contract);
    const totalSupply = useTotalSupply(contract);
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-md border flex justify-center items-center">
                { currentSupply !== undefined ? currentSupply : "~" } / { totalSupply ? totalSupply : "~" }
            </div>
            <div className="rounded-md border flex justify-center items-center">
                { currentSupply } / { totalSupply }
            </div>
            <div className="rounded-md border flex justify-center items-center">
                { currentSupply } / { totalSupply }
            </div>
            <div className="rounded-md border flex justify-center items-center">
                { currentSupply } / { totalSupply }
            </div>
        </div>
    )
}

export default Panel1;