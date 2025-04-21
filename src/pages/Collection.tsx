import { ScrollableGallery, Navbar } from '@/components'

const Collection = () => {

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6">
        <ScrollableGallery />
      </div>
    </>

  )
}

export default Collection