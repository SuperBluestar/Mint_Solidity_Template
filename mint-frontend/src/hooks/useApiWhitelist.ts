import { useEffect, useState } from 'react'
import apiService from 'services/apiService';

interface iWhitelist {
    walletAddress: string,
    allowed: number,
}

interface iWhitelistRes {
    whitelist?: iWhitelist[],
    totalCnt?: number
}

export function useApiWhitelist(
    page?: number,
    cntperpage?: number,
    search?: string,
    update?: number
  ): iWhitelistRes {
    const [whitelist, setWhitelist] = useState<iWhitelist[] | undefined>()
    const [totalCnt, setTotalCnt] = useState<number | undefined>()
  
    useEffect(() => {
        let stale = false

        void Promise.all([apiService.getWhitelist(page, cntperpage, search)]).then(([whitelist]) => {
            if (!stale) {
                if (whitelist.success) {
                    setWhitelist(whitelist.content);
                } else {
                    setWhitelist([]);
                }
            }
        })

        return () => {
            stale = true
            setWhitelist(undefined)
        }
    }, [page, cntperpage, search, update])
    
    useEffect(() => {
        let stale = false

        void Promise.all([apiService.getCountWhitelist()]).then(([count]) => {
            if (!stale) {
                if (count.success) {
                    setTotalCnt(count.content);
                } else {
                    setTotalCnt(undefined);
                }
            }
        })

        return () => {
            stale = true
            setTotalCnt(undefined)
        }
    }, [update])
  
    return { whitelist, totalCnt }
}