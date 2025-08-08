import React, { useEffect, useState } from "react";
import {
  Eye,
  X,
  Info,
  Phone,
  User as UserIcon,
  Search,
  FileText,
  MapPin,
} from "lucide-react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { HashLoader } from "react-spinners";
import { baseUrl } from "../../utils/ApiConstants";

const statusStyles = {
  Rejected: "bg-red-100 text-red-700 border border-red-300",
  Resolved: "bg-green-100 text-green-700 border border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  "In Progress": "bg-blue-100 text-blue-700 border border-blue-300",
};

const safeValue = (val) => (val && val !== "" ? val : "N/A");

const AllGrievance = () => {
  const [usersData, setUsersData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [popoverComplaint, setPopoverComplaint] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage] = useState(5);
   const [loading,setLoading] = useState(false);

  useEffect(() => {
    const getAllGrievance = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/api/admin/getAllUsersWithGrievances`
        );
        setUsersData(res.data.data);
      } catch (error) {
        console.log("error", error);
      }finally{
        setLoading(false)
      }
    };
    getAllGrievance();
  }, []);

  if(loading){
    return(
      <div className="flex items-center justify-center h-[70vh] w-full">
        <div className="text-center">
          {/* <div className="w-12 h-12 border-4 border-blue-500  border-t-transparent rounded-full animate-spin mx-auto mb-4"></div> */}
          <HashLoader size={100} color={"#151ad1"}/>
        </div>

      </div>
     
    )
  }

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const filteredUsers = usersData
    .filter((user) =>
      user.fullName?.toLowerCase().includes(searchName.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "desc"
        ? b._id.localeCompare(a._id)
        : a._id.localeCompare(b._id)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
      </div>

      <div className="bg-white shadow-xl overflow-hidden border border-gray-200 overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border border-gray-300">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Sr.No
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Email
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Phone
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <React.Fragment key={user._id}>
                <tr className="hover:bg-blue-50/50 transition duration-200 ease-in-out border-b">
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-500" />
                      {safeValue(user.fullName)}
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {safeValue(user.email)}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {safeValue(user.phoneNumber)}
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      className="px-4 py-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-sm shadow hover:scale-105 transform transition"
                      onClick={() => toggleRow(user._id)}
                    >
                      <Eye className="w-4 h-4" />
                      {expandedRow === user._id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </td>
                </tr>

                {expandedRow === user._id && user.grievances.length > 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 bg-gray-50">
                      <div className=" overflow-y-auto overflow-x-auto border border-gray-200 shadow-inner bg-white">
                        <table className="min-w-full text-sm text-gray-700 border border-gray-300">
                          <thead className="bg-gray-100 border-b border-gray-300">
                            <tr>
                              <th className="px-4 py-2 border border-gray-300 text-left">
                                Sr.No
                              </th>
                              <th className="px-4 py-2 border border-gray-300 text-left">
                                Title
                              </th>
                              <th className="px-4 py-2 border border-gray-300 text-left">
                                Category
                              </th>
                              <th className="px-4 py-2 border border-gray-300 text-left">
                                Status
                              </th>
                              <th className="px-4 py-2 border border-gray-300 text-left">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.grievances.map((g, idx) => (
                              <tr
                                key={g._id}
                                className="hover:bg-gray-50 transition duration-200"
                              >
                                <td className="px-4 py-2 border border-gray-300">
                                  {idx + 1}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                  {safeValue(g.title)}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                  {safeValue(g.category)}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                  <span
                                    className={`px-3 py-1 rounded-sm text-sm font-medium ${
                                      statusStyles[g.status] ||
                                      "bg-gray-100 text-gray-600 border"
                                    }`}
                                  >
                                    {safeValue(g.status)}
                                  </span>
                                </td>
                                <td className="p-3 flex justify-center gap-2 border-b px-4 py-2 border border-gray-300">
                                  <button
                                    className="px-3 py-1 flex items-center gap-1 bg-green-500 text-white rounded-sm shadow hover:scale-105 transform transition"
                                    onClick={() => setPopoverComplaint(g)}
                                  >
                                    <Info className="w-4 h-4" /> View Complaint
                                  </button>
                                   <button
                                    className="px-3 py-1 flex items-center gap-1 bg-red-500 text-white rounded-sm shadow hover:scale-105 transform transition"
                                   
                                  >
                                    <Info className="w-4 h-4" /> Delete
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
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={filteredUsers.length}
        showItemsPerPage={true}
      />
      </div>

      {popoverComplaint && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-2xl p-4">
              <h3 className="text-xl font-semibold">
                {safeValue(popoverComplaint.title)}
              </h3>
            </div>

            <div className="p-6">
              <button
                className="absolute top-3 right-3 text-gray-200 hover:text-white"
                onClick={() => setPopoverComplaint(null)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Category:</span>
                </div>
                <div className="text-gray-700">
                  {safeValue(popoverComplaint.category)}
                </div>

                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Status:</span>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[popoverComplaint.status] ||
                      "bg-gray-100 text-gray-600 border"
                    }`}
                  >
                    {safeValue(popoverComplaint.status)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Location:</span>
                </div>
                <div className="text-gray-700">
                  {safeValue(popoverComplaint.locationOfIssue)}
                </div>

                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Department:</span>
                </div>
                <div className="text-gray-700">
                  {safeValue(popoverComplaint.departmentName)}
                </div>

                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Ministry:</span>
                </div>
                <div className="text-gray-700">
                  {safeValue(popoverComplaint.ministryName)}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Description
                </h4>
                <p className="text-gray-600">
                  {safeValue(popoverComplaint.grievanceDescription)}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Attachments
                </h4>
                {popoverComplaint.attachments?.length > 0 ? (
                  <ul className="space-y-2">
                    {popoverComplaint.attachments.map((att, idx) => (
                      <li key={idx}>
                        <a
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-2"
                        >
                          <FileText className="w-5 h-5 text-blue-500" />
                          View Attachment {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">N/A</p>
                )}
              </div>

              <div className="mt-6 text-right">
                <button
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow hover:scale-105 transform transition"
                  onClick={() => setPopoverComplaint(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllGrievance;
