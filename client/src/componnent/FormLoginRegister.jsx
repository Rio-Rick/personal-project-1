import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { GoogleLogin } from '@react-oauth/google';
import Swal from "sweetalert2";
import axios from "axios";

const CLIENT_ID = "4d360f2cc0265abaa6a8"

export default function FormLoginRegister({handleSubmit , prop}) {
    const[form, setForm] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    function handleChange(event) {
        const { name, value } = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    async function googleLogin(codeResponse) {
        try {
            console.log(codeResponse);
            const { data } = await axios.post(
                `https://server.rio-rick.tech/google-login`, null, {
                headers: {
                    token: codeResponse.credential
                }
            });
            localStorage.setItem("access_token", data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        }
    }

    // useEffect(() => {
    //     // localhost:3000/?code=ASDFASDFASDFASDF
    //     const queryString = window.location.search;
    //     const urlParams = new URLSearchParams(queryString);
    //     const codeParam = urlParams.get("code");
    //     console.log(codeParam);
    // }, []);

    // function loginWithGithub() {
    //     window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    // }

    return(
        <>
            {/* component */}
            <div className="h-screen flex md:flex">
                <div className="relative overflow-hidden  md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                <div>
                    <img className="w-60" src="/logo.png" alt="" />
                    <h1 className="text-white font-bold text-4xl font-sans">Da Foods</h1>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
                </div>
                <div className="flex w-full  md:w-1/2 justify-center py-10 items-center bg-white">
                    
                <form className="bg-white" onSubmit={(e) => handleSubmit(e,form)}>
                    <img className="w-60 md:hidden" src="/logo.png" alt="" />
                    <h1 className="text-black font-bold text-4xl font-sans md:hidden">Da Foods</h1>

                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">{prop === "login"? "Welcome Back": "Welcome"}</p>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                    </svg>
                    <input
                        className="pl-2 outline-none border-none rounded-box"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                        />
                    </svg>
                    <input
                        className="pl-2 outline-none border-none rounded-box"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    </div>
                    <button
                    type="submit"
                    className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                    >
                    {prop == "login" ? "Login" : "Register"}
                    </button>
                    <div className="text-gray-400">
                        {prop === "login" ? "don't have account ? " : "have account ? "}
                        <Link 
                            to={prop == "login" ? "/registers" : "/login"}
                            className="h-5 w-5 text-gray-400"
                        >
                            {prop == "login" ? "register" : "login  "}
                        </Link>
                    </div>
                    <div className=" items-center justify-center ml-5">
                        <GoogleLogin
                            onSuccess={googleLogin}
                            
                            />
                    </div>
                    {/* <button
                    className="block w-full bg-indigo-600 py-2 rounded-2xl text-white font-semibold mb-2"
                    onClick={loginWithGithub}
                    >
                    Git Hub
                    </button> */}
                </form>
                </div>
            </div>
        </>
    )
}