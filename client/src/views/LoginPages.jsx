
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import FormLoginRegister from "../componnent/FormLoginRegister"

export default function LoginPage({url}) {
    const navigate = useNavigate()
    async function handleSubmit(e, form) {
        try {
            e.preventDefault()
            const {data} = await axios.post(`${url}/login`, form, {})
            console.log(data);
            localStorage.setItem("access_token", data.access_token)
            navigate('/')
            Swal.fire({
                title: "Success!",
                text: "Welcome!",
                icon: "success"
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error"
            });
        }
    }



    return (
        <>
            <FormLoginRegister handleSubmit={handleSubmit} prop={'login'} />
        </>
    )
}