import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, ArrowUp, Search, Info } from "lucide-react";
// import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import { showToast } from "../../utils/customToast";

const OfficersDetails = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/getAllOfficers");
        const officers = response.data?.data || [];

        const mapped = officers.map((officer) => ({
          _id: officer._id,
          name: officer.fullName || "-",
          email: officer.email || "-",
          number: officer.phoneNumber || "_",
          gender: officer.gender || "_",
          department: officer.department || "_",
          location: officer.location || "_",
          role: officer.role || "officer",
        }));

        setEmployeesData(mapped);
      } catch (err) {
        console.error("Failed to fetch officers:", err);
      }
    };

    fetchOfficers();
  }, []);

  const handlePromote = async (officerId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/officers/${officerId}/promote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        showToast("⬇️ Officer promoted successfully!", "success");

        // Immediately remove promoted officer from the list (if only officers are shown)
        setEmployeesData((prev) => prev.filter(emp => emp._id !== officerId));
      }
    } catch (error) {
      console.error("❌ Error promoting officer:", error);
      alert("❌ Failed to promote officer.");
    }
  };


  const handleDelete = async (officerId) => {
    setDeleteLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete/${officerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        showToast(res.data.message || "Officer deleted successfully", "success");
        setEmployeesData((prev) => prev.filter((emp) => emp._id !== officerId));
      }
    } catch (error) {
      console.error("Error deleting officer:", error);
      showToast(error.response?.data?.message || "Failed to delete officer", "error");
    } finally {
      setDeleteLoading(false);
    }
  };


  const locations = [...new Set(employeesData.map((emp) => emp.location))];

  const filteredEmployees = employeesData
    .filter(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((emp) => (locationFilter ? emp.location === locationFilter : true))
    .sort((a, b) => {
      return sortOrder === "new"
        ? employeesData.indexOf(a) - employeesData.indexOf(b)
        : employeesData.indexOf(b) - employeesData.indexOf(a);
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="overflow-x-auto py-6 px-3">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <div className="relative w-full sm:w-2/3">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-2 w-full rounded-sm outline-none ring-2 ring-blue-400 border-blue-400 transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="px-4 py-2 rounded-sm w-full sm:w-1/4 outline-none ring-2 ring-blue-400 border-blue-400 transition"
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Locations</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 rounded-sm w-full sm:w-1/4 outline-none ring-2 ring-blue-400 border-blue-400 transition"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="new">New → Old</option>
          <option value="old">Old → New</option>
        </select>
      </div>

      <table className="min-w-full text-sm text-gray-700 border border-gray-300">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Number</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Gender</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Department</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((emp) => (
              <tr
                key={emp._id}
                className="odd:bg-white even:bg-gray-50 cursor-default hover:bg-blue-50 transition"
              >
                <td className="px-4 py-2 border border-gray-300">{emp.name}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.email}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.number}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.gender}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.department}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex items-center justify-center gap-3">
                    {emp.role === "lead_officer" ? (
                      <span className="text-green-600 font-semibold">Promoted</span>
                    ) : (
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-sm shadow hover:bg-green-600 transition"
                        onClick={() => handlePromote(emp._id)}
                      >
                        <ArrowUp size={16} /> Promote
                      </button>
                    )}

                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-sm shadow hover:bg-red-600 transition disabled:opacity-50"
                      onClick={() => handleDelete(emp._id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? (
                        <span className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></span>
                      ) : (
                        <>
                          <Info size={16} /> Delete
                        </>
                      )}
                    </button>

                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={filteredEmployees.length}
        showItemsPerPage={true}
      />
    </div>
  );
};

export default OfficersDetails;
