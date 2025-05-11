import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { CSSProperties, useState } from "react"
import { useCartItemsContext } from "@/hooks"
import { ShoppingCart } from "lucide-react"
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { X } from "lucide-react"
import { ShoppingBag } from "lucide-react"
import { useLocation } from "react-router"

function CartPopover() {
    const { totals, items } = useCartItemsContext()
    const prevQuantityRef = useRef(totals.quantity);
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const cartRef = useRef<HTMLDivElement>(null);

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
        if (totals.quantity > prevQuantityRef.current && !open && location.pathname !== "/cart") {
            setOpen(true);
            prevQuantityRef.current = totals.quantity;
        }
    }, [totals.quantity, open])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Handle clicks outside the cart closes the cart
            // tradeoff: click add to cart button will close and reopen the cart
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        // Add event listener when cart is open
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className="md:relative" ref={cartRef}>
            <Button
                variant="ghost"
                className="flex relative rounded-md px-3 py-2"
                onClick={() => setOpen(!open)}
            >
                <ShoppingCart />
                {(totals.quantity > 0) && (
                    <span
                        className="bg-primary text-primary-foreground"
                        style={badgeStyle}
                    >
                        {totals.quantity}
                    </span>
                )}
            </Button>

            {open && (
                <div className="md:absolute right-0 fixed w-full mt-2 md:w-96 z-50">
                    <div className="bg-popover rounded-md border shadow-md">
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
                                        <div key={index} className="flex">
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPopover
