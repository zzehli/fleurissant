import { useParams } from "react-router"
const Product = () => {
    const params = useParams()
    return (
        <div>Product ID: {params.productId}</div>
    )
}
export default Product