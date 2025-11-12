import React, { useEffect } from 'react'
import { FaUsersLine } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { authSlicePath } from '../redux/slice/authSlice'


const Dashboard = () => {

    const AuthUser = useSelector(authSlicePath)
    return (
        <div className='grid  grid-cols-1 xl:grid-cols-3 py-10  md:grid-cols-2'>
            <div className='flex justify-between border py-3 px-3 border-gray-400 rounded'>
                <FaUsersLine className='text-4xl' />
                <div className="flex flex-col">
                    <p className='text-xl font-medium'>Total Employees</p>
                    <p className='text-end font-bold'>{AuthUser && AuthUser?.total_employee}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
