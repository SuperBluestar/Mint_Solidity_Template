import Loader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const Index = () => {
    const [loading, setLoading] = useState<Boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 4000)
    }, [])
    return (
        <div className="mx-auto md:container">
            <h3 className="w-full text-center text-4xl font-extrabold uppercase py-4 animate-pulse">Admin Page</h3>
            <div className="w-full flex justify-center">
            { 
                loading ? 
                <div className="w-full h-96 flex justify-center items-center">
                    <Loader />
                </div> : 
                <Outlet /> 
            }
            </div>
        </div>
    )
}

export default Index;