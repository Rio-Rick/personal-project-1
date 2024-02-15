import Table from "../componnent/Table";
import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/cuisine/cuisine-slice";
export default function HomePage() {
  const { products, role, loading, error } = useSelector((state) => state.cuisine)
  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchAsync())
    }, [])
    // console.log(products);
    // console.log(role);
    if (loading) return <h1>Loading...</h1>
    return (
        <>        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
                {products.map((product) => {
                    return <Table key={ product.id } product={product} role={role} />
                })}
            </div>
        </>
    )
}