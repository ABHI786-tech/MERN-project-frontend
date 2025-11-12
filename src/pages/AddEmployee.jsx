import React from 'react'
import  axios  from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EmployeesRoles } from "../utils/constant"
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useState } from "react";
import { axiosClient } from "../utils/axios";
import { useMainContext } from '../context/mainContext';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

const [loading, setLoading] = useState(false);
const { fetchUserProfile } = useMainContext();
const navigate = useNavigate()

    const initialValues = {
        name: "",
        salary: "",
        mobile: "",
        email: "",
        role: "",
        image: "",
        dob: "",
        address: ""
    };
    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        image: yup.string().required("image is required"),
        dob: yup.string().required("date of birth is required"),
        mobile: yup.string().required("mobile number is required"),
        email: yup.string().required("Email is required").email("Enter a valid email"),
        role: yup.string().required("role is required"),
        salary: yup.number().min(1000,"salary cannot be negative").required("salary is required"),
        address: yup.string().required("address is required")
    })

    const onSubmitHandler = async (values, helper) => {
try {
    setLoading(true)
    const token = localStorage.getItem("token") || "";
      if (!token) {
        setLoading(false);
        return;
      }

     const response = await axiosClient.post("/addemployee", values,
        {
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
     }
    )

        const data = response.data;
        toast.success(data.message || "Add Employee successful!")
        helper.resetForm();
        navigate("/")
        fetchUserProfile();
} catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong! in add employee");
  }
  finally{
    setLoading(false)
  }

    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {({ values }) => (
                <Form className='w-full md:w-2/4 py-6 bg-zinc-100 px-4'>
                    <h2 className="text-4xl font-bold mb-6">Add Employee</h2>
                    {/* image  */}
                    <div className='mb-3'>
                        <label htmlFor="image">Employee image</label>
                        <Field type="file" name="image" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee image' >
                        </Field>
                        <ErrorMessage name="image" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* name  */}
                    <div className='mb-3'>
                        <label htmlFor="name">Employee Name</label>
                        <Field type="text" name="name" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee Name' >
                        </Field>
                        <ErrorMessage name="name" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* age  */}
                    <div className='mb-3'>
                        <label htmlFor="dob">Employee Date of birth</label>
                        <Field type="date" name="dob" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee Date of birth' >
                        </Field>
                        <ErrorMessage name="dob" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>


                    {/* mobile number */}
                    <div className='mb-3'>
                        <label htmlFor="mobile">Employee mobile Number</label>
                        <Field type="number" name="mobile" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee mobile Number' >
                        </Field>
                        <ErrorMessage name="mobile" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* email  */}
                    <div className='mb-3'>
                        <label htmlFor="email">Employee email</label>
                        <Field type="email" name="email" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee email' >
                        </Field>
                        <ErrorMessage name="email" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* role  */}
                    <div className='mb-3'>
                        <label htmlFor="">Employee Role</label>
                        <Field as="select" name="role" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee roles' >
                            <option value={''}>---------select----------</option>
                            {EmployeesRoles.map((cur, i) => {
                                return <option key={i} value={cur}>{cur}</option>
                            })}
                        </Field>
                        <ErrorMessage name="role" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* salary */}
                    <div className='mb-3'>
                        <label htmlFor="Salary">Employee Salary</label>
                        <Field type="number" name="salary" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee salary' >
                        </Field>
                        <ErrorMessage name="salary" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>

                    {/* address  */}
                    <div className='mb-3'>
                        <label htmlFor="address">Employee address</label>
                        <Field as="textarea" rows={2} name="address" className='w-full py-2 border border-gray-400 rounded outline-none px-3 placeholder:font-medium' placeholder='Enter Employee address' >
                        </Field>
                        <ErrorMessage name="address" component={"p"} className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                        {/* <CustomLoaderButton text="Add employee" /> */}
                        <button type='submit' disabled={loading} className='bg-blue-600 w-[60%] py-1 rounded cursor-pointer'>{loading ? "Adding..." : "Add Employee Data"}</button>
                    </div>
                </Form>
                )}
            </Formik>
        </>
    )
}

export default AddEmployee