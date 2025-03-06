import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/@types'

interface GalleryProps {
  products: Product[] | null
}

const Gallery = ({products}:GalleryProps) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products?.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover"
                  style={{ objectFit: 'fill'}}
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{product.price}</p>
              </CardContent>
              {/* <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
        {/* <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div> */}
      </div>
    </section>
  )
}

export default Gallery