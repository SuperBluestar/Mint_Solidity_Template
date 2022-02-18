import { FC } from 'react';
import Web3ContextProvider from 'context/web3Context';
import Web3ModalContextProvider from 'context/web3ModalContext';

const Providers: FC = ({ children }) => {
    return (
        <Web3ContextProvider>
            <Web3ModalContextProvider>
            { children }
            </Web3ModalContextProvider>
        </Web3ContextProvider>
    )
}

export default Providers