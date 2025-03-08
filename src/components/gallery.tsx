import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/@types'

interface GalleryProps {
  products: Product[] | null
}

const Gallery = ({products}:GalleryProps) => {
  return (
    <section className="w-full py-2 md:py-2 lg:py-2">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products?.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={product.image || "https://loremflickr.com/320/240"}
                  alt={product.name}
                  className="object-cover mx-auto mt-2"
                  style={{ objectFit: 'fill'}}
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              {/* <CardContent>
                <p className="text-lg font-semibold">{product.price}</p>
              </CardContent> */}
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