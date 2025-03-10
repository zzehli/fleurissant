import { ReactNode, createContext, useState, } from "react";
interface CartItemsState {
    items: {
        [productId: string]: number
    }
    totals: {
        quantity: number,
        total: number,
    }
}

interface CartItemsContextProviderProps { children: ReactNode}

interface CartItemsContextProps {
    cartItems: CartItemsState;
    setCartItems: (itemList: CartItemsState) => void
}

export const CartItemsContext = createContext<CartItemsContextProps | null>(null)
export const CartItemsContextProvider = ({ children }: CartItemsContextProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItemsState>({items:{}, totals: {quantity: 0, total: 0}})
    return (
        <CartItemsContext.Provider value={{cartItems, setCartItems}}>
            { children }
        </CartItemsContext.Provider>
    )
}