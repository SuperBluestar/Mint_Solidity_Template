import { useEffect, useState } from 'react'
import apiService from 'services/apiService';

export function useApiWhitelist(
    page?: number,
    cntperpage?: number,
    search?: string,
    update?: number
  ): [] | undefined {
    const [whitelist, setWhitelist] = useState<[] | undefined>()
  
    useEffect(() => {
    let stale = false

    void Promise.all([apiService.getWhitelist(page, cntperpage, search)]).then(([whitelist]) => {
        if (!stale) {
            if (whitelist.success) {
                setWhitelist(whitelist.content);
            } else {
                setWhitelist(whitelist.content);
            }
        }
    })

    return () => {
        stale = true
        setWhitelist(undefined)
    }
    }, [page, cntperpage, search, update])
  
    return whitelist
}