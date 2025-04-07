import { Product } from '@/@types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const productCard = (product: Product) => {
    return (
        <Card
            className="overflow-hidden"
        >
            <CardContent>
                <img
                    src={product.image_url || "https://placehold.co/300x400"}
                    alt={product.name}
                    className="object-cover aspect-square rounded-xl max-w-[250px] h-full m-auto"
                />
            </CardContent>

            <CardFooter>
                <p className='text-lg font-semibold'>
                    {product.name}
                </p>
            </CardFooter>
        </Card>
    )
}
export default productCard