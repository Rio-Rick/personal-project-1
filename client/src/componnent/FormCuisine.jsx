import axios from "axios"
import Swal from "sweetalert2";
import { useEffect, useState } from "react"
export default function FormCuisine({products, setFile, form, setForm, handleSubmit, prop}) {
    // const [file, setFile] = useState(null);
    // const [form, setForm] = useState({
    //     name : "",
    //     price : 0,
    //     imgUrl : null,
    // })

    // async function handleSubmit(e, form) {
    //     try {
    //         e.preventDefault()
    //         const token = localStorage.access_token
    //         const fd = new FormData();
    //         fd.append('file', file)
    //         fd.append('name', form.name)
    //         fd.append('price', +form.price)
    //         const config = {     
    //             headers: { 'content-type': 'multipart/form-data' },
    //         }
    //         const { data } = await axios.post(`http://localhost:3000/foods`,fd, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'multipart/form-data'
    //           }
    
    //         });
    //         Swal.fire({
    //             title: "Success!",
    //             text: "add success",
    //             icon: "success"
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        if(products) {
            setForm({
                name : products.name,
                price : products.price,
                imgUrl : products.imgUrl,
            })
        }
    },[products])

    function handleChange(event) {
        const { name, value } = event.target
        setForm({
            ...form,
            [name] : value
        })
    }
    console.log(form);
    return (
        <>
            <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">
                    {prop}
                </h1>
                <form onSubmit={(e) => handleSubmit(e, form)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="name">
                        Name
                        </label>
                        <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name ?? ''}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="price">
                        Price
                        </label>
                        <input
                        id="price"
                        type="number"
                        name="price"
                        value={form.price ?? ''}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Image</label>
                        
                        <div className="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <img src={ products ? products.imageUrl : ""} alt="" />
                        <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" name="imgUrl" className="file-input file-input-bordered file-input-primary w-full max-w"/>
                        <div className="space-y-1 text-center">
                            
                            </div>
                            <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                            
                        </div>
                        </div>
                        
                    </div>

                    <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                        Save
                    </button>
                    </div>
                </form>
            </section>

        </>
    )
}