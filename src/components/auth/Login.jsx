import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({
              ...loginForm,
              password: e.target.value,
            })
          }
        />
      </div>

      <div className="space-y-3">
        <Link href="/citizen/dashboard">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login as Citizen
          </button>
        </Link>
        <Link href="/officer/dashboard">
          <button className="w-full border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
            Login as PG Officer
          </button>
        </Link>
        <Link href="/admin/dashboard">
          <button className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
