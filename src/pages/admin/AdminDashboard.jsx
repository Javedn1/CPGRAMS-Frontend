import React, { useState } from "react";
import { User, FileText, MapPin, Mail, Phone } from "lucide-react";

function AdminDashboard() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [grievanceSortOrder, setGrievanceSortOrder] = useState("new");
    const [officerSortOrder, setOfficerSortOrder] = useState("new");
    const [leadOfficerSortOrder, setLeadOfficerSortOrder] = useState("new");
    const [officerSearch, setOfficerSearch] = useState("");
    const [leadOfficerSearch, setLeadOfficerSearch] = useState("");

    const pageSize = 5;
    const [officerPage, setOfficerPage] = useState(1);
    const [leadOfficerPage, setLeadOfficerPage] = useState(1);
    const [grievancePage, setGrievancePage] = useState(1);

    const officers = [
        { id: 1, name: "Rajesh Kumar", role: "PG Officer", email: "rajesh@univ.com", phone: "9876543210", location: "Patna" },
        { id: 3, name: "Mohit Verma", role: "PG Officer", email: "mohit@univ.com", phone: "9988776655", location: "Mumbai" },
        { id: 4, name: "Suresh Gupta", role: "PG Officer", email: "suresh@univ.com", phone: "9090909090", location: "Bangalore" },
        { id: 5, name: "Aman Tiwari", role: "PG Officer", email: "aman@univ.com", phone: "8080808080", location: "Kolkata" },
        { id: 6, name: "Ravi Singh", role: "PG Officer", email: "ravi@univ.com", phone: "7070707070", location: "Chennai" },
    ];
    const leadOfficers = [
        { id: 2, name: "Anita Sharma", role: "PG Lead Officer", email: "anita@univ.com", phone: "9123456789", location: "Delhi" },
        { id: 7, name: "Manoj Jha", role: "PG Lead Officer", email: "manoj@univ.com", phone: "9234567890", location: "Hyderabad" },
    ];
    const grievances = [
        { id: 101, title: "Hostel Water Issue", type: "Infrastructure", status: "Pending", date: "2025-07-28", location: "Patna" },
        { id: 102, title: "Mess Food Quality", type: "Service", status: "Resolved", date: "2025-07-26", location: "Delhi" },
        { id: 103, title: "Library Timings", type: "Service Delay", status: "In Progress", date: "2025-07-25", location: "Mumbai" },
        { id: 104, title: "Rude Staff Behaviour", type: "Staff Misconduct", status: "Rejected", date: "2025-07-24", location: "Lucknow" },
        { id: 105, title: "Hostel Electricity Issue", type: "Infrastructure", status: "Pending", date: "2025-07-23", location: "Chennai" },
        { id: 106, title: "Transport Delay", type: "Logistics", status: "In Progress", date: "2025-07-22", location: "Hyderabad" },
    ];

    const filteredOfficers = officers
        .filter((o) => o.name.toLowerCase().includes(officerSearch.toLowerCase()))
        .sort((a, b) => officerSortOrder === "new" ? b.id - a.id : a.id - b.id);

    const filteredLeadOfficers = leadOfficers
        .filter((o) => o.name.toLowerCase().includes(leadOfficerSearch.toLowerCase()))
        .sort((a, b) => leadOfficerSortOrder === "new" ? b.id - a.id : a.id - b.id);

    const filteredGrievances = grievances
        .filter((g) =>
            g.title.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter === "All" || g.status === statusFilter)
        )
        .sort((a, b) =>
            grievanceSortOrder === "new" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
        );

    const paginate = (data, page) => data.slice((page - 1) * pageSize, page * pageSize);
    const officerTotalPages = Math.ceil(filteredOfficers.length / pageSize);
    const leadOfficerTotalPages = Math.ceil(filteredLeadOfficers.length / pageSize);
    const grievanceTotalPages = Math.ceil(filteredGrievances.length / pageSize);

    return (
        <section className="px-6 pt-4">
            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-600">Grievance Redressal System Overview</p>
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                    {[
                        { label: "Total Complaints", count: grievances.length, color: "bg-blue-100 text-blue-800" },
                        { label: "Resolved", count: grievances.filter(g => g.status === "Resolved").length, color: "bg-green-100 text-green-800" },
                        { label: "In Progress", count: grievances.filter(g => g.status === "In Progress").length, color: "bg-yellow-100 text-yellow-800" },
                        { label: "Pending", count: grievances.filter(g => g.status === "Pending").length, color: "bg-red-100 text-red-800" },
                        { label: "Rejected", count: grievances.filter(g => g.status === "Rejected").length, color: "bg-gray-200 text-gray-800" },
                    ].map((card, idx) => (
                        <div key={idx} className={`p-6 rounded-2xl ${card.color}`}>
                            <p className="text-2xl font-bold">{card.count}</p>
                            <p>{card.label}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_10px_4px_rgba(0,_0,_0,_0.1)]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" /> PG Officers
                        </h2>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                                value={officerSearch}
                                onChange={(e) => setOfficerSearch(e.target.value)}
                            />
                            <select
                                className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                                value={officerSortOrder}
                                onChange={(e) => setOfficerSortOrder(e.target.value)}
                            >
                                <option value="new">Newest First</option>
                                <option value="old">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginate(
                                [...filteredOfficers].sort((a, b) =>
                                    officerSortOrder === "new" ? b.id - a.id : a.id - b.id
                                ),
                                officerPage
                            ).map((officer, idx) => (
                                <tr key={officer.id} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                    <td className="p-3">{officer.name}</td>
                                    <td className="p-3">{officer.role}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-4 h-4 text-blue-500" />
                                            <span>{officer.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-1">
                                            <Phone className="w-4 h-4 text-green-500" />
                                            <span>{officer.phone}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            <span>{officer.location}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={() => setOfficerPage(p => Math.max(p - 1, 1))} disabled={officerPage === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
                        <span>Page {officerPage} of {officerTotalPages}</span>
                        <button onClick={() => setOfficerPage(p => Math.min(p + 1, officerTotalPages))} disabled={officerPage === officerTotalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_10px_4px_rgba(0,_0,_0,_0.1)]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-500" /> PG Lead Officers
                        </h2>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="border rounded px-3 py-1 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
                                value={leadOfficerSearch}
                                onChange={(e) => setLeadOfficerSearch(e.target.value)}
                            />
                            <select
                                className="border rounded px-3 py-1 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
                                value={leadOfficerSortOrder}
                                onChange={(e) => setLeadOfficerSortOrder(e.target.value)}
                            >
                                <option value="new">Newest First</option>
                                <option value="old">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginate(
                                [...filteredLeadOfficers].sort((a, b) =>
                                    leadOfficerSortOrder === "new" ? b.id - a.id : a.id - b.id
                                ),
                                leadOfficerPage
                            ).map((officer, idx) => (
                                <tr key={officer.id} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                    <td className="p-3">{officer.name}</td>
                                    <td className="p-3">{officer.role}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-4 h-4 text-blue-500" />
                                            <span>{officer.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-1">
                                            <Phone className="w-4 h-4 text-green-500" />
                                            <span>{officer.phone}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            <span>{officer.location}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={() => setLeadOfficerPage(p => Math.max(p - 1, 1))} disabled={leadOfficerPage === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
                        <span>Page {leadOfficerPage} of {leadOfficerTotalPages}</span>
                        <button onClick={() => setLeadOfficerPage(p => Math.min(p + 1, leadOfficerTotalPages))} disabled={leadOfficerPage === leadOfficerTotalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-green-500" /> Grievance History
                        </h2>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <select
                                className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option>All</option>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                                <option>Rejected</option>
                            </select>
                            <select
                                className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                                value={grievanceSortOrder}
                                onChange={(e) => setGrievanceSortOrder(e.target.value)}
                            >
                                <option value="new">Newest First</option>
                                <option value="old">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Location</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginate(filteredGrievances, grievancePage).map((g, idx) => (
                                <tr key={g.id} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                    <td className="p-3">{g.id}</td>
                                    <td className="p-3">{g.title}</td>
                                    <td className="p-3">{g.type}</td>
                                    <td className="p-3 flex items-center gap-1"><MapPin className="w-4 h-4 text-red-500" /> {g.location}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-sm ${g.status === "Resolved"
                                                ? "bg-green-100 text-green-700"
                                                : g.status === "Pending"
                                                    ? "bg-red-100 text-red-700"
                                                    : g.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-200 text-gray-700"
                                            }`}>{g.status}</span>
                                    </td>
                                    <td className="p-3">{g.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={() => setGrievancePage(p => Math.max(p - 1, 1))} disabled={grievancePage === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
                        <span>Page {grievancePage} of {grievanceTotalPages}</span>
                        <button onClick={() => setGrievancePage(p => Math.min(p + 1, grievanceTotalPages))} disabled={grievancePage === grievanceTotalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminDashboard;
