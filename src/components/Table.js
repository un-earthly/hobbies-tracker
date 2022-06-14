import React, { useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useQuery } from 'react-query'
export default function Table() {

    const [dataArray, setDataArray] = useState([])
    const { isLoading, data } = useQuery('userData', () => axios.get('http://jsonplaceholder.typicode.com/users').then(res => res.data))
    const getrowData = id => {
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
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
        axios.post("https://serene-brook-99567.herokuapp.com/mail", dataArray)
    }
    const handleDelete = id => {
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
        axios.delete(url).then(res => console.log(res.data))

    }

    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>
                            <div class="indicator">
                                <span class="indicator-item badge badge-primary">{dataArray.length}</span>
                                <p className='p-3'>Selected Rows</p>
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
                                <tr key={d.id}>
                                    <td><input type="checkbox" class="checkbox" onClick={e => e.target.checked ? getrowData(d.id) : removeRowData(d.id)} /></td>
                                    <td>{d.id}</td>
                                    <td>name</td>
                                    <td>{d.phone}</td>
                                    <td>{d.email}</td>
                                    <td>{d.company.name}</td>
                                    <td>

                                        <label for="addmore" ><PencilIcon className='hover:text-gray-500 duration-300' height={25} /></label>
                                    </td>

                                    <td><TrashIcon className='hover:text-gray-500 duration-300' height={25} onClick={() => handleDelete(d.id)} /></td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <button onClick={sendRowData} className='btn btn-dark'>Send Row Data</button>
        </div>
    )
}
