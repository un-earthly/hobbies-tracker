import React, { useEffect, useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import axios from 'axios'
export default function Table() {

    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [sortByAscending, setSortByAscending] = useState(true)
    const [dataArray, setDataArray] = useState([])
    useEffect(() => {
        axios.get(`http://localhost/hobby?latest=${sortByAscending}`)
            .then(res => {
                setData(res.data)
                setisLoading(false)
            })
    }, [sortByAscending, data])

    const getrowData = id => {
        const url = `https://serene-brook-99567.herokuapp.com/hobby/${id}`
        axios.get(url).then(res => {
            const existedData = dataArray.find(data => data.id === id)
            if (!existedData) {
                setDataArray([...dataArray, res.data])
            }
        })

    }
    const removeRowData = id => {
        const existedData = dataArray.filter(data => data.id !== id)
        setDataArray([...existedData])

    }
    const sendRowData = () => {
        axios.post("http://localhost/mail", dataArray)
    }
    const handleDelete = id => {
        const url = `http://localhost/hobby/${id}`
        axios.delete(url).then(res => console.log(res.data))

    }

    return (
        <div class="overflow-x-auto">

            <button onClick={() => setSortByAscending(!sortByAscending)} className='btn btn-dark mx-auto'>{sortByAscending ? "Ascending" : "Descending"}</button>
            <button onClick={sendRowData} className='btn btn-dark mx-auto'>Send Row Data</button>
            <button onClick={sendRowData} className='btn btn-dark mx-auto'>Send Row Data</button>

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
                                    <td><input type="checkbox" class="checkbox" onClick={e => e.target.checked ? getrowData(d.id) : removeRowData(d.id)} /></td>
                                    <td>{d._id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.email}</td>
                                    <td>{d.hobbies}</td>
                                    <td>

                                        <label for="addmore" ><PencilIcon className='hover:text-gray-500 duration-300' height={25} /></label>
                                    </td>

                                    <td><TrashIcon className='hover:text-gray-500 duration-300' height={25} onClick={() => handleDelete(d._id)} /></td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}
