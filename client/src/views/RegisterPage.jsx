import { useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import FormLoginRegister from "../componnent/FormLoginRegister"

export default function RegisterPage() {
    const navigate = useNavigate({url})
    async function handleSubmit(e, form) {
        try {
            e.preventDefault()
            await axios.post(`${url}/registers`, form, {})
            navigate('/login')
            Swal.fire({
                title: "Success!",
                text: "your register has been success",
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
    return (
        <>
            <FormLoginRegister  handleSubmit={handleSubmit} prop={'register'}/>
        </>
    )
}