import React, { useState } from "react";
import ForgotPasswordOTP from "./ForgotPasswordOTP";

export default function ForgotPassword() {
    const [showOTP, setShowOTP] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowOTP(true);
    };

    return (
        <>
            {!showOTP && (
                <div className="flex justify-center items-center">
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
                        <h2 className="text-2xl font-semibold text-center mb-6">Enter Your Email</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showOTP && <ForgotPasswordOTP />}
        </>
    );
}
