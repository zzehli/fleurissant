import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { config } from "@/config"
const Success = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const session_id = queryParams.get('session_id')
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch(`${config.urls.SERVER_URL}/checkout/success?session_id=${session_id}`, {
                method: 'GET'
            })
            if (!response.ok) {
                console.error(await response.text())
            } else{
                const data = await response.json()
                setOrderItems(data)
            }
        }
        fetchSession()
    }, [])
    return (
        <div>
            <p>Success Page</p>
            {orderItems.map((item) => (
                <p key={item["id"]}>{item["description"]}</p>
            ))}
        </div>
        
    )
}

export default Success