import { useAuthContext } from "@/hooks"

const useLogout = () => {
    const { dispatch } = useAuthContext()
    console.log('logging out')
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }
    
    return { logout }
}

export default useLogout