import Table from "../componnent/Table";
import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/orders/order-slice";

export default function OrderPage({url}) {
    const { myOrder, loading, error } = useSelector((state) => state.order)
    const dispatch = useDispatch()
      useEffect(() => {
        dispatch(fetchAsync())
      }, [])
    //   console.log(myOrder);
      if (loading) return <h1>Loading...</h1>
    //   console.log(time);
    // console.log(myOrder);
      if(myOrder.length == 0) return <h1 className="text-lg">You have no order</h1>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {myOrder.map((product) => {
                return <Table key={ product.id } product={product} prop={'order'}/>
            })}
        </div>
    )
}