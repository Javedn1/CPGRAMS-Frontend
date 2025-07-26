import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
 
const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
 
    if (!email) {
      setError("Email not found. Please restart the reset process.");
      return;
    }
 
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
 
    try {
const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword: password,
      });
 
      if (response.status === 200) {
        setSuccessMessage("Password changed successfully");
        localStorage.removeItem("email");
        setTimeout(() => {
          navigate("/auth"); // redirect to login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };
 
  return (
    <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
      <div className="w-full p-6 bg-white rounded-lg shadow-md sm:max-w-md sm:py-8 sm:px-12">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Change Password
        </h2>
 
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}
 
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pr-10"
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </div>
            </div>
          </div>
 
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pr-10"
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setshowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </div>
            </div>
          </div>
 
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                defaultChecked
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-gray-500">
                I accept the{" "}
                <Link className="font-medium text-blue-600 hover:underline" to="#">
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
 
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default ChangePassword;