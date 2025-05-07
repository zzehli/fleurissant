import { useFetch } from '@/hooks'
import { Product } from '@/@types'
import { config } from '@/config'
import { Button } from "@/components/ui/button"
import { Gallery } from '@/components'
import { Link } from 'react-router'
import bgPhoto from '@/assets/photo-1487070183336-b863922373d4.jpg'

function Home() {
  const { data: products, isLoading } = useFetch<Product[]>(`${config.urls.SERVER_URL}`)
  return (
    <div className="min-h-screen">
      {/* hero section */}
      <div>
        <div
          className="h-[70vh] flex items-center bg-cover"
          style={{ backgroundImage: `url(${bgPhoto})` }}
        >
          <div className="flex items-center justify-center bg-neutral-500/60 h-full w-full mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-stone-200">
                Welcome to <span className="text-primary">Fleurissant</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl text-stone-200 md:max-w-3xl">
                Bring a touch of nature to your home.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md">
                  <Button size="lg" className='font-bold text-base'>
                    <Link to="/collection">
                      Shop Now
                    </Link>
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="w-full py-6 md:py-12 lg:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <Gallery products={products} productIsLoading={isLoading} />
          </div>
        </div>
      </>
    </div>
  )
}

export default Home
