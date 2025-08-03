import React from 'react';
import { UserPlus } from 'lucide-react';

function RejisterOfficer() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white  rounded-lg p-10 border border-gray-200">
                <div className="flex items-center justify-center mb-10">
                    <UserPlus className="h-10 w-10 text-blue-600 mr-3" />
                    <h2 className="text-4xl font-bold text-gray-800">Register New Officer</h2>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Enter mobile number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Gender</label>
                        <select
                            name="gender"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* DOB */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Department</label>
                        <input
                            type="text"
                            name="department"
                            placeholder="Enter department"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Office */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Office Location</label>
                        <input
                            type="text"
                            name="office"
                            placeholder="Enter office location"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 lg:col-span-3 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition duration-300 shadow-lg"
                        >
                            Register Officer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RejisterOfficer;
