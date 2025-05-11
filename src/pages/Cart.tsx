import { useState } from "react"
import { Navbar } from "@/components"
import { useCartItemsContext } from "@/hooks"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { config } from "@/config"
const Cart = () => {
    const { totals, items, dispatch } = useCartItemsContext()
    const [loading, setLoading] = useState(false)
    const onCheckout = async () => {
        setLoading(true)
        const response = await fetch(`${config.urls.SERVER_URL}/checkout`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'cart': items
            })
        })

        if (!response.ok) {
            const errorMsg = await response.text()
            setLoading(false)
            throw new Error(`Request error! status: ${response.status}, message: ${errorMsg}`)
        }
        const data = await response.json()
        window.location.href = data.url
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-12 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row justify-center gap-y-20">
                    {/* Cart Items Section */}
                    {items.length === 0 ?
                        (<div className="mx-8 lg:w-1/2">
                            <h1 className="text-2xl font-semibold mb-3 ">Cart</h1>
                            <h2 className="text-lg font-semibold">Your cart is empty.</h2>
                        </div>) :
                        (<div className="mx-8 lg:w-1/2">
                            <h1 className="text-3xl font-semibold mb-8">Cart Items</h1>
                            {items.map(({ id, price, name, quantity }) => (
                                <div key={id}>
                                    <div className="flex justify-between md:gap-24 pb-4">
                                        {/* Product Image */}
                                        {/* <div className="bg-gray-50 rounded-md overflow-hidden">
                                        <img src={item.image || "/placeholder.svg"} alt={productId} className="w-full h-full object-cover" />
                                    </div> */}

                                        {/* Product Details */}
                                        <div className="flex flex-col">
                                            <h3 className="font-medium text-md">{name}</h3>

                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="font-medium text-md">${price}</p>
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => dispatch({ type: 'DECREMENT_COUNT', payload: { id, price, name, quantity: 1 } })}
                                            >
                                                <Minus className="h-3 w-3" />
                                                <span className="sr-only">Decrease quantity</span>
                                            </Button>

                                            <span className="mx-4 min-w-8 text-center">{quantity}</span>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => dispatch({ type: 'INCREMENT_COUNT', payload: { id, name, quantity: 1, price } })}
                                            >
                                                <Plus className="h-3 w-3" />
                                                <span className="sr-only">Increase quantity</span>
                                            </Button>
                                        </div>

                                        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id, name, quantity: 1, price } })}>
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove item</span>
                                        </Button>

                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <span className="sr-only">Add to favorites</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>)

                    }

                    {/* Order Summary Section */}
                    <div>
                        <Card className="mx-8 w-max-content lg:w-80">
                            <h2 className="text-3xl font-semibold mb-8">Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span>Subtotal</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="rounded-full bg-gray-200 w-4 h-4 flex items-center justify-center text-xs">
                                                        ?
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Total before taxes and shipping</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <span className="font-medium">${totals.total.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span>Estimated Delivery & Handling</span>
                                    <span>Free</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between items-center font-medium">
                                    <span>Total</span>
                                    <span>${totals.total.toFixed(2)}</span>
                                </div>


                                <Button
                                    variant="default"
                                    className="w-full  h-12"
                                    onClick={() => onCheckout()}
                                    disabled={loading || !items.length}
                                >
                                    Non-Member Checkout
                                </Button>
                                {/* <Button 
                                    variant="secondary" 
                                    className="w-full  h-12"
                                    disabled={loading || !items.length}
                                >
                                    Member Checkout
                                </Button> */}

                                {/* <div className="bg-gray-100 rounded-md p-4 flex justify-center mt-4">
                                    <img src="/placeholder.svg?height=30&width=80" alt="PayPal" className="h-8" />
                                </div> */}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart
