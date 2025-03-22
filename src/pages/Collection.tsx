import { Product } from '@/@types'
import { Gallery, Navbar } from '@/components'
import { useFetch } from '@/hooks'
import { config } from '@/config'

const Collection = () => {
  const { data: products } = useFetch<Product[]>(`${config.urls.SERVER_URL}/products`)
    
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mt-10 text-center tracking-tighter sm:text-3xl md:text-3xl">
                Collection
            </h2>
            <Gallery products={products} />
        </div>
    </>

  )
}

export default Collection