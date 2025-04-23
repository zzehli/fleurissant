import { useState } from "react"
import { config } from "@/config"
import { Role } from "@/@types"

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const signup = async (email: string, password: string, role: Role) => {
        setIsLoading(true)
        const rolePath = role === 'admin' ? 'admin' : 'customer'

        fetch(`${config.urls.SERVER_URL}/${rolePath}/signup`, {
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
            if (!response.ok) {
                response.json().then(err => {
                    console.error(err)
                    setError(err.status.message)
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
        signup,
        isLoading,
        error
    }
}

export default useSignup