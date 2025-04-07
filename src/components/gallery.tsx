import { Product } from '@/@types'
import { useLocation, NavLink } from 'react-router'
import { ProductCard } from '.'
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
              <ProductCard
                product={product}
              />
            </NavLink>

          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery