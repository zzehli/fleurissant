import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Product } from '@/@types'
import { useLocation, NavLink } from 'react-router'
interface GalleryProps {
  products: Product[] | null
}

const Gallery = ({ products }: GalleryProps) => {
  const location = useLocation()
  const numCols = location.pathname === '/collection' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
  return (
    <section className="w-full py-2 md:py-2 lg:py-2">
      <div className="container">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${numCols} gap-6 mt-1`}>
          {products?.map((product) => (
            <NavLink to={`/collection/${product.id}`} end>
              <Card
                key={product.id}
                className="overflow-hidden"
                >
                <CardContent>
                <img
                    src={product.image || "https://loremflickr.com/320/240"}
                    alt={product.name}
                    className="object-cover aspect-video rounded-xl w-full h-full"
                  />
                </CardContent>
                  
                <CardFooter>
                  <p className='text-lg font-semibold'>
                    {product.name}
                  </p>
                  <p>${product.price}</p>
                </CardFooter>
              </Card>
            </NavLink>

          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery