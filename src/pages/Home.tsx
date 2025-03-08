import { useFetch } from '@/hooks'
import { Product } from '@/@types'
import { config } from '@/config'
import { Button } from "@/components/ui/button"
import { Navbar, Gallery } from '@/components'
function Home() {
  const { data: products, loading, error } = useFetch<Product[]>(`${config.urls.SERVER_URL}`)
  return (
    <div className="min-h-screen">
      <Navbar/>
      {/* hero section */}
      <>
        <div className="">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-neutral-800">
                Welcome to <span className="text-primary">Fleurissant</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl neutral md:max-w-3xl">
                Bring a touch of nature to your home.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md">
                  <Button size="lg" className='font-bold text-base'>Shop Now</Button>
                </div>
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3">
                  <Button variant="secondary" size="lg" className='font-bold text-base shadow'>Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <>
        <div className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-3xl">
              Our Featured Plants
            </h2>
            <Gallery products={products} />
          </div>
        </div>
      </>
    </div>
  )
}

export default Home
