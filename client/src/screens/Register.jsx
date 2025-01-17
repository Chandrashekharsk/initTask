import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one numeric value"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password")
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone1: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number can only contain numbers"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmitFunc = async (formData) => {
    console.log(formData);
    setLoading(true);
    try {
      const res = await api.post("/users/register",
      formData,
    )
    if(res.status === 201){
      console.log(res.data);
      navigate("/login");
    }
    
    } catch (error) {
      alert("Something went wrong");
      console.log(error.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmitFunc)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>

        <div>
          <label className="block font-medium text-gray-700">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Phone</label>
          <input
            type="text"
            {...register("phone1")}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
          />
          {errors.phone1 && (
            <p className="text-red-500 text-sm mt-1">{errors.phone1.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? Please{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
