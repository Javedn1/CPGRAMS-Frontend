import React from 'react'
import {Shield} from "lucide-react"

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GrievancePortal</h1>
              <p className="text-xs text-gray-500">Government Services</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setTrackModalOpen(true)}
              className="hidden sm:flex border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
            >
              Track Complaint
            </button>
            <button
              onClick={() => handleAuthAction('login')}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthAction('register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        </div>
      </header>
  )
}

export default Header
