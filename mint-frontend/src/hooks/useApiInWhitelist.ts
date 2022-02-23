import { useEffect, useState } from 'react'
import apiService from 'services/apiService';

export function useApiInWhitelist(
    account?: string,
    update?: number
  ): Boolean | undefined {
    const [inWhitelist, setInWhitelist] = useState<Boolean | undefined>()
  
    useEffect(() => {
        if (account) {
            let stale = false
            
            void Promise.all([apiService.registeredInWhitelist(account)]).then(([isWhitelist]) => {
                if (!stale) {
                    setInWhitelist(isWhitelist.success);
                }
            })
    
            return () => {
                stale = true
                setInWhitelist(undefined)
            }
        }
    }, [account, update])
  
    return inWhitelist
  }