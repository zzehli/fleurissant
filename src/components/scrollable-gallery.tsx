import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Product } from '@/@types'
import { useLocation, NavLink } from 'react-router'
import { useRef, useCallback, useState, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { config } from '@/config'
import { ProductCard } from '.'
const ScrollableGallery = () => {
    const location = useLocation()
    const numCols = location.pathname === '/collection' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'

    const [page, setPage] = useState(1)
    console.log('page', page)
    const pageParams = new URLSearchParams({ page: page.toString() })
    console.log(`${config.urls.SERVER_URL}/products?${pageParams}`)
    const { data, isError, isLoading } = useFetch<Product[]>(`${config.urls.SERVER_URL}/products?${pageParams}`)
    //for infinite scrolling
    const observer = useRef<IntersectionObserver | null>(null)
    const [moreProducts, setMoreProducts] = useState(true)
    const [products, setProducts] = useState<Product[]>(data || [])
    useEffect(() => {
        if (data) {
            setProducts((prev) => [...prev, ...data])
        }
    }, [data])

    useEffect(() => {
        console.log('change more prod')
        if (products && products.length > 0) {
            setMoreProducts(true)
        } else if (products && products.length === 0) {
            setMoreProducts(false)
        }
    }, [products])
    const lastProductRef = useCallback((node: Element | null) => {
        console.log('lastProductRef isLoading', isLoading)
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            console.log('lastProductRef entry', entries[0])
            if (entries[0].isIntersecting && moreProducts) {
                setPage((prevPage) => prevPage + 1)
            }


        })

        if (node) observer.current.observe(node);


    }, [isLoading, moreProducts])


    return (
        <section className="w-full py-2 md:py-2 lg:py-2">
            <div className="container">
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${numCols} gap-10 mt-1`}>
                    {products?.map((product, index) => {
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
                    })}


                </div>
            </div>
        </section>
    )
}

export default ScrollableGallery