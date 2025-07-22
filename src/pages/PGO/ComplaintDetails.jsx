import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  FileText,
  User,
  Phone,
  MapPin,
  Download,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Send,
  X,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useParams } from "react-router-dom";

// Default color functions
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
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
  switch (priority?.toLowerCase()) {
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

const ComplaintDetails = ({
  setSelectedComplaint,
  // handleAddUpdate,
  handleCloseComplaint,
  uniqueID: propUniqueID,
}) => {
  const { uniqueID: routeUniqueID } = useParams();
  const [selectedComplaint, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [finalMessage, setFinalMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const uniqueID = propUniqueID || routeUniqueID;

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/grievances/grievance/${uniqueID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

        const mapped = {
          _mongoId: data._id,
          id: data.uniqueID,
          title: data.title,
          status: data.status,
          priority: data.category || "Medium",
          date: new Date(data.dateOfIncident).toLocaleDateString(),
          category: data.departmentName || "General",
          location: data.locationOfIssue || "Not specified",
          description: data.grievanceDescription || "No description",
          citizen: data.fullName || "Citizen",
          email: data.email || "N/A",
          phone: data.phoneNumber || "N/A",
          attachments: (data.attachments || []).map((f) => ({
            name: f.url.split("/").pop(),
            url: f.url,
          })),
          updates: [
            ...(data.activityLog || []).map((log) => ({
              message: log.message || log.comment || "",
              date: new Date(log.timestamp).toLocaleString(),
              by: log.updatedBy || "Unknown",
            })),
            ...(data.progressUpdates || []).map((log) => ({
              message: log.message || "",
              date: new Date(log.timestamp).toLocaleString(),
              by: log.updatedBy || "Unknown",
              progressId: log._id,
            })),
          ],
        };

        setSelected(mapped);
      } catch (err) {
        console.error("Error fetching grievance:", err);
      }
    };

    if (uniqueID) fetchComplaint();
  }, [uniqueID]);


  const handleStatusUpdate = async (status, comment) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/grievances/status/${selectedComplaint._mongoId}`,
        { status, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Status update response:", res.data);

      const grievance = res?.data?.grievance;
      if (!grievance) {
        alert("No grievance object in response");
        return;
      }

      const updatedLog = grievance.activityLog?.slice(-1)[0];

      setSelected((prev) => ({
        ...prev,
        status: grievance.status,
        updates: [
          ...prev.updates,
          {
            message: updatedLog?.message || "",
            date: updatedLog?.timestamp
              ? new Date(updatedLog.timestamp).toLocaleString()
              : "",
            by: updatedLog?.updatedBy?.fullName || "Officer",
          },
        ],
      }));

      setNewStatus("");
      setFinalMessage("");
    } catch (error) {
      console.error("Error updating status:", error);
      alert(
        error?.response?.data?.message ||
        "Failed to update grievance status. Try again later."
      );
    }
  };


  const handleDeleteProgress = async (progressId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this progress update?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/grievances/progress-delete/${selectedComplaint._mongoId}/${progressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh UI after deletion
      setSelected((prev) => ({
        ...prev,
        updates: prev.updates.filter((u) => u.progressId !== progressId),
      }));

      alert("Progress update deleted");
    } catch (error) {
      console.error("Failed to delete progress update:", error);
      alert(error?.response?.data?.message || "Error deleting progress update.");
    }
  };


  const handleDeleteActivityLog = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the last activity log?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:5000/api/grievances/status-delete/${selectedComplaint._mongoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete response:", res.data);

      const grievance = res?.data?.grievance;

      if (!grievance) {
        alert("Failed to retrieve grievance from delete response.");
        return;
      }

      const mapped = {
        ...selectedComplaint,
        status: grievance.status,
        updates: [
          ...(grievance.activityLog || []).map((log) => ({
            message: log.message || log.comment || "",
            date: new Date(log.timestamp).toLocaleString(),
            by: log.updatedBy?.fullName || "Unknown",
          })),
          ...(grievance.progressUpdates || []).map((log) => ({
            message: log.message || "",
            date: new Date(log.timestamp).toLocaleString(),
            by: log.updatedBy?.fullName || "Unknown",
            progressId: log._id,
          })),
        ],
      };

      setSelected(mapped);
      alert("Last activity log deleted successfully");
    } catch (err) {
      console.error("Error deleting activity log:", err);
      alert(err?.response?.data?.message || "Failed to delete activity log.");
    }
  };


  const handleAddUpdate = async (message) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5000/api/grievances/progress/${selectedComplaint._mongoId}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const grievance = res?.data?.grievance;
      const newProgress = grievance.progressUpdates?.slice(-1)[0];

      if (!newProgress) {
        alert("Update saved, but no progress returned from backend.");
        return;
      }

      setSelected((prev) => ({
        ...prev,
        updates: [
          ...prev.updates,
          {
            message: newProgress.message || "",
            date: new Date(newProgress.timestamp).toLocaleString(),
            by: newProgress.updatedBy?.fullName || "Officer",
            progressId: newProgress._id,
          },
        ],
      }));

      alert("Progress update added!");
    } catch (error) {
      console.error("Failed to add progress update:", error);
      alert(error?.response?.data?.error || "Error adding progress update.");
    }
  };


  if (!selectedComplaint) return <div className="p-6">Loading complaint...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="bg-white shadow border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedComplaint?.(null)}
                className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Complaints
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Complaint Details</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                {selectedComplaint.status}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                {selectedComplaint.priority} Priority
              </span>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="border-b p-4 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">{selectedComplaint.title}</h2>
                <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mt-2">
                  <span>{selectedComplaint.id}</span>
                  <span>{selectedComplaint.date}</span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {selectedComplaint.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Citizen Information</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {selectedComplaint.citizen}
                      </div>
                      <div>{selectedComplaint.email}</div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedComplaint.phone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Location</h3>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p>{selectedComplaint.location}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">Description</h3>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-gray-700">
                    {selectedComplaint.description}
                  </div>
                </div>

                {selectedComplaint.attachments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {selectedComplaint.attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between border p-3 rounded bg-white hover:shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="truncate text-sm font-medium">{file.name}</span>
                          </div>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-300 text-gray-600 px-2 py-1 rounded hover:bg-gray-50 text-xs"
                          >
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold mb-2">Activity Timeline</h3>

                  {/* Determine the last activity log index before mapping */}
                  {(() => {
                    const activityLogIndexes = selectedComplaint.updates
                      .map((u, index) => ({
                        index,
                        isActivityLog: u.message?.toLowerCase().includes("updated by"),
                      }))
                      .filter((item) => item.isActivityLog);

                    const lastActivityLogIndex =
                      activityLogIndexes.length > 0
                        ? activityLogIndexes[activityLogIndexes.length - 1].index
                        : -1;

                    return (
                      <div className="space-y-3">
                        {selectedComplaint.updates.map((update, idx) => (
                          <div
                            key={idx}
                            className="flex gap-3 border p-3 rounded bg-white justify-between"
                          >
                            <div className="flex gap-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm">
                                  {update.message}
                                </p>
                                <div className="text-xs text-gray-500 mt-1">
                                  {update.date} • by {update.by}
                                </div>
                              </div>
                            </div>

                            {/* Show delete only for last activity log */}
                            {idx === lastActivityLogIndex && (
                              <button
                                onClick={handleDeleteActivityLog}
                                className="text-red-600 text-xs hover:underline"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Status Update Box */}
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="border-b p-4 bg-gray-50 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">Update Status</h3>
              </div>
              <div className="p-4 space-y-3">
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Select new status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>

                {newStatus === "resolved" && (
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
                    placeholder="Final resolution message"
                    rows={4}
                    value={finalMessage}
                    onChange={(e) => setFinalMessage(e.target.value)}
                  />
                )}

                <button
                  onClick={() => handleStatusUpdate?.(newStatus, finalMessage)}
                  disabled={!newStatus}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded flex items-center justify-center gap-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Update Status
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Progress Updates</h3>
              <div className="space-y-3">
                {selectedComplaint.updates
                  .filter(
                    (log) =>
                      log.progressId &&
                      ["in progress", "resolved", "closed"].includes(log.message?.toLowerCase())
                  )
                  .map((update, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 border p-3 rounded bg-white justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{update.message}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          {update.date} • by {update.by}
                        </div>
                      </div>

                      <button
                        className="text-red-600 text-xs hover:underline"
                        onClick={() => handleDeleteProgress(update.progressId)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>


            {/* Add Update Box */}
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="border-b p-4 bg-gray-50 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">Add Update</h3>
              </div>
              <div className="p-4 space-y-3">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
                  placeholder="Update message for citizen"
                  rows={3}
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleAddUpdate?.(updateMessage);
                    setUpdateMessage("");
                  }}

                  disabled={!updateMessage.trim()}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" /> Add Update
                </button>
              </div>
            </div>

            {/* Close Complaint Box */}
            {selectedComplaint.status === "resolved" && (
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                <div className="border-b p-4 bg-gray-50 flex items-center gap-2">
                  <X className="w-4 h-4 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Close Complaint</h3>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600">Mark as closed with feedback:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCloseComplaint?.("positive")}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2 text-sm"
                    >
                      <ThumbsUp className="w-4 h-4" /> Positive
                    </button>
                    <button
                      onClick={() => handleCloseComplaint?.("negative")}
                      className="border border-red-300 text-red-600 hover:bg-red-50 py-2 rounded flex items-center justify-center gap-2 text-sm"
                    >
                      <ThumbsDown className="w-4 h-4" /> Negative
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
