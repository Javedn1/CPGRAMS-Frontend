import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";

export default function TokenPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const grievanceId = location.state?.grievanceId || "N/A";

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-slate-100 px-6 py-10 text-center">
            <div className="mb-6">
                <img
                    src=""
                    alt="Logo"
                    className="w-24 h-24 mx-auto object-contain"
                />
            </div>

            <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6 shadow-md">
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-4xl font-bold text-blue-700 mb-4">Thank You!</h1>
            <p className="text-gray-700 text-lg mb-6">
                Your grievance has been submitted successfully.
            </p>

            <div className="bg-white border border-blue-200 rounded-lg shadow-lg px-6 py-4 mb-8">
                <p className="text-sm text-gray-500 mb-1">Your Grievance Token No.</p>
                <p className="text-2xl font-semibold text-blue-700 tracking-wide">
                    {grievanceId}
                </p>
            </div>

            <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 text-white text-sm font-medium rounded shadow-md"
            >
                Back to Home
            </button>
        </div>
    );
}
