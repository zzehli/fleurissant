import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const ProductCardSkeleton = () => {
    return (
        <Card className="overflow-hidden">
            <CardContent>
                <Skeleton className="aspect-square rounded-xl max-w-[250px] h-full m-auto" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-6 w-3/4 m-auto" />
            </CardFooter>
        </Card>
    )
}

export default ProductCardSkeleton 