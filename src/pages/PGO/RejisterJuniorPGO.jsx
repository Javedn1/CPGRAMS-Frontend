import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
 
const RegisterJuniorPGO = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    department: '',
    office: '',
    password: '',
    confirmPassword: '',
  });
 
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
[e.target.name]: e.target.value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const { password, confirmPassword, ...rest } = formData;
 
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
 
    try {
      const token = localStorage.getItem("token");
 
const response = await axios.post(
"http://localhost:5000/api/admin/officers",
        { ...rest, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      if (response.data.success) {
        toast.success("Junior PG Officer registered successfully");
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          gender: '',
          dob: '',
          department: '',
          office: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
 
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl rounded-3xl mt-4 border border-gray-200">
      <div className="flex items-center justify-center mb-8">
        <UserPlus className="h-8 w-8 text-blue-600 mr-2" />
        <h2 className="text-3xl font-bold text-gray-800">Register Junior PG Officer</h2>
      </div>
 
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "fullName", label: "Full Name", type: "text" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "phoneNumber", label: "Mobile Number", type: "tel" },
          { name: "dob", label: "Date of Birth", type: "date" },
          { name: "department", label: "Department", type: "text" },
          { name: "office", label: "Office", type: "text" },
          { name: "password", label: "Password", type: "password" },
          { name: "confirmPassword", label: "Confirm Password", type: "password" },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
 
        {/* Gender Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
 
        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-200 shadow-md"
          >
            Register Officer
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default RegisterJuniorPGO;