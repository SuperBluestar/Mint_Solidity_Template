import { Link } from 'react-router-dom';

interface ILeftSidebar {
    openedSidebar?: Boolean;
    openHandler?: () => void;
    closeHandler?: () => void;
}

const LeftSidebar = ({
    openedSidebar,
    openHandler,
    closeHandler
}: ILeftSidebar) => {
    return (
        <div className="w-full h-full border-r-2 p-4 relative flex flex-col items-start ">
            {/* <div className="w-full p-4">H</div> */}
            <div 
                className={`${openedSidebar ? "absolute left-full -translate-x-2/4 top-0" : "w-full"} transition cursor-pointer border rounded px-2 py-1 flex justify-center items-center bg-white z-50`}
                onClick={openedSidebar ? closeHandler : openHandler}
            >{ openedSidebar ? "<<" : ">>" }</div>
            <Link to="1" className={`w-full mt-2 rounded-md border px-2 py-1 cursor-pointer ${ openedSidebar ? "" : "text-center" }`}>
                🥇 { openedSidebar ? "Contract" : "" }
            </Link>
            <Link to="2" className={`w-full mt-2 rounded-md border px-2 py-1 cursor-pointer ${ openedSidebar ? "" : "text-center" }`}>
                🥈 { openedSidebar ? "Owner" : "" }
            </Link>
            <Link to="3" className={`w-full mt-2 rounded-md border px-2 py-1 cursor-pointer ${ openedSidebar ? "" : "text-center" }`}>
                🥉 { openedSidebar ? "Backend" : "" }
            </Link>
        </div>
    )
}

export default LeftSidebar;