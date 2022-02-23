import { Link } from 'react-router-dom';

const Dashboard = () => {
    
    return (
        <div className="grid grid-cols-3 gap-4">
            <Link to="1">
                <div className="h-24 rounded-md border flex justify-center text-center items-center hover:bg-pink-600 text-black hover:text-white">Contract Status</div>
            </Link>
            <Link to="2">
                <div className="h-24 rounded-md border flex justify-center text-center items-center hover:bg-pink-600 text-black hover:text-white">Set Contract Values</div>
            </Link>
            <Link to="3">
                <div className="h-24 rounded-md border flex justify-center text-center items-center hover:bg-pink-600 text-black hover:text-white">Backend</div>
            </Link>
        </div>
    )
}

export default Dashboard;