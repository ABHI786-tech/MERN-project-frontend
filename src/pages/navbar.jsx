import React from "react";
import logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSlicePath } from "../redux/slice/authSlice";
import { useMainContext } from "../context/mainContext";

const Navbar = () => {

    const user = useSelector(authSlicePath)
    const { LogoutHandler } = useMainContext()
    return (
        <div className="flex justify-around item-center  px-6 py-4 bg-gray-100 shadow-md bg-gray-300 font-semibold">
            <div className="flex flex-row "><span> <img src={logo} alt="Logo" className="w-7 h-7" /></span><span className="px-8 font-bold text-xl">Employee Manager </span></div>
            <ul className="flex space-x-8">
                <li>
                    <NavLink
                        to="/" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                        } > Home </NavLink>
                </li>
                {!user ? <>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                        }
                        >Login </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                        }> Register </NavLink>
                    </li>
                </> :
                    <li>
                        <button onClick={LogoutHandler} className="font-semibold px-4 bg-red-500 text-white outline-none rounded cursor-pointer "
                        > log Out </button>
                    </li>}

            </ul>
            {/* <div>
                <div>profile photo</div>
                <div>profile name</div>
            </div> */}
        </div>
    );
};

export default Navbar;


