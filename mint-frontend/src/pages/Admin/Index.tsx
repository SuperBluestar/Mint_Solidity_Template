import Loader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    useConnector,
    useAccount,
    useProvider,
    useContractOwner,
    useNftContract
} from 'hooks';
import LeftSidebar from './LeftSidebar';
import { useMediaQuery } from "react-responsive";
import { md } from 'constant';

const Index = () => {
    const [loading, setLoading] = useState<Boolean>(true);
    const navigate = useNavigate();
    const connector = useConnector();
    const Account = useAccount(connector);
    const provider = useProvider(connector);
    const contract = useNftContract(provider);
    const owner = useContractOwner(contract);
    useEffect(() => {
        if (typeof owner === 'string') {
            if (owner === Account) {
                setLoading(false);
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [owner])

    const isPortrait = useMediaQuery({ query: `(max-width: ${md})` });
    const [openedSidebar, setOpenedSidebar] = useState<Boolean>(!isPortrait);
    return (
        <div className="w-full ml-0 md:mx-auto md:container overflow-x-hidden">
            <h3 className="w-full text-center text-4xl font-extrabold uppercase py-4 animate-pulse">👨‍🎓Admin👨‍🎓 Page</h3>
            <div className="w-fit md:w-full flex justify-center">
            { 
                loading ? 
                <div className="w-screen h-96 flex justify-center items-center">
                    <Loader />
                </div> : 
                <>
                    <aside className={`flex-shrink-0 flex-grow-0 transition-all ${openedSidebar ? "w-64" : "w-20"}`}>
                        <LeftSidebar 
                            openedSidebar={openedSidebar}
                            openHandler={() => setOpenedSidebar(true)} 
                            closeHandler={() => setOpenedSidebar(false)}
                        />
                    </aside>
                    <section className="flex-shrink flex-grow py-4 px-2 md:px-10 min-h-screen" style={{
                        width: "calc(100vw - 80px)",
                    }}>
                        <Outlet /> 
                    </section>
                </>
            }
            </div>
        </div>
    )
}

export default Index;