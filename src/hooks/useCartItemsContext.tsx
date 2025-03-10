import { useContext } from "react"
import { CartItemsContext } from "@/contexts/CartItemsContext"
const useCartItemsContext = () => {
    const context = useContext(CartItemsContext)
    
    if (!context) {
        throw Error('useCartItemsContext must be used inside an CartItems context provider')
    }

    return context

}

export default useCartItemsContext