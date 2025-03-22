import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useFetch } from "@/hooks";
import { config } from "@/config"
import { Product } from "@/@types"

const AdminProduct = () => {
  const { data } = useFetch<Product[]>(`${config.urls.SERVER_URL}/admin/products/`, true)
  return (
    <div className="p-10">
      <Table className="">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Product Name</TableHead>
            <TableHead className="w-[200px]">Price</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead className="text-right">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="flex justify-end">
                <Link to={`/admin/products/${product.id}/stocks`}><SquareArrowOutUpRight size={22} /></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default AdminProduct