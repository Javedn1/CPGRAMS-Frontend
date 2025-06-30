import React, { useState, useEffect } from "react";
import ChangePassword from "./ChangePassword";

const ForgotPasswordOTP = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowChangePassword(true);
    };

    const handleResendOTP = () => {
        if (!canResend) return;

        console.log("Resending OTP...");

        setTimer(30);
        setCanResend(false);
    };

    return (
        <>
            {!showChangePassword && (
                <div className=" bg-white px-6 py-6 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-14">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email</p>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col items-center space-y-6">
                                    <div className="flex flex-row items-center justify-around mx-auto w-full max-w-xs">
                                        {[...Array(6)].map((_, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-[300px] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                                    >
                                        Submit
                                    </button>

                                    <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                                        {canResend ? (
                                            <>
                                                <p>Didn't receive code?</p>
                                                <button
                                                    type="button"
                                                    className="text-blue-600"
                                                    onClick={handleResendOTP}
                                                >
                                                    Resend OTP
                                                </button>
                                            </>
                                        ) : (
                                            <p>Resend OTP in {timer}s</p>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showChangePassword && <ChangePassword />}
        </>
    );
};

export default ForgotPasswordOTP;
