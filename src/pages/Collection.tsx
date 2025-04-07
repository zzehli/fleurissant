import { ScrollableGallery, Navbar } from '@/components'

const Collection = () => {

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mt-10 text-center tracking-tighter sm:text-3xl md:text-3xl">
          Collection
        </h2>
        <ScrollableGallery />
      </div>
    </>

  )
}

export default Collection