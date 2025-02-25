import { useState } from "react"
import { config } from "@/config"
import { useAuthContext } from "@/hooks"

const useLogin = () => {
    const { dispatch } = useAuthContext()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        fetch(`${config.urls.SERVER_URL}/admin/login`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'admin': {
                    "email": email,
                    "password": password
                }
            })
        }).then(response => {
            if (response.ok && response.headers.get('authorization')) {
                dispatch({type: 'LOGIN', payload: {
                    authorization: response.headers.get('authorization') || ''
                }})
            } else {
                response.json().then(err => setError(err))
            }
        }).catch(error => {
            console.error(error)
            setError(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }
    
    return {
        login,
        isLoading,
        error
    }
}

export default useLogin