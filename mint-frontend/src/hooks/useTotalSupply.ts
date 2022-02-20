import type { BigNumber } from '@ethersproject/bignumber'
import type { Actions, Connector, Web3ReactState, Web3ReactStore } from '@web3-react/types';
import { useEffect, useState } from 'react';

export const useTotalSupply = (
    connector?: Connector,
    account?: string
): BigNumber | string | undefined => {
    const [ totalSupply, setTotalSupply ] = useState<BigNumber | string | undefined>()
    useEffect(() => {
        connector?.provider?.request({
            method: "sendTransaction"
        }).then(res => {

        })
    }, [connector, account]);
    return totalSupply
}