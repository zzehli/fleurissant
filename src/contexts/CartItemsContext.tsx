import { Dispatch, ReactNode, createContext, useReducer, useState, } from "react";
interface CartItemsState {
    items: {
        [productId: string]: number
    }
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
| {type: 'ADD_ITEM', payload: {productId: string, quantity: number, price: number}}
| {type: 'REMOVE_ITEM', payload: {productId: string, price: number}}
| {type: 'DECREASE_COUNT', payload: {productId: string, price: number}}
| {type: 'CLEAR_CART'}

export const CartItemsContext = createContext<CartItemsContextProps | null>(null)

const cartItemsReducer = (state: CartItemsState, action: CartItemsAction): CartItemsState => {
    console.log(action, state)
    switch (action.type) {
        case 'ADD_ITEM': {
            const newItems = { ...state.items }
            if (action.payload.productId in newItems) {
                newItems[action.payload.productId] += action.payload.quantity
            } else {
                newItems[action.payload.productId] = action.payload.quantity
            }
            return {
                ...state,
                items: newItems,
                totals: {
                    quantity: state.totals.quantity + action.payload.quantity,
                    total: state.totals.total + action.payload.quantity * action.payload.price,
                }
            }
        }
        case 'DECREASE_COUNT': {
            const newItems = { ...state.items }
            if (newItems[action.payload.productId] > 0) {
                newItems[action.payload.productId] -= 1
                return {
                    ...state,
                    items: newItems,
                    totals: {
                        quantity: state.totals.quantity - 1,
                        total: state.totals.total - action.payload.price,
                    }
                }
            }
            return state
        }
        case 'REMOVE_ITEM': {
            const newItems = { ...state.items }
            if (action.payload.productId in newItems) {
                const quantity = newItems[action.payload.productId]
                delete newItems[action.payload.productId]
                return {
                    ...state,
                    items: newItems,
                    totals: {
                        quantity: state.totals.quantity - quantity,
                        total: state.totals.total - quantity * action.payload.price,
                    }
                }
            }
            return state
        }
        case 'CLEAR_CART':
            return {
                items: {},
                totals: { quantity: 0, total: 0 }
            }
        default:
            return state
    }
}
export const CartItemsContextProvider = ({ children }: CartItemsContextProviderProps) => {
    const [state, dispatch] = useReducer(cartItemsReducer, {items:{}, totals: {quantity: 0, total: 0}})
    console.log('CartItemsContextProvider state:', state)

    return (
        <CartItemsContext.Provider value={{...state, dispatch}}>
            { children }
        </CartItemsContext.Provider>
    )
}