import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md sm:py-8 sm:px-12">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Change Password
                </h2>

                {/* <p className="text-red-500 text-sm text-center">error</p> */}
                {/* <p className="text-green-500 text-sm text-center">successMessage</p> */}

                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
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
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                                checked
                                required
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500">
                                I accept the
                                <Link className="font-medium text-primary-600 hover:underline" to="#">
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
