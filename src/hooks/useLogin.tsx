import { useState } from "react"
import { config } from "@/config"
import { useAuthContext } from "@/hooks"
import { useNavigate } from "react-router"

const useLogin = () => {
    const { dispatch } = useAuthContext()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState<string | null>(null)
    const navigate = useNavigate()
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
            const authorization = response.headers.get('authorization') ?? ''

            if (response.ok && authorization) {
                const token = authorization.split(' ')[1]
                console.log('token', token)
                localStorage.setItem('user', token)
                dispatch({type: 'LOGIN', payload: token})
                //use form redirection instead: https://reactrouter.com/tutorials/address-book#updating-contacts-with-formdata
                navigate('/admin')

            } else {
                response.json().then(err => {
                    console.log(err.error)
                    setError(err.error)
                })
                
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