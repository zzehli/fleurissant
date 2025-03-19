import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from "@/hooks";
import { config } from "@/config"
import { Stock } from "@/@types"
import { useParams } from "react-router"

const AdminStock = () => {
  const { productId } = useParams()
  const { data, isLoading, isError } = useFetch<Stock[]>(`${config.urls.SERVER_URL}/admin/products/${productId}/stocks`, true)

  return (
    <div className="p-10">
      <Table className="">
        <TableCaption>A list of your recent product stocks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Stock Amount</TableHead>
            <TableHead className="text-right">Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">{stock.amount}</TableCell>
              <TableCell className="flex justify-end">
                {stock.created_at}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default AdminStock