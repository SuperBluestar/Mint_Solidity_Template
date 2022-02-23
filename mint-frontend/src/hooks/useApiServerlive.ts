import { useEffect, useState } from 'react'
import apiService from 'services/apiService';

export function useApiServerlive (
    update?: number
): Boolean | undefined {
    const [serverlive, setServerlive] = useState<Boolean | undefined>()
  
    useEffect(() => {
        let stale = false
        
        void Promise.all([apiService.pingToServer()]).then(([serverlive_]) => {
            if (!stale) {
                if (serverlive_.success) {
                    setServerlive(serverlive_.success);
                } else {
                    setServerlive(serverlive_.success);
                    alert("It seems Server is not working");
                }
            }
        })

        return () => {
            stale = true
            setServerlive(undefined)
        }
    }, [update])
  
    return serverlive
}