import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../config/axios";
import {useDispatch} from "react-redux";
import { setAuthUser, setApiKey, setToken } from "../../redux/slices/authSlice";




const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    
});
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

    const onSubmitFunc = async (formData) => {
      console.log(formData);
      setLoading(true);
      try {
        const res = await api.post("/users/login",
        formData,
        {
          withCredentials: true
        }
      )
      if(res.status === 200){
        console.log(res.data);
        console.log(res.data.token)
        dispatch(setAuthUser(res.data.user));
        dispatch(setToken(res.data.token));
        dispatch(setApiKey(res.data.api_key));
        navigate("/");
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
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account? Please{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
