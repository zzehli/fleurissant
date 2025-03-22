import { Dispatch, ReactNode, createContext, useReducer } from "react";
interface Item {
    id: string,
    name: string,
    price: number,
    quantity: number
}

interface CartItemsState {
    items: Item[],
    totals: {
        quantity: number,
        total: number,
    }
}

interface CartItemsContextProviderProps { children: ReactNode }

interface CartItemsContextProps extends CartItemsState {
    dispatch: Dispatch<CartItemsAction>
}

type CartItemsAction = 
| {type: 'INCREMENT_COUNT', payload: Item}
| {type: 'REMOVE_ITEM', payload: Item}
| {type: 'DECREMENT_COUNT', payload: Item}
| {type: 'CLEAR_CART'}

export const CartItemsContext = createContext<CartItemsContextProps | null>(null)

const cartItemsReducer = (state: CartItemsState, action: CartItemsAction): CartItemsState => {
    console.log(action, state)
    switch (action.type) {
        case 'INCREMENT_COUNT': {
            // const newItems = [...state.items] 
            const item = state.items.find((item) => item.id === action.payload.id)
            let newItems = null
            if (item) {
                newItems = state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item
                    }
                })
            } else {
                newItems = [...state.items, {...action.payload, quantity: 1}]   
            }
            return {
                // ...state,
                items: newItems,
                totals: {
                    quantity: state.totals.quantity + 1,
                    total: state.totals.total + action.payload.price,
                }
            }
        }
        case 'DECREMENT_COUNT': {
            let newItems = []
            const item = state.items.find((item) => item.id === action.payload.id)

            if (item && item.quantity > 1) {
                newItems = state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    } else {
                        return item
                    }
                })            
            } else if (item) {
                newItems = state.items.filter((item) => item.id !== action.payload.id)
            } else {
                newItems = [...state.items]
            }
            
            return {
                items: newItems,
                totals: {
                    quantity: state.totals.quantity - 1,
                    total: state.totals.total - action.payload.price,
                }
            }
            
        }
        case 'REMOVE_ITEM': {
            const item = state.items.find((item) => item.id === action.payload.id)
            const outputItems = state.items.filter((item) => item.id !== action.payload.id)
            if (item) {
                return {
                    items: outputItems,
                    totals: {
                        quantity: state.totals.quantity - item.quantity,
                        total: state.totals.total - item.quantity * action.payload.price,
                    }
                }
            }
            return state
        }
        case 'CLEAR_CART':
            return {
                items: [],
                totals: { quantity: 0, total: 0 }
            }
        default:
            return state
    }
}
export const CartItemsContextProvider = ({ children }: CartItemsContextProviderProps) => {
    const [state, dispatch] = useReducer(cartItemsReducer, {items: [], totals: {quantity: 0, total: 0}})
    console.log('CartItemsContextProvider state:', state)

    return (
        <CartItemsContext.Provider value={{...state, dispatch}}>
            { children }
        </CartItemsContext.Provider>
    )
}