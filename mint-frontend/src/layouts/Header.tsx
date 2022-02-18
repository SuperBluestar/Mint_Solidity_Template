import { Web3ModalContext } from 'context/web3ModalContext'
import { useContext } from 'react';
// import Web3 from 'web3';


const Header = () => {
    const { openModal, isActive, wallet, account, balance } = useContext(Web3ModalContext);
    
    return (
        <div className="w-full">
            <div className="border-b-2 bg-green-300 px-4 py-2 mx-auto md:container flex justify-between">
                <h3>Header</h3>
                { !isActive ? 
                <div className="" onClick={openModal}>
                    Connect Wallet
                </div> : <div className="flex">
                    <span>{ wallet }</span>
                    <span>{ account }</span>
                    <span>{ balance }</span>
                </div>
                }
            </div>
        </div>
    )
}

export default Header;