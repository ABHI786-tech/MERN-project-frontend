import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const validationSchema = yup.object({
    newpassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("newpassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const initialValues = {
    newpassword: "",
    confirmpassword: "",
  };

 
  const onSubmitHandler = async (values, helper) => {
    try {
      if (!token) {
        toast.error("Invalid or missing reset token");
        return;
      }

      setLoading(true);

      const response = await axios.post(`resetpassword?token=${token}`,
        { newpassword: values.newpassword }
      );

      const message = response?.data?.message || "Password has been reset successfully!";
      toast.success(message,"reset password successfully");

      helper.resetForm();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("❌ Reset Password Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to reset password";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-[80vh] flex justify-center bg-gray-300">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form className="bg-white shadow-md rounded-lg px-12 py-6 w-[95%] md:w-1/2 xl:w-1/3">
          <h2 className="text-4xl font-bold text-center mb-6">
            Reset Password
          </h2>

          {/* New Password */}
          <div className="mb-4">
            <label htmlFor="newpassword" className="block font-medium mb-1">
              New Password <span className="text-red-600 font-semibold">*</span>
            </label>
            <Field
              type="password"
              name="newpassword"
              placeholder="Enter new password"
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none"
            />
            <ErrorMessage
              name="newpassword"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block font-medium mb-1">
              Confirm Password <span className="text-red-600 font-semibold">*</span>
            </label>
            <Field
              type="password"
              name="confirmpassword"
              placeholder="Confirm new password"
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none"
            />
            <ErrorMessage
              name="confirmpassword"
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ResetPassword;
