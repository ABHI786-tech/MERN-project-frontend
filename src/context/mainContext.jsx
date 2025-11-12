import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { removeUser, setUser } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axios";


const MainContext = createContext();


export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const [initialValues, setInitialValues] = useState({
    name: "",
    salary: "",
    mobile: "",
    email: "",
    role: "",
    dob: "",
    address: ""
  });
  


  const LogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    toast.success("Logout successful!");
    navigate("/login");
  };

 
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      if (!token) {
        // console.log("❌ No token found, returning early");
        setLoading(false);
        return;
      }
      const response = await axiosClient.get("/profile", {
        headers:{
          Authorization:`Bearer ${token}`
        },
      });
    
      
      const data = response.data
      dispatch(setUser({user:response.data}));
      // toast.success(data.message || "user profile fetched")
    } catch (error) {
      // console.log(error,"error from fetch catch")
      toast.error(error.response?.data?.message || error.message);
      dispatch(removeUser());
    } finally {
      // console.log("🔹 finally block reached");
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchUserProfile();
  }, []);

  
  
  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <MainContext.Provider value={{ fetchUserProfile, LogoutHandler }}>
      {children}
    </MainContext.Provider>
  );
};
