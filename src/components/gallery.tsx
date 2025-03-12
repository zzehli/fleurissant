import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/@types'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
interface GalleryProps {
  products: Product[] | null
}

const Gallery = ({products}:GalleryProps) => {
  const location = useLocation()
  const numCols = location.pathname === '/collection' ? 'lg:grid-cols-3': 'lg:grid-cols-4'
  const navigate = useNavigate()
  return (
    <section className="w-full py-2 md:py-2 lg:py-2">
      <div className="container">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${numCols} gap-6 mt-1`}>
          {products?.map((product) => (
            <Card 
            key={product.id} 
            className="overflow-hidden"
            onClick={()=>navigate(`/collection/${product.id}`)}>
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