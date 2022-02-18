import { createContext } from 'react';

import { CHAIN_ID, INFURA_ID } from '../constant';

const Web3Context = createContext({ });

//@ts-ignore
const Web3ContextProvider = ({ children }) => {
    return (
        // <Web3Context.Provider 
        //     value={{
        //     }}
        // >
        children
        // </Web3Context.Provider>
    )
}

export default Web3ContextProvider;