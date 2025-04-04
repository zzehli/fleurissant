import { useParams } from "react-router"
import { useFetch, useCartItemsContext } from "@/hooks"
import { config } from "@/config"
import { Product as ProductType } from "@/@types"
import { Navbar } from "@/components"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@radix-ui/react-separator"
  
const Product = () => {
    const params = useParams()
    const { data: product, isError: error } = useFetch<ProductType>(`${config.urls.SERVER_URL}/products/${params.productId}`)
    const { dispatch } = useCartItemsContext()
    if (!product || error) return (
        <>
            <Navbar />
            <div className="grid grid-cols-6 gap-4 mt-8">
                <div className="overflow-hidden col-span-6 md:col-span-4 md:col-start-2">
                    <Skeleton className="aspect-video rounded-xl" />
                </div>
            </div>
        </>
    )

    const handleAddToCart = () => {
        console.log('Adding to cart:', product)
        dispatch({ type: 'INCREMENT_COUNT', payload: { id: String(product.id), name: product.name, quantity: 1, price: product.price } })
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div
                    className="flex flex-col md:flex-row md:gap-12 lg:gap-16"
                >
                    <div className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0">
                        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                            <img
                                src={product.image_url || "https://placehold.co/600x400"}
                                alt={product.name}
                                className="object-cover w-full aspect-square transition-transform duration-300"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 lg:w-3/5 flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                        <div className="mt-2 mb-6">
                            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        </div>

                        <Separator className="my-6" />

                        <div className="mb-6">
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="mt-auto">
                            <Button size="lg" onClick={handleAddToCart} className="w-full sm:w-auto px-8 font-medium">
                                Add to Cart
                            </Button>                  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product