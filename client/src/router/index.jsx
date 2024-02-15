import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from '../views/LoginPages'
import RegisterPage from "../views/RegisterPage";
import BaseLayout from "../views/BaseLaylout";
import HomePage from "../views/HomePage";
import OrderPage from "../views/OrderPage";
import FormCuisine from "../componnent/FormCuisine";
import AddPage from "../views/AddPage";
import EditPage from "../views/EditPage";
const url = "https://server.rio-rick.tech";

const router = createBrowserRouter([
    {
        path : "/login",
        element : <LoginPage url={url} />,
        loader : () => {
            if(localStorage.access_token) {
                return redirect('/')
            }
            return null
        }
    },
    {
        path : "/register",
        element : <RegisterPage url={url} />,
        loader : () => {
            if(localStorage.access_token) {
                return redirect('/')
            }
            return null
        }
    },
    {
        element : <BaseLayout />,
        loader : () => {
            if(!localStorage.access_token) {
                return redirect('/login')
            }
            return null
        },
        children : [
            {
                path : '/',
                element : <HomePage url={url} />
            },
            {
                path : '/my-order',
                element : <OrderPage url={url} />
            },
            {
                path : '/add',
                element : <AddPage url={url} />
            },
            {
                path : '/edit/:id',
                element : <EditPage url={url} />
            }
        ]
    }
])

export default router