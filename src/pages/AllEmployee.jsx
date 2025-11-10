import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axios'

const AllEmployee = () => {
    const [employeeData, setEmployeeData] = useState([])
    // let EMployeeData=[]
    async function getEmployee() {
        try {
            const data = await axiosClient.get("/allemployee", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            // console.log(data, "data from all emp")
            // EMployeeData=data.data.employees
            setEmployeeData(data.data.employees)
        }
        catch (error) {
            console.log(error, "error from all emp")
        }
    }


    // console.log(employeeData,"employeeData")

    useEffect(() => {
        getEmployee();
    }, [])

    const deleteEmployee = async (id) => {
        try {
            const response = await axiosClient.delete(`/employee/${id}`)
            getEmployee();
            toast.success(response.message)

        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <>
            <div> <h2 className="text-4xl font-bold text-center mb-6">All Employees Details</h2> </div>
            <div>
                <table className="table-fixed border w-full">
                    <thead>
                        <tr>
                            <th className='px-7 border-r border-b'>Name</th>
                            <th className='px-7 border-r border-b'>Phone Number</th>
                            <th className='px-7 border-r border-b'>Email</th>
                            <th className='px-7 border-r border-b'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map((employee) => (
                            <tr >
                                <td className='px-7 border-r border-b text-center'>{employee.name}</td>
                                <td className='px-7 border-r border-b text-center'>{employee.mobile}</td>
                                <td className='px-7 border-r border-b text-center'>{employee.email}</td>
                                <td className='px-7 py-2 border-r border-b '>
                                    <button onClick={() => deleteEmployee(employee._id)} className='bg-red-500 px-3 my-2 mx-3 rounded cursor-pointer hover:bg-red-600'>Delete</button>
                                    <Link to={`/updateemployee/${employee._id}`} className='bg-green-500 px-5 my-2 mx-3 rounded cursor-pointer hover:bg-green-600'>Edit</Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>

    )
}

export default AllEmployee