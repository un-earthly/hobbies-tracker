import React, { useEffect, useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useForm } from "react-hook-form";
export default function Table() {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [sortByAscending, setSortByAscending] = useState(true)
    const [dataArray, setDataArray] = useState([])
    const [id, setId] = useState("")
    useEffect(() => {
        axios.get(`https://serene-brook-99567.herokuapp.com/hobby?latest=${sortByAscending}`)
            .then(res => {
                setData(res.data)
                setisLoading(false)
            })
    }, [sortByAscending, data])

    const getrowData = id => {
        const url = `https://serene-brook-99567.herokuapp.com/hobby/${id}`
        axios.get(url)
            .then(res => {
                const existedData = dataArray.find(data => data._id === id)
                if (!existedData) {
                    setDataArray([...dataArray, res.data])
                }
            })

    }
    const removeRowData = id => {
        const existedData = dataArray.filter(data => data._id !== id)
        setDataArray([...existedData])

    }
    const sendRowData = () => {
        axios.post("https://serene-brook-99567.herokuapp.com/mail", dataArray)
            .then(res => console.log(res.data))
    }
    const handleDelete = id => {
        const url = `https://serene-brook-99567.herokuapp.com/hobby/${id}`
        axios.delete(url).then(res => console.log(res.data))

    }
    const onSubmit = data => {
        axios.put(`https://serene-brook-99567.herokuapp.com/hobby/${id}`, data)
            .then(res => reset())
    };
    return (
        <div class="overflow-x-auto">
            <div className='flex items-center justify-center space-x-4 my-5'>
                <button onClick={() => setSortByAscending(!sortByAscending)} className='btn btn-dark block'>{sortByAscending ? "Ascending" : "Descending"}</button>
                <button onClick={sendRowData} className='btn btn-dark block'>Send Row Data</button>
            </div>
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>
                            <div class="indicator">
                                <span class="indicator-item badge badge-primary">{dataArray.length}</span>
                                <p className='p-3'>Rows</p>
                            </div>
                        </th>
                        <th>id</th>
                        <th>Name</th>
                        <th>phone</th>
                        <th>email</th>
                        <th>Hobbies</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? <p>Loading</p> :
                            data.map(d => (
                                <tr key={d._id}>
                                    <td><input type="checkbox" class="checkbox" onClick={e => e.target.checked ? getrowData(d._id) : removeRowData(d._id)} /></td>
                                    <td>{d._id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.email}</td>
                                    <td>{d.hobbies}</td>
                                    <td>

                                        <label for="modal" ><PencilIcon className='hover:text-gray-500 duration-300' height={25} onClick={() => setId(d._id)} /></label>
                                    </td>

                                    <td><TrashIcon className='hover:text-gray-500 duration-300' height={25} onClick={() => handleDelete(d._id)} /></td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>




            {/* modal  */}


            <input type="checkbox" id="modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box pb-14 relative">
                    <label for="modal" class="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-2xl text-center my-4'>Please Update Your Information {id}</h1>
                        <div className='w-3/4 mx-auto space-y-3'>
                            <div>
                                <input
                                    className='input w-full border-2 border-gray-300 focus:border-green-300 focus:outline-none'
                                    placeholder="Please enter your Name"
                                    {...register("name", {
                                        required: "Please Enter Your Name"
                                    })}
                                />
                                {errors.name && <p className='my-3 text-red-500'>{errors.name.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    className='input w-full border-2 border-gray-300 focus:border-green-300 focus:outline-none'
                                    placeholder="Please enter your email"
                                    {...register("email", {
                                        required: "Please enter a valid email",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Please enter a valid email",
                                        }
                                    })}
                                />
                                {errors.email && <p className='my-3 text-red-500'>{errors.email.message}</p>}
                            </div>
                            <div>
                                <input
                                    className='input w-full border-2 border-gray-300 focus:border-green-300 focus:outline-none'
                                    placeholder="Please enter your phone"
                                    {...register("phone", {
                                        required: "Please Enter Your Phone",
                                        pattern: {
                                            value: /^\(?(\d{4})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
                                            message: "please provide a phone number with 11 digits only"
                                        }
                                    })}
                                />
                                {errors.phone && <p className='my-3 text-red-500'>{errors.phone.message}</p>}
                            </div>
                            <div>
                                <input
                                    className='input w-full border-2 border-gray-300 focus:border-green-300 focus:outline-none'
                                    placeholder="Please enter your Hobbies"
                                    {...register("hobbies", {
                                        required: "Please Enter Your Hobbies"
                                    })}
                                />
                                {errors.hobbies && <p className='my-3 text-red-500'>{errors.hobbies.message}</p>}
                            </div>
                            <button className='btn btn-outline btn-success w-full'>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
