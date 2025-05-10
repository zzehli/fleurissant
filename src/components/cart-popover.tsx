import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "react-router"
import { CSSProperties, useState } from "react"
import { useCartItemsContext } from "@/hooks"
import { ShoppingCart } from "lucide-react"
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { X } from "lucide-react"
import { ShoppingBag } from "lucide-react"

function CartPopover() {
    const { totals, items } = useCartItemsContext()
    const prevQuantityRef = useRef(totals.quantity);

    const [open, setOpen] = useState(false)
    console.log("open ", open)
    const badgeStyle: CSSProperties = {
        borderRadius: '32px',
        position: 'absolute',
        top: 0,
        right: 2,
        translate: '33% -33%',
        fontSize: 11,
        minWidth: 20,
        minHeight: 20,
    }

    useEffect(() => {
        // Only open popover if quantity has increased AND popover is currently closed
        if (totals.quantity > prevQuantityRef.current && !open) {
            setOpen(true);
            // Only update the ref when we actually open the popover
            prevQuantityRef.current = totals.quantity;
        }
    }, [totals.quantity, open])

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="flex relative rounded-md px-3 py-2">
                    <ShoppingCart />
                    {/* badge for cart quantity indication */}
                    {(totals.quantity > 0) && <span
                        className="bg-primary text-primary-foreground"
                        style={badgeStyle}
                    >
                        {totals.quantity}
                    </span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-screen fixed top-0 md:w-96 sticky"
            >
                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <span className="font-semibold text-base">Added to Cart</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-6 w-6">
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4 max-h-60 overflow-auto">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                                        {/* Placeholder instead of image since Item type doesn't have image */}
                                        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-medium text-sm">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">Your cart is empty</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col p-4 pt-0">
                    <Link to="/cart">
                        <Button variant="outline" className="w-full justify-between" size="sm">
                            <span className="flex items-center">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                View Cart
                            </span>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{totals.quantity}</span>
                        </Button>
                    </Link>
                </CardFooter>
            </PopoverContent>
        </Popover>
    )
}

export default CartPopover
