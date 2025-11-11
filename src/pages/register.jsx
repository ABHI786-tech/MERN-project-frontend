import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosClient } from "../utils/axios";
import { useMainContext } from "../context/mainContext";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

    const [loading, setLoading] = useState(false)
    const [isShow, setIsShow] = useState(false);
    const [captcha, setCaptcha] = useState("");
    const navigate = useNavigate()
    const { fetchUserProfile } = useMainContext()

    const initialValues = {
        name: "",
        email: "",
        password: "",
        captcha: "",
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        captcha: yup.string().required("Captcha is required"),
    });
    //  captcha generator 
    const captchaOperator = ["+", "-", "*"];
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = captchaOperator[Math.floor(Math.random() * captchaOperator.length)];
        const expression = `${num1} ${operator} ${num2}`;
        setCaptcha(expression);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const onSubmitHandler = async (values, helper) => {
        try {
            setLoading(true)
            const actualAnswer = Function(`"use strict"; return (${captcha})`)();
            // 1. check captcha 
            if (parseInt(values.captcha) !== parseInt(actualAnswer)) {
                toast.error("Captcha is incorrect!");
                generateCaptcha();
                setLoading(false);
                return;
            }

            // ✅ 2. Remove captcha before sending to backend
            const payload = { ...values };
            delete payload.captcha;

            // ✅ 3. Make API call correctly
            const response = await axiosClient.post("/register", payload);
            const data = response.data; // response.data is the actual API result

            localStorage.setItem("token", data.token);
            toast.success(data.message || "Registration successful!");
            await fetchUserProfile()
            navigate("/")
            helper.resetForm();
        }
        catch (err) {
            toast.error(err.response?.data?.message || "❌ Something went wrong!");
            // console.error("❌ Registration error:", err);
        }
        finally {
            setLoading(false)
        }
    };


    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {({ values }) => (
                    <Form className="bg-white shadow-md rounded-lg px-12 py-4 w-[95%] md:w-1/2 xl:w-1/3">
                        <h2 className="text-4xl font-bold text-center mb-6">Register</h2>

                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-medium mb-1">
                                Name
                            </label>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full border border-gray-400 rounded px-3 py-2 outline-none"
                            />
                            <ErrorMessage
                                name="name"
                                component="p"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium mb-1">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-400 rounded px-3 py-2 outline-none"
                            />
                            <ErrorMessage
                                name="email" component="p" className="text-red-500 text-xs mt-1" />
                        </div>

                        {/* Password */}
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block font-medium mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Field
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-400 rounded px-3 py-2 outline-none pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsShow(!isShow)}
                                    className="absolute right-3 top-2.5 text-gray-600"
                                >{isShow ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="p"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        {/* Captcha */}
                        <div className="mb-4">
                            <label htmlFor="captcha" className="block font-medium mb-1">
                                Captcha
                            </label>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold bg-gray-200 px-3 py-1 rounded">
                                    {captcha}
                                </p>
                                <button
                                    type="button"
                                    onClick={generateCaptcha}
                                    className="text-sm  font-semibold text-blue-600 underline my-2"
                                >
                                    Refresh
                                </button>
                            </div>
                            <Field
                                type="text"
                                name="captcha"
                                placeholder="Enter captcha result"
                                className="w-full border border-gray-400 rounded px-3 py-2 outline-none"
                            />
                            <ErrorMessage
                                name="captcha"
                                component="p"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200"
                        > {loading ? "Registering..." : "Register Now"}
                        </button>
                        </div>
                        <div className="py-6"><span>Already have an account? </span>
                            <Link to="/login" className="text-blue-600 font-semibold hover:text-gray-700 "
                            >Login Now </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegisterPage;