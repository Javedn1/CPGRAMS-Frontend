import React, { useState, useEffect } from "react";
import { Info, Search, ArrowDown } from "lucide-react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { showToast } from "../../utils/customToast";
import { HashLoader } from "react-spinners";
import { baseUrl } from "../../utils/ApiConstants";

const LeadOfficersDetails = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    getAllLeadOfficer();
  }, []);

  const getAllLeadOfficer = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseUrl}/api/admin/getAllLeadOfficers`);
      if (response.status === 200) {
        setEmployeesData(response.data.data);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleDemote = async (officerId) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/admin/demote/${officerId}`,  // <- ✅ fixed URL
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        showToast("⬇️ Officer demoted successfully!", "success");

        // Remove demoted officer from employeesData
        setEmployeesData((prev) => prev.filter((emp) => emp._id !== officerId));
      }
    } catch (error) {
      console.error("Error demoting officer:", error);
      showToast("❌ Failed to demote officer.", "error");
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] w-full">
        <div className="text-center">
          {/* <div className="w-12 h-12 border-4 border-blue-500  border-t-transparent rounded-full animate-spin mx-auto mb-4"></div> */}
          <HashLoader size={100} color={"#151ad1"} />
        </div>

      </div>

    )
  }

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/api/admin/delete/${id}`)
      if (response.status == 200) {
        showToast("Lead Officer Deleted Successfully", "success")
        getAllLeadOfficer()
      }
    } catch (error) {
      console.error("error deleting lead officer", error)
      showToast("Failed to delete", "error")
    } finally {
      setDeleteLoading(false)
    }
  }

  const locations = [...new Set(employeesData.map((emp) => emp.location))];

  const filteredEmployees = employeesData
    .filter(
      (emp) =>
        (emp.fullName?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (emp.email?.toLowerCase() || "").includes(search.toLowerCase())
    )
    .filter((emp) => (locationFilter ? emp.location === locationFilter : true))
    .sort((a, b) =>
      sortOrder === "new"
        ? employeesData.indexOf(a) - employeesData.indexOf(b)
        : employeesData.indexOf(b) - employeesData.indexOf(a)
    );

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
            className="pl-10 pr-4 py-2 w-full rounded-xl outline-none ring-2 ring-blue-400 border-blue-400 transition"
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
            {/* <th className="px-4 py-2 border border-gray-300 text-left">Location</th> */}
            <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((emp, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition">
                <td className="px-4 py-2 border border-gray-300">{emp.fullName}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.email}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.phoneNumber}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.gender}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.department}</td>
                {/* <td className="px-4 py-2 border border-gray-300">{emp.location}</td> */}
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-sm shadow hover:bg-red-600 transition"
                      onClick={() => handleDemote(emp._id)}
                    >
                      <ArrowDown size={16} /> Demote
                    </button>
                    {/* Add View button if needed */}
                    <button onClick={() => handleDelete(emp._id)} className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-sm shadow hover:bg-red-600 transition">
                      <Info size={16} /> Delete{deleteLoading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg> : ""}
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

export default LeadOfficersDetails;