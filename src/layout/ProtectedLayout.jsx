import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { authSlicePath } from "../redux/slice/authSlice"
import { MdDashboard } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { FaUsersLine } from 'react-icons/fa6'



const SidebarItemList = [{
    name: 'Dashboard',
    link: '/',
    Icon: MdDashboard
},
{
    name: 'Add Employee',
    link: '/addemployee',
    Icon: FaUser
}, {
    name: 'All Employee',
    link: '/allemployee',
    Icon: FaUsersLine
},
]
const ProtectedLayout = () => {
    const user = useSelector(authSlicePath)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } else {
            setLoading(false)
        }
    },
        [user])

    if (loading) {
        return <div>loading...</div>

    }

    return (
        <>
            <div className='flex w-[90%] mx-7 flex-col gap-y-6 lg:flex-row  item-start py-12 gap-x-9'>
                <div className='w-1/4 hidden lg:flex flex-col min-h-[80vh] bg-gray-300 py-4'>
                    {
                        SidebarItemList.map((cur, i) => {
                            return <SidebarMenuItem item={cur} key={i} />
                        })
                    }
                </div>
                <ul className="flex item-center gap-x-3 lg:hidden" >
                    {
                        SidebarItemList.map((cur, i) => {
                            const isActive = window.location.pathname === cur.link
                            return (<li
                                key={i}
                                className={`  px-3 py-1 rounded-full transition-colors duration-200 cursor-pointer hover:bg-gray-600 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 '}
                                `}>
                                <Link to={cur.link} className='flex items-center gap-x-1'>
                                <cur.Icon className='text-lg'/><span>{cur.name}</span></Link>
                            </li>)
                        })
                    }
                </ul>
                <section><Outlet /></section>
            </div>
        </>)
}
export default ProtectedLayout;


const SidebarMenuItem = ({ item }) => {
    const { pathname } = useLocation()
    const isActive = pathname === item.link
    return <Link
        to={item.link}
        className={`w-full py-3 px-3 flex justify-start gap-x-3 items-center rounded-md transition-colors duration-200 cursor-pointer ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}
      `}
    >
        <item.Icon className='text-2x1' />  <span>{item.name}</span>
    </Link>
}