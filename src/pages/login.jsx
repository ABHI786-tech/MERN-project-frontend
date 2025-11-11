import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useMainContext } from "../context/mainContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosClient } from "../utils/axios";



function Login() {
  const [loading, setLoading] = useState(false)
  const [isShow, setIsShow] = useState(false);
  const [captcha, setCaptcha] = useState("");

  const navigate = useNavigate()

  const { fetchUserProfile } = useMainContext()

  const initialValues = {
    email: "",
    password: "",
    captcha: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    captcha: yup.string().required("Captcha is required"),
  });

  const captchaOperator = ["+", "-", "*"];

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator =
      captchaOperator[Math.floor(Math.random() * captchaOperator.length)];
    const expression = `${num1} ${operator} ${num2}`;
    setCaptcha(expression);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const onSubmitHandler = async (values, helper) => {
    try {
      setLoading(true)
      const response = await axiosClient.post("/login", {
        email: values.email,
        password: values.password,
      }, values);
      const data = response.data;


      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      await fetchUserProfile();

      toast.success(data.message || "Login successful!");
      navigate("/");
      helper.resetForm();

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password!");
      // console.error("❌ Login error:", err);
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
          <Form className="bg-white shadow-md rounded-lg p-8 w-[95%] md:w-1/2 xl:w-1/3">
            <h2 className="text-4xl font-bold text-center mb-6">Login Now</h2>
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
                name="email"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
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
                >
                  {isShow ? <FaEyeSlash /> : <FaEye />}
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
                  className="text-sm text-blue-600 underline"
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
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200"
              >
                {loading ? "Logging..." : "Login Now"}
              </button>
            </div>
            {/* forget password  */}
            <div className="py-4">
              <Link to="/forgetpassword" className="text-blue-600 font-semibold hover:text-gray-700 "
              >Forget Password </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
