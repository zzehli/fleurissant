import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Product } from '@/@types'
import { useLocation, NavLink } from 'react-router'
interface GalleryProps {
  products: Product[] | undefined
}

const Gallery = ({ products }: GalleryProps) => {
  const location = useLocation()
  const numCols = location.pathname === '/collection' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
  return (
    <section className="w-full py-2 md:py-2 lg:py-2">
      <div className="container">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${numCols} gap-10 mt-1`}>
          {products?.map((product) => (
            <NavLink 
              key={product.id} 
              to={`/collection/${product.id}`} end
            >
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
            </NavLink>

          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery