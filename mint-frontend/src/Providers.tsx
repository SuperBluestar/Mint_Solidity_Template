import { FC } from 'react';
import Web3ContextProvider from 'context/web3Context';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from 'utils/web3React'

const Providers: FC = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ContextProvider>
            { children }
            </Web3ContextProvider>
        </Web3ReactProvider>
    )
}

export default Providers