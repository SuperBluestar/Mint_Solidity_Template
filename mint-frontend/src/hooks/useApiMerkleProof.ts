import { useEffect, useState } from 'react'
import apiService from 'services/apiService';

// Not use
export function useApiMerkleProof(
    account?: string,
    update?: number
  ): string[] | undefined {
    const [merkleProof, setMerkleProof] = useState<string[] | undefined>()
  
    useEffect(() => {
        if (account) {
            let stale = false
            
            void Promise.all([apiService.getMerkleProof(account)]).then(([merkleProof]) => {
                if (!stale) {
                    if (merkleProof.success) {
                        setMerkleProof(merkleProof.content);
                    } else {
                        setMerkleProof(merkleProof.content);
                    }
                }
            })
    
            return () => {
                stale = true
                setMerkleProof(undefined)
            }
        }
    }, [account, update])
  
    return merkleProof
  }