import { useFetch } from '@/hooks/useFetch'
import { Product } from '@/@types'
import { config } from '@/config'
import { Button } from "@/components/ui/button"

function Home() {
  const { data: products, loading, error } = useFetch<Product[]>(`${config.urls.SERVER_URL}`)
  return (
    <div className="min-h-screen">
        {/* nav bar */}
        <>
        <nav className="shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <a href="#" className="text-xl font-bold">
                  Fleurissant
                </a>
              </div>

              <div className="flex items-center">
                <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium">
                  <a href="#">Home</a>
                </Button>
                <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium">
                  Collection
                </Button>
                <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </>
      {/* hero section */}
      <>
        <div className="">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to <span className="text-primary">Fleurissant</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover our house plants collection that will bring a touch of nature to your home.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Shop Now
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
      <>
      <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Our Featured Plants
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <div key={product.id} className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-500 mb-2">{product.price}</p>
              <Button variant="outline">Add to Cart</Button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button>View All Products</Button>
        </div>
      </div>
      </div>
      </>
    </div>
  )
}

export default Home
