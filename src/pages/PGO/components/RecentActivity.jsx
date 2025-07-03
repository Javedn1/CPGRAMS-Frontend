import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Info } from 'lucide-react';

const recentActivity = [
  {
    id: 1,
    type: "success",
    action: "Complaint #12345 resolved",
    complaint: "Water issue reported by user",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "warning",
    action: "Complaint #12346 pending review",
    complaint: "Road damage reported by user",
    time: "5 hours ago"
  },
  {
    id: 3,
    type: "info",
    action: "Complaint #12347 assigned",
    complaint: "Electricity problem reported by user",
    time: "8 hours ago"
  }
];

function RecentActivity() {
  const navigate = useNavigate();

  const iconMap = {
    success: <CheckCircle className="text-green-600 w-5 h-5" />,
    warning: <Clock className="text-yellow-600 w-5 h-5" />,
    info: <Info className="text-blue-600 w-5 h-5" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Recent Activity</h1>
          <p className="text-gray-500 text-sm md:text-base">
            A timeline of your latest complaint actions and updates.
          </p>
        </div>

        <div className="space-y-6">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mt-1">
                {iconMap[activity.type]}
              </div>

              <div className="flex-1">
                <p className="text-base font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.complaint}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
