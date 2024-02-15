import axios from "axios"
import { useState , useEffect} from "react";
import Swal  from "sweetalert2"
import { fetchAsync } from "../features/cuisine/cuisine-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const url = "https://server.rio-rick.tech";

export default function Table({product, prop, role}) {
    function currencyFormat(num) {
        return 'Rp ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(time);
    // const[role,setRole] = useState('')

    function handleEdit(id) {
        navigate(`/edit/${id}`)
    }
    async function handleOrder(id) {
        try {
            const token = localStorage.access_token
            const{ data } = await axios.get(`${url}/payment/midtrans/initiate/${id}`,{
                headers: { Authorization: `Bearer ${token}`}
            })
            // console.log(data);
            window.snap.pay(`${data.transactionToken}`, {
                onSuccess: async function(result){
                  /* You may add your own implementation here */
                  alert("payment success!");

                //   if(result.order_id) {
                //       await axios.post(`http://localhost:3000/order/${id}`,{},{
                //           headers: { Authorization: `Bearer ${token}`}
                //       })
                      Swal.fire({
                          title: "Success!",
                          text: "Order success",
                          icon: "success"
                      });
                //   }
                },
                onPending: async function(result){
                  /* You may add your own implementation here */
                  console.log(result);
                  alert("wating your payment!");
                  await axios.delete(`${url}/payment/midtrans/cancel/${data.order.id}`,{
                    headers: { Authorization: `Bearer ${token}`}
                  })
                },
                onError: async function(result){
                  /* You may add your own implementation here */
                  alert("payment failed!");
                  await axios.delete(`${url}/payment/midtrans/cancel/${data.order.id}`,{
                    headers: { Authorization: `Bearer ${token}`}
                  })
                },
                onClose: async function(){
                  /* You may add your own implementation here */
                  alert('you closed the popup without finishing the payment');
                  await axios.delete(`${url}/payment/midtrans/cancel/${data.order.id}`,{
                    headers: { Authorization: `Bearer ${token}`}
                  })
                }
            })
            console.log(id);

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error"
            });
        }
    }
    async function handleDelete(id){
        try {
            const token = localStorage.access_token
            await axios.delete(`${url}/foods/${id}`,{
                headers: { Authorization: `Bearer ${token}`}
            })
            // navigate('/')
            dispatch(fetchAsync())

            Swal.fire({
                title: "Success!",
                text: "delete success",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error"
            });
        }
    }

    // useEffect(() => {
    //     // dispatch(fetchAsync())
    // }, [])
    
    function convertDate(date) {
        const newDate = new Date(date)
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return newDate.toLocaleDateString('id-ID', options)
    }

    function convertTime(date) {
        const newDate = new Date(date)
        return newDate.toLocaleTimeString('en-US')
    }
    // console.log(role);
    return (
        <>
        <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
            <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">{product.name}</span>
            <img className="w-64 mx-auto transform transition duration-300 hover:scale-105" src={product.imageUrl} alt="" />
            <div className="flex flex-col items-center my-3 space-y-2">
                {/* <h1 className="text-gray-900 poppins text-lg">a</h1>
                <p className="text-gray-500 poppins text-sm text-center">a</p>
                <h2 className="text-gray-900 poppins text-2xl font-bold">a</h2> */}
                    <h1 className="text-gray-900 poppins text-lg">Price : {currencyFormat(product.price)}</h1>
                <div className={prop == "order" ? "hidden" : ""}>
                        <button className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105 "  onClick={() => {handleOrder(product.id)}}>Order Now</button>
                    <span className={role == "admin" ? "" : "hidden"}>
                        <button className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105 "  onClick={() => {handleEdit(product.id)}}>Edit</button>
                        <button className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full  transform transition duration-300 hover:scale-105 "  onClick={() => {handleDelete(product.id)}}>Delete</button>
                    </span>
                </div>
                <div className={prop == "order" ? "" : "hidden"}>
                     <p className="text-gray-500 poppins text-sm text-center">{convertDate(product.createdAt)} {convertTime(product.createdAt)}</p>
                </div>
            </div>
        </div>
        </>
    )
}