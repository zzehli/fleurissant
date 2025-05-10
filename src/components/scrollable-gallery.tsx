import { Product } from '@/@types'
import { useLocation, NavLink } from 'react-router'
import { useRef, useCallback, useState, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { config } from '@/config'
import { ProductCard, ProductCardSkeleton } from '.'
const LIMIT = 6
const ScrollableGallery = () => {
    const location = useLocation()
    const numCols = location.pathname === '/collection' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'

    const [page, setPage] = useState(1)
    const { data, isLoading } = useFetch<Product[]>(`${config.urls.SERVER_URL}/products?page=${page}&limit=${LIMIT}`)
    //for infinite scrolling
    const observer = useRef<IntersectionObserver | null>(null)
    const [moreProducts, setMoreProducts] = useState(false)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        //TODO: minor problem with strict mode load the initial data twice
        if (data) {
            setProducts((prev) => [...prev, ...data])
        }

        if (data && data.length > 0) {
            setMoreProducts(true)
        } else if (data && data.length === 0) {
            setMoreProducts(false)
        }
    }, [data])

    const lastProductRef = useCallback((node: Element | null) => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && moreProducts) {
                setPage((prevPage) => prevPage + 1)
            }
        })

        if (node) observer.current.observe(node);
    }, [isLoading, moreProducts])

    // Create an array of 8 skeleton items for loading state
    const skeletonItems = Array(LIMIT).fill(null)

    return (
        <section className="w-full py-2 md:py-2 lg:py-2">
            <div className="container">
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${numCols} gap-10 mt-1`}>
                    {products.length === 0 && isLoading ? (
                        // Show skeletons on initial load
                        skeletonItems.map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    ) : (
                        // Show products with last item having ref for infinite scroll
                        products.map((product, index) => {
                            if (index === products.length - 1) {
                                return (
                                    <div
                                        key={product.id}
                                        ref={lastProductRef}
                                    >
                                        <NavLink
                                            to={`/collection/${product.id}`} end
                                        >
                                            <ProductCard
                                                product={product}
                                            />
                                        </NavLink>
                                    </div>
                                )
                            } else {
                                return (
                                    <NavLink
                                        key={product.id}
                                        to={`/collection/${product.id}`} end
                                    >
                                        <ProductCard
                                            product={product}
                                        />
                                    </NavLink>
                                );
                            }
                        })
                    )}
                    {/* Show loading skeletons at the bottom when loading more items */}
                    {isLoading && products.length > 0 && (
                        skeletonItems.map((_, index) => (
                            <ProductCardSkeleton key={`loading-${index}`} />
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default ScrollableGallery