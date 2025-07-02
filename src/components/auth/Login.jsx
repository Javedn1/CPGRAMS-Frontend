import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const clickForgotPassword = () => {
    navigate("/forgotpassword")
  }
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="your.email@example.com"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({
                ...loginForm,
                password: e.target.value,
              })
            }
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <label className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="mr-2" />
          Remember me
        </label>
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={clickForgotPassword}
        >
          Forgot password?
        </button>
      </div>

      <div className="space-y-3">
        <Link href="/citizen/dashboard">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login as Citizen
          </button>
        </Link>
        {/* <Link href="/officer/dashboard">
          <button className="w-full border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
            Login as PG Officer
          </button>
        </Link>
        <Link href="/admin/dashboard">
          <button className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            Admin Login
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Login;
