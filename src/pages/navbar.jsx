import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSlicePath } from "../redux/slice/authSlice";
import { useMainContext } from "../context/mainContext";

const Navbar = () => {

    const user = useSelector(authSlicePath)
    const { LogoutHandler } = useMainContext()
    return (
        <div className="flex sticky top-0 item-center px-[8%] justify-between py-4 shadow-md font-semibold gap-x-[12%] bg-linear-to-r from-blue-300 via-blue-600 to-[#1b3891a8] ">
            <div className="px-[3%] font-bold text-[18px] text-center">EMS</div>
            <ul className="flex space-x-8">
                <li>
                    <NavLink
                        to="/" className={({ isActive }) => isActive ? "text-white font-semibold" : "text-gray-800"
                        } > Home </NavLink>
                </li>
                {!user ? <>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "text-white font-semibold" : "text-gray-800"
                        }
                        >Login </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={({ isActive }) => isActive ? "text-white font-semibold" : "text-gray-800"
                        }> Register </NavLink>
                    </li>
                </> :
                    <li className="float-end">
                        <button onClick={LogoutHandler} className="font-semibold px-4 bg-red-500 text-white outline-none rounded cursor-pointer   "
                        > log Out </button>
                    </li>}

            </ul>
        </div>
    );
};

export default Navbar;


