import React, { useState } from "react";
import { Eye, X, Info, Phone, MapPin, User as UserIcon, Search } from "lucide-react";

const usersData = [
    {
        id: 1,
        name: "John Doe",
        location: "New York",
        phone: "123-456-7890",
        gender: "Male",
        complaints: [
            { id: 1, title: "Late delivery", category: "Service", status: "Pending", details: "Delivery was delayed by 3 days." },
            { id: 2, title: "Damaged product", category: "Product", status: "Resolved", details: "Received a damaged laptop." },
            { id: 3, title: "Damaged product", category: "Product", status: "Resolved", details: "Received a damaged laptop." },
            { id: 4, title: "Damaged product", category: "Product", status: "Resolved", details: "Received a damaged laptop." }
        ]
    },
    {
        id: 2,
        name: "Jane Smith",
        location: "Los Angeles",
        phone: "987-654-3210",
        gender: "Female",
        complaints: [
            { id: 1, title: "Incorrect billing", category: "Billing", status: "Rejected", details: "Charged extra for the subscription." }
        ]
    }
];

const statusStyles = {
    Rejected: "bg-red-100 text-red-700 border border-red-300",
    Resolved: "bg-green-100 text-green-700 border border-green-300",
    Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    "In Progress": "bg-blue-100 text-blue-700 border border-blue-300",
};

const AllGrievance = () => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [popoverComplaint, setPopoverComplaint] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [filterLocation, setFilterLocation] = useState("");

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const uniqueLocations = [...new Set(usersData.map((u) => u.location))];

    const filteredUsers = usersData
        .filter((user) => user.name.toLowerCase().includes(searchName.toLowerCase()))
        .filter((user) => (filterLocation ? user.location === filterLocation : true))
        .sort((a, b) => (sortOrder === "desc" ? b.id - a.id : a.id - b.id));

    return (
        <div className="p-8">
            <div className="mb-6 flex flex-wrap items-center gap-4 w-full">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>

                <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Locations</option>
                    {uniqueLocations.map((loc, idx) => (
                        <option key={idx} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>


            <div className="bg-white shadow-xl overflow-hidden border border-gray-200">
                <table className="w-full table-fixed">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                            <th className="p-4 border-b text-left font-semibold text-gray-700 w-1/12">Sr.No</th>
                            <th className="p-4 border-b text-left font-semibold text-gray-700 w-2/12">Name</th>
                            <th className="p-4 border-b text-left font-semibold text-gray-700 w-2/12">Location</th>
                            <th className="p-4 border-b text-left font-semibold text-gray-700 w-2/12">Phone</th>
                            <th className="p-4 border-b text-left font-semibold text-gray-700 w-2/12">Gender</th>
                            <th className="p-4 border-b text-center font-semibold text-gray-700 w-2/12">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <React.Fragment key={user.id}>
                                <tr className="hover:bg-blue-50/50 transition duration-200 ease-in-out">
                                    <td className="p-4 border-b w-1/12">{index + 1}</td>
                                    <td className="p-4 border-b w-2/12">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="w-4 h-4 text-gray-500" />
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="p-4 border-b w-2/12">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            {user.location}
                                        </div>
                                    </td>
                                    <td className="p-4 border-b w-2/12">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            {user.phone}
                                        </div>
                                    </td>
                                    <td className="p-4 border-b w-2/12">{user.gender}</td>
                                    <td className="p-4 border-b text-center w-2/12">
                                        <button
                                            className="px-4 py-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow hover:scale-105 transform transition"
                                            onClick={() => toggleRow(user.id)}
                                        >
                                            <Eye className="w-4 h-4" />
                                            {expandedRow === user.id ? "Hide Details" : "View Details"}
                                        </button>
                                    </td>
                                </tr>

                                {expandedRow === user.id && (
                                    <tr>
                                        <td colSpan={6} className="p-4 bg-gray-50">
                                            <div className="h-[250px] overflow-y-auto border border-gray-200 shadow-inner bg-white">
                                                <table className="w-full table-fixed">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="p-3 border-b text-left font-medium w-1/12">Sr.No</th>
                                                            <th className="p-3 border-b text-left font-medium w-1/4">Title</th>
                                                            <th className="p-3 border-b text-left font-medium w-1/4">Category</th>
                                                            <th className="p-3 border-b text-left font-medium w-1/4">Status</th>
                                                            <th className="p-3 border-b text-center font-medium w-1/4">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {user.complaints.map((comp, idx) => (
                                                            <tr key={comp.id} className="hover:bg-gray-50 transition duration-200">
                                                                <td className="p-3 border-b w-1/12">{idx + 1}</td>
                                                                <td className="p-3 border-b w-1/4">{comp.title}</td>
                                                                <td className="p-3 border-b w-1/4">{comp.category}</td>
                                                                <td className="p-3 border-b w-1/4">
                                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[comp.status]}`}>
                                                                        {comp.status}
                                                                    </span>
                                                                </td>
                                                                <td className="p-3 border-b text-center w-1/4">
                                                                    <button
                                                                        className="px-3 py-1 flex items-center gap-1 bg-green-500 text-white rounded-full shadow hover:scale-105 transform transition"
                                                                        onClick={() => setPopoverComplaint(comp)}
                                                                    >
                                                                        <Info className="w-4 h-4" /> View Complaint
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {popoverComplaint && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
                        <h3 className="text-lg font-bold mb-3">{popoverComplaint.title}</h3>
                        <p className="mb-2"><strong>Category:</strong> {popoverComplaint.category}</p>
                        <p className="mb-2"><strong>Status:</strong> {popoverComplaint.status}</p>
                        <p className="mb-4 text-gray-700"><strong>Details:</strong> {popoverComplaint.details}</p>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            onClick={() => setPopoverComplaint(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <button
                            className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow hover:scale-105 transform transition"
                            onClick={() => setPopoverComplaint(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllGrievance;
