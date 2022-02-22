import { 
    useConnector, 
    useProvider,
    useNftContract,
    useCurrentSupply,
    useTotalSupply
} from 'hooks';

const Dashboard = () => {
    const connector = useConnector();
    const provider = useProvider(connector);
    const contract = useNftContract(provider);
    const currentSupply = useCurrentSupply(contract);
    const totalSupply = useTotalSupply(contract);
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="rounded-md border p-8">
                { currentSupply } / { totalSupply }
            </div>
            <div className="rounded-md border p-8">
                { currentSupply } / { totalSupply }
            </div>
            <div className="rounded-md border p-8">
                { currentSupply } / { totalSupply }
            </div>
            <div className="rounded-md border p-8">
                { currentSupply } / { totalSupply }
            </div>
        </div>
    )
}

export default Dashboard;