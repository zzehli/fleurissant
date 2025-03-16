import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useParams } from "react-router"
import { useFetch, useCartItemsContext } from "@/hooks"
import { config } from "@/config"
import { Product as ProductType } from "@/@types"
import { Navbar } from "@/components"
import { Button } from "@/components/ui/button"
const Product = () => {
    const params = useParams()
    const { data: product, loading, error } = useFetch<ProductType>(`${config.urls.SERVER_URL}/products/${params.productId}`)
    const { dispatch } = useCartItemsContext()
    //TODO handle this better
    if (!product) return <div>No product found</div>
    const handleAddToCart = () => {
        console.log('Adding to cart:', product)
        dispatch({ type: 'ADD_ITEM', payload: { productId: String(product.id), quantity: 1, price: product.price } })
    }
    return (
        <>
            <Navbar/>
            <div className="grid grid-cols-6 gap-4 mt-8">
                <Card
                    key={product.id}
                    className="overflow-hidden col-span-6 md:col-span-4 md:col-start-2"
                    >
                    <CardContent>
                    <img
                        src={product.image_url || "https://loremflickr.com/320/240"}
                        alt={product.name}
                        className="object-cover aspect-video rounded-xl w-full h-full"
                    />
                    </CardContent>
                    
                    <CardFooter>
                        <p className='text-2xl font-semibold'>
                            {product.name}
                        </p>
                        <p className='text-lg font-semibold'>
                            ${product.price}
                        </p>
                        <div>
                            <Button 
                                size="lg"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </div>
                        
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
export default Product