import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "react-router"
import { CSSProperties } from "react"
import { useCartItemsContext } from "@/hooks"
import { ShoppingCart } from "lucide-react"
function CartPopover() {
    const { totals } = useCartItemsContext()
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
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="flex relative rounded-md px-3 py-2">
                    <Link to="/cart">
                        <ShoppingCart />
                        {/* badge for cart quantity indication */}
                        {(totals.quantity > 0) && <span
                            className="bg-primary text-primary-foreground"
                            style={badgeStyle}
                        >
                            {totals.quantity}
                        </span>}
                    </Link>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                something is here
            </PopoverContent>
        </Popover>
    )
}

export default CartPopover