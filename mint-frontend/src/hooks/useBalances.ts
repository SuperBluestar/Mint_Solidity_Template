import type { BigNumber } from '@ethersproject/bignumber'
import type { Web3ReactHooks } from '@web3-react/core'
import { useEffect, useState } from 'react'

export function useBalances(
    provider?: ReturnType<Web3ReactHooks['useProvider']>,
    accounts?: string[],
    update?: number
  ): BigNumber[] | string[] | undefined {
    const [balances, setBalances] = useState<BigNumber[] | string[] | undefined>()
  
    useEffect(() => {
      if (provider && accounts?.length) {
        let stale = false
  
        void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
          if (!stale) {
            setBalances(balances)
          }
        })
  
        return () => {
          stale = true
          setBalances(undefined)
        }
      }
    }, [provider, accounts, update])
  
    return balances
  }