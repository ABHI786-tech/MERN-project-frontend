import React from 'react'
import { FaUsersLine } from 'react-icons/fa6'

const Dashboard = () => {
    return (
        <div className='grid w-full grid-cols-1 xl:grid-cols-3 py-10  md:grid-cols-2'>
            <div className='flex justify-between w-full border py-3 px-3 border-gray-400 rounded'>
                <FaUsersLine className='text-4xl' />
                <div className="flex flex-col">
                    <p className='text-xl font-medium'>Total Employees</p>
                    <p className='text-end font-bold'>45</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
