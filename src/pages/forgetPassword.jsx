import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axios";

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  
  const initialValues = {
    email: "",
  };

 
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });

 
  const onSubmitHandler = async (values, helper) => {
    try {
      setLoading(true);

      
      const response = await axiosClient.post("/forgetpassword", values);

      
      const message =
        response?.data?.message || response?.data || "Password reset link sent!";
      toast.success(message);

      helper.resetForm();

      
    } catch (err) {
      console.error("❌ Forget Password Error:", err);

      
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form className="bg-white shadow-md rounded-lg p-8 w-[95%] md:w-1/2 xl:w-1/3">
          <h2 className="text-3xl font-bold text-center mb-6">
            Forgot Password
          </h2>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Registered Email Address
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded transition-all duration-200`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ForgetPassword;
