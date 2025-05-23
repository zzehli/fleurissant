import { useState } from "react"
import { config } from "@/config"
import { useAuthContext } from "@/hooks"
import { useNavigate } from "react-router"
import { Role, RoleObject } from "@/@types"

const useLogin = () => {
    const { dispatch } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const login = async (email: string, password: string, role: Role) => {
        setIsLoading(true)
        const rolePath = role === RoleObject.ADMIN ? RoleObject.ADMIN : RoleObject.CUSTOMER
        console.log('rolePath', rolePath)
        fetch(`${config.urls.SERVER_URL}/${rolePath}/login`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                [rolePath]: {
                    "email": email,
                    "password": password
                }
            })
        }).then(response => {
            const authorization = response.headers.get('authorization') ?? ''

            if (response.ok && authorization) {
                const token = authorization.split(' ')[1]
                localStorage.setItem('user', token)
                localStorage.setItem('role', role)
                dispatch({ type: 'LOGIN', payload: { token, role } })
                //TODO: use form redirection instead: https://reactrouter.com/tutorials/address-book#updating-contacts-with-formdata
                navigate(`/${role}`)

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