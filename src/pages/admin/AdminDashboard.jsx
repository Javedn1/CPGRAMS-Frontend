import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  AreaChart, Area,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { FileText, User, Calendar, MapPin } from "lucide-react";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#9ca3af'];

const AdminDashboard = () => {
  const grievances = [
    { id: 101, title: "Hostel Water Issue", status: "Pending", date: "2025-07-28", location: "Patna" },
    { id: 102, title: "Mess Food Quality", status: "Resolved", date: "2025-07-26", location: "Delhi" },
    { id: 103, title: "Library Timings", status: "In Progress", date: "2025-07-25", location: "Mumbai" },
    { id: 104, title: "Rude Staff Behaviour", status: "Rejected", date: "2025-07-24", location: "Lucknow" },
    { id: 105, title: "Hostel Electricity Issue", status: "Pending", date: "2025-07-23", location: "Chennai" },
    { id: 106, title: "Transport Delay", status: "In Progress", date: "2025-07-22", location: "Hyderabad" },
  ];

  const officers = [
    { id: 1, name: "Rajesh Kumar", role: "PG Officer" },
    { id: 2, name: "Anita Sharma", role: "PG Lead Officer" },
    { id: 3, name: "Mohit Verma", role: "PG Officer" },
    { id: 4, name: "Suresh Gupta", role: "PG Officer" },
    { id: 5, name: "Aman Tiwari", role: "PG Officer" },
    { id: 6, name: "Ravi Singh", role: "PG Officer" },
    { id: 7, name: "Manoj Jha", role: "PG Lead Officer" },
  ];

  const grievanceStats = [
    { name: "Pending", value: grievances.filter(g => g.status === "Pending").length },
    { name: "Resolved", value: grievances.filter(g => g.status === "Resolved").length },
    { name: "In Progress", value: grievances.filter(g => g.status === "In Progress").length },
    { name: "Rejected", value: grievances.filter(g => g.status === "Rejected").length },
  ];

  const officerStats = [
    { name: "PG Officers", value: officers.filter(o => o.role === "PG Officer").length },
    { name: "Lead Officers", value: officers.filter(o => o.role === "PG Lead Officer").length },
  ];

  const grievanceByDate = grievances.reduce((acc, curr) => {
    const existing = acc.find(item => item.date === curr.date);
    if (existing) existing.count += 1;
    else acc.push({ date: curr.date, count: 1 });
    return acc;
  }, []);

  const grievanceByLocation = grievances.reduce((acc, curr) => {
    const existing = acc.find(item => item.location === curr.location);
    if (existing) existing.count += 1;
    else acc.push({ location: curr.location, count: 1 });
    return acc;
  }, []);

  const summaryCards = [
    { label: "Total Complaints", count: grievances.length, color: "bg-blue-100 text-blue-800" },
    { label: "Resolved", count: grievances.filter(g => g.status === "Resolved").length, color: "bg-green-100 text-green-800" },
    { label: "In Progress", count: grievances.filter(g => g.status === "In Progress").length, color: "bg-yellow-100 text-yellow-800" },
    { label: "Pending", count: grievances.filter(g => g.status === "Pending").length, color: "bg-red-100 text-red-800" },
    { label: "Rejected", count: grievances.filter(g => g.status === "Rejected").length, color: "bg-gray-200 text-gray-800" },
  ];

  return (
    <section className="px-6 pt-6 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Grievance Redressal System Overview</p>
        </header>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-5 gap-4">
          {summaryCards.map((card, idx) => (
            <div key={idx} className={`p-5 rounded-xl shadow-sm ${card.color}`}>
              <p className="text-2xl font-semibold">{card.count}</p>
              <p>{card.label}</p>
            </div>
          ))}
        </div>

        {/* All 4 Charts in 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" /> Grievances by Status
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grievanceStats} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-500" /> Officer Role Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={officerStats} dataKey="value" nameKey="name" outerRadius={100} label>
                  {officerStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" /> Grievance Trends Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={grievanceByDate}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Area Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" /> Complaints by Location
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={grievanceByLocation}>
                <XAxis dataKey="location" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="count" stroke="#10b981" fill="#d1fae5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
