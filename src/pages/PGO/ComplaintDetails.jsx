import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  FileText,
  User,
  Mail,
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

const ComplaintDetails = ({
  selectedComplaint,
  setSelectedComplaint,
  getStatusColor,
  getPriorityColor,
  handleStatusUpdate,
  handleAddUpdate,
  handleCloseComplaint,
}) => {
  const [newStatus, setNewStatus] = useState("");
  const [finalMessage, setFinalMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  if (!selectedComplaint) return null;

  return (
        
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="bg-white shadow border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Complaints
                </button>
                <h1 className="text-xl font-semibold text-gray-900">
                  Complaint Details
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    selectedComplaint.status
                  )}`}
                >
                  {selectedComplaint.status}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                    selectedComplaint.priority
                  )}`}
                >
                  {selectedComplaint.priority} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Complaint Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                <div className="border-b p-4 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedComplaint.title}
                  </h2>
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
                  {/* Citizen Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-2">
                        Citizen Information
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />{" "}
                          {selectedComplaint.citizen}
                        </div>
                        <div>
                        {selectedComplaint.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />{" "}
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

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Description</h3>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-gray-700">
                    {selectedComplaint.description}
                  </div>
                </div>

                {/* Attachments */}
                {selectedComplaint.attachments?.length > 0 && (
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
                            <span className="truncate text-sm font-medium">
                              {file}
                            </span>
                          </div>
                          <button className="border border-gray-300 text-gray-600 px-2 py-1 rounded hover:bg-gray-50 text-xs">
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Timeline */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">
                    Activity Timeline
                  </h3>
                  <div className="space-y-3">
                    {selectedComplaint.updates.map((update, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 border p-3 rounded bg-white"
                      >
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="space-y-6">
            {/* Status Update */}
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="border-b p-4 bg-gray-50 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Update Status
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Select new status</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
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
                  onClick={handleStatusUpdate}
                  disabled={!newStatus}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded flex items-center justify-center gap-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Update Status
                </button>
              </div>
            </div>

            {/* Add Update */}
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="border-b p-4 bg-gray-50 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Add Update
                </h3>
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
                  onClick={()=>{
                    handleAddUpdate(updateMessage);
                    setUpdateMessage("");
                  }}
                  disabled={!updateMessage.trim()}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" /> Add Update
                </button>
              </div>
            </div>

            {/* Close Complaint */}
            {selectedComplaint.status === "resolved" && (
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                <div className="border-b p-4 bg-gray-50 flex items-center gap-2">
                  <X className="w-4 h-4 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-900">
                    Close Complaint
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600">
                    Mark as closed with feedback:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCloseComplaint("positive")}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2 text-sm"
                    >
                      <ThumbsUp className="w-4 h-4" /> Positive
                    </button>
                    <button
                      onClick={() => handleCloseComplaint("negative")}
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
