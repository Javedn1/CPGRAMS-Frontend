import { useState, useEffect } from "react";
import axios from "axios";

const AssignOfficerModal = ({ isOpen, onClose, complaintId, onAssign, position }) => {
  const [officers, setOfficers] = useState([]);
  const [selectedOfficerId, setSelectedOfficerId] = useState("");

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/officer/all-officers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOfficers(res.data.officers || []);
      } catch (err) {
        console.error("Failed to fetch officers", err);
      }
    };

    if (isOpen) fetchOfficers();
  }, [isOpen]);


  const handleAssign = () => {
  if (selectedOfficerId) {
    console.log("Assigning officer:", selectedOfficerId, "to complaint:", complaintId);
    onAssign(complaintId, selectedOfficerId);
  } else {
    alert("Please select an officer.");
  }
};

  if (!isOpen) return null;

  return (
    <>
      <div
        className="absolute z-50"
        style={{ top: position.top, left: position.left }}
      >
        <div className="w-[220px] p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Assign Officer</h2>
          <select
            value={selectedOfficerId}
            onChange={(e) => setSelectedOfficerId(e.target.value)}
            className="w-full mb-3 bg-white/50 backdrop-blur-sm border border-gray-300 p-1.5 rounded-md text-xs text-gray-700 shadow-sm"
          >
            <option value="">-- Select Officer --</option>
            {officers.map((officer) => (
              <option key={officer._id} value={officer._id}>
                {officer.fullName}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2 text-xs">
            <button
              className="px-2 py-1 bg-white/70 text-gray-700 rounded hover:bg-white/90 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleAssign}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default AssignOfficerModal;
