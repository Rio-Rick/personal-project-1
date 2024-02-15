import axios from "axios"
import Swal from "sweetalert2";
import { useEffect, useState } from "react"
import FormCuisine from "../componnent/FormCuisine";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage({ url }) {

    const [products, setProduct] = useState([]);

    const navigate = useNavigate()
    const { id } = useParams()

    async function findFood() {
        try {
            const token = localStorage.access_token

            const {data} = await axios.get(`${url}/foods/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })
            setProduct(data.food)
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error"
            });
        }
    }

    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        name : "",
        price : 0,
        imgUrl : null,
    })

    async function handleSubmit(e, form) {
        try {
            e.preventDefault()
            
            const token = localStorage.access_token
            const fd = new FormData();
            fd.append('file', file)
            fd.append('name', form.name)
            fd.append('price', +form.price)

            if(!form.name) {
                throw {name : "RequiredName"}
            }
            if(!form.price) {
                throw {name : "RequiredPrice"}
            }
            if(!file) {
                throw {name : "RequiredFile"}
            }

            const { data } = await axios.put(`${url}/foods/${id}`,fd, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
    
            });
            // console.log(data);
            navigate('/')

            Swal.fire({
                title: "Success!",
                text: "edit success",
                icon: "success"
            });
        } catch (error) {
            if(error.name === "RequiredName") {
                Swal.fire({
                    title: "Error!",
                    text: "Name is required",
                    icon: "error"
                });
            }
            if(error.name === "RequiredPrice") {
                Swal.fire({
                    title: "Error!",
                    text: "Price is required",
                    icon: "error"
                });
            }
            if(error.name === "RequiredFile") {
                Swal.fire({
                    title: "Error!",
                    text: "Please choose image",
                    icon: "error"
                });
            }
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error"
            });
        }

    }

    useEffect(() => {
        findFood()
    }, [])
    return (
        <>
            <FormCuisine setFile={setFile} handleSubmit={handleSubmit} setForm={setForm} form={form} products={products}  prop={'Edit Food'} />
        </>
    )
}