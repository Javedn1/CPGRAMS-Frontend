import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/MainHeader";
import Footer from "../../components/footer/footer";

export default function TokenPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const grievanceId = location.state?.grievanceId || "N/A";

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-200 font-sans px-4">
                <div className="w-full max-w-md bg-neutral-300 rounded-2xl shadow-[10px_10px_20px_#babecc,-10px_-10px_20px_#ffffff] flex flex-col items-center p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-md">
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-700 mb-2">Thank You!</h1>
                    <p className="text-gray-600 mb-6">Your grievance has been submitted successfully.</p>

                    <div className="w-full bg-gray-200 rounded-xl shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff] px-4 py-3 mb-6">
                        <p className="text-xs text-gray-500 mb-1">Your Grievance Token No.</p>
                        <p className="text-lg font-semibold text-blue-700">{grievanceId}</p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-2 px-6 py-2 rounded-xl bg-gray-200 shadow-[5px_5px_10px_#babecc,-5px_-5px_10px_#ffffff] hover:shadow-inner transition text-sm font-medium text-gray-700"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
