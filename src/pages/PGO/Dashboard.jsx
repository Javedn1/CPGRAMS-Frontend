import React from 'react'
import {
  Shield,
  Users,
  FileText,
  Bell,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import GrievanceList from './components/GrievanceList';

function Dashboard() {

  const stats = [
    {
      label: "Total Assigned",
      value: "47",
      icon: FileText,
      color: "text-green-600",
    },
    {
      label: "Pending Review",
      value: "12",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      label: "In Progress",
      value: "18",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      label: "Resolved Today",
      value: "5",
      icon: MessageSquare,
      color: "text-purple-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "success",
      action: "Complaint #12345 resolved",
      complaint: "water issue reported by user",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "success",
      action: "Complaint #12345 resolved",
      complaint: "water issue reported by user",
      time: "2 hours ago"
    }]
  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-slate-50    ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center shadow-sm border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-4 mx-auto">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row  p-6 gap-5 '>
          <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
            <GrievanceList />
          </div>
          
          <div className='w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md  relative'>
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"> */}

            {/* Recent Activity Card */}
            {/* <div className="border rounded-lg shadow-sm lg:col-span-1 bg-white"> */}

            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="text-sm text-gray-500">Your latest actions and updates</p>
            </div>

            <div className="p-4 space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                      }`}
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.complaint}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* </div> */}
        {/* </div> */}
      </section>
    </>
  )
}

export default Dashboard
