import { useState } from "react";
import { Search, FileText, Eye, MessageSquare } from "lucide-react";
import ComplaintDetails from "./ComplaintDetails";
const OfficerComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      title: "Pothole on Main Street",
      citizen: "John Doe",
      email:"hard@gmail.com",
        phone: "123-456-7890",
        location: "Main Street, City Center",
      description: "A large pothole has formed on Main Street, causing traffic disruptions and potential accidents. Immediate repair is needed to ensure public safety.",
      attachments: [],
      category: "Road",
      status: "pending",
      priority: "high",
      date: "2025-07-02",
      updates: []
    },
    {
      id: "CMP002",
      title: "Pothole on Main Street",
      citizen: "John Doe",
      email:"hard@gmail.com",
        phone: "123-456-7890",
        location: "Main Street, City Center",
      description: "A large pothole has formed on Main Street, causing traffic disruptions and potential accidents. Immediate repair is needed to ensure public safety.",
      attachments: [],
      category: "Road",
      status: "pending",
      priority: "high",
      date: "2025-07-02",
      updates: [
        {
          message: "Complaint received and assigned to officer",
          date: "2025-07-02 10:00 AM",
          by: "Officer",
        },
        {
          message: "Inspection scheduled for July 3rd",
          date: "2025-07-02 11:00 AM",
          by: "Officer",
        },
      ]
    },
    {
      id: "CMP003",
      title: "Pothole on Main Street",
      citizen: "John Doe",
      email:"hard@gmail.com",
        phone: "123-456-7890",
        location: "Main Street, City Center",
      description: "A large pothole has formed on Main Street, causing traffic disruptions and potential accidents. Immediate repair is needed to ensure public safety.",
      attachments: [],
      category: "Road",
      status: "pending",
      priority: "high",
      date: "2025-07-02",
      updates: []
    },
    {
      id: "CMP004",
      title: "Pothole on Main Street",
      citizen: "John Doe",
      email:"hard@gmail.com",
        phone: "123-456-7890",
        location: "Main Street, City Center",
      description: "A large pothole has formed on Main Street, causing traffic disruptions and potential accidents. Immediate repair is needed to ensure public safety.",
      attachments: [],
      category: "Road",
      status: "pending",
      priority: "high",
      date: "2025-07-02",
      updates: []
    },
  ]);
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.citizen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      complaint.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesPriority =
      filterPriority === "all" ||
      complaint.priority.toLowerCase() === filterPriority.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority;
  });
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  const handleStatusUpdate = (newStatus, finalMessage) => {
    if (!newStatus) return;
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedComplaint.id
          ? {
              ...c,
              status: newStatus,
              updates: [
                ...c.updates,
                {
                  message:
                    newStatus === "resolved"
                      ? `marked as resolved ${finalMessage} || ""}`
                      : `status Changed to ${newStatus}`,
                 date: new Date().toLocaleString(),
                  by: "Officer",
                },
              ],
            }
          : c
      )
    );
  };
  const handleAddUpdate = (updateMessage) => {
    if (!updateMessage.trim()) return;
    const newUpdate = {
      message: updateMessage,
        date: new Date().toLocaleString(),
        by: "Officer",
    };
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedComplaint.id
          ? {
              ...c,
              updates: [
                ...c.updates,
                newUpdate,
              ]
            }
          : c
      )
    );
    setSelectedComplaint((prev) => ({
      ...prev,
        updates: [...prev.updates, newUpdate],
    }));
  };
    const handleCloseComplaint = (feedback) => {
        setComplaints((prev) =>
            prev.map((c) =>
                c.id === selectedComplaint.id
                    ? {
                        ...c,
                        status: "closed",
                        feedback: feedback || "",
                        updates: [
                            ...c.updates,
                            {
                                message: `Complaint closed with feedback: ${feedback || "No feedback provided"}`,
                                date: new Date().toLocaleString(),
                                by: "Officer",
                            },
                        ],
                    }
                    : c
            )
        );
    }
  if (selectedComplaint) {
    return (
      <ComplaintDetails
        selectedComplaint={selectedComplaint}
        setSelectedComplaint={setSelectedComplaint}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
        handleStatusUpdate={handleStatusUpdate}
        handleAddUpdate={handleAddUpdate}
        handleCloseComplaint={handleCloseComplaint}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg rounded-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Complaints Management
            </h1>
            <p className="text-blue-100 text-lg ">
              Manage and Track all Assigned complaints efficiently
            </p>
          </div>
        </div>
        {/* Filters */}
        <div className="mb-6 shadow-sm bg-white/80 backdrop-blur-sm rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search complaints..."
                className="pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg w-full py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="border-2 border-gray-200 focus:border-blue-400 rounded-lg w-full py-2 px-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              className="border-2 border-gray-200 focus:border-blue-400 rounded-lg w-full py-2 px-2"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="text-sm text-gray-600 flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2 border">
              <strong>{filteredComplaints.length}</strong>&nbsp;complaints found
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="shadow-lg bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden p-4">
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 border-b border-gray-200 p-4 md:p-6">
            <div className=" text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-600" />
              Assigned Complaints
            </div>
            <p className="text-gray-600">
              Click on any complaint to view details and manage
            </p>
          </div>

          {filteredComplaints.length > 0 ? (
            <div className="overflow-x-auto ">
              <table className="w-full text-left  ">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-2">Complaint ID</th>
                    <th className="p-2">Title</th>
                    <th className="p-2 hidden sm:table-cell">Citizen</th>
                    <th className="p-2 hidden md:table-cell">Category</th>
                    <th className="p-2">Status</th>
                    {/* <th className="p-2 hidden lg:table-cell">Priority</th> */}
                    <th className="p-2 hidden xl:table-cell">Date</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="hover:bg-blue-50/50 transition-colors cursor-pointer border-b border-gray-100 "
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <td className="font-mono p-2  text-sm font-medium text-blue-600">
                        {complaint.id}
                      </td>
                      <td className="p-2 font-medium text-gray-900 max-w-xs truncate">
                        {complaint.title}
                      </td>
                      <td className="p-2 text-gray-700 hidden sm:table-cell">
                        {complaint.citizen}
                      </td>
                      <td className="p-2 text-gray-600 hidden md:table-cell">
                        {complaint.category}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold ${getStatusColor(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>
                      </td>
                      {/* <td className="p-2 hidden lg:table-cell">
                        <span
                          className={`px-2 py-1  text-xs font-semibold ${getPriorityColor(
                            complaint.priority
                          )}`}
                        >
                          {complaint.priority}
                        </span>
                      </td> */}
                      <td className="p-2 text-gray-600 hidden xl:table-cell">
                        {complaint.date}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <button
                            className="hover:bg-blue-50 border border-blue-200 text-blue-600 rounded px-2 py-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedComplaint(complaint);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="hover:bg-green-50 border border-green-200 text-green-600 rounded px-2 py-1">
                           Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">
                No complaints found matching your criteria.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search or filter settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default OfficerComplaints;
