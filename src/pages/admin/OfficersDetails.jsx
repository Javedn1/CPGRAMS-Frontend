import React, { useState } from "react";
import { Eye, ArrowUp, Search, Info } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Pagination from "../../components/Pagination";

const OfficersDetails = () => {
  const employeesData = [
    {
      name: "John Doe",
      email: "john@example.com",
      number: "9876543210",
      gender: "Male",
      department: "Development",
      location: "Mumbai",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      number: "9876501234",
      gender: "Female",
      department: "Design",
      location: "Delhi",
    },
    {
      name: "Amit Verma",
      email: "amit.verma@example.com",
      number: "9123456780",
      gender: "Male",
      department: "HR",
      location: "Bangalore",
    },
    {
      name: "Priya Kapoor",
      email: "priya.k@example.com",
      number: "9823456710",
      gender: "Female",
      department: "Finance",
      location: "Pune",
    },
    {
      name: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      number: "9987654321",
      gender: "Male",
      department: "Development",
      location: "Chennai",
    },
    {
      name: "Sneha Rani",
      email: "sneha.r@example.com",
      number: "9912345678",
      gender: "Female",
      department: "Support",
      location: "Hyderabad",
    },
    {
      name: "Vikram Chauhan",
      email: "vikram.c@example.com",
      number: "9876123450",
      gender: "Male",
      department: "Marketing",
      location: "Kolkata",
    },
    {
      name: "Anjali Sharma",
      email: "anjali.sharma@example.com",
      number: "9765432109",
      gender: "Female",
      department: "Design",
      location: "Ahmedabad",
    },
    {
      name: "Rohit Singh",
      email: "rohit.singh@example.com",
      number: "9654321098",
      gender: "Male",
      department: "Operations",
      location: "Jaipur",
    },
    {
      name: "Kavya Iyer",
      email: "kavya.iyer@example.com",
      number: "9543210987",
      gender: "Female",
      department: "Admin",
      location: "Lucknow",
    },
    {
      name: "Suresh Patil",
      email: "suresh.p@example.com",
      number: "9898989898",
      gender: "Male",
      department: "Support",
      location: "Nagpur",
    },
    {
      name: "Neha Kaur",
      email: "neha.kaur@example.com",
      number: "9797979797",
      gender: "Female",
      department: "HR",
      location: "Indore",
    },
  ];

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("new");  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

   const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <th className="px-4 py-2 border border-gray-300 text-left">
              Name
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Email
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Number
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Gender
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Department
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Location
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((emp, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 cursor-default hover:bg-blue-50 transition"
              >
                <td className="px-4 py-2 border border-gray-300">{emp.name}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.email}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.number}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.gender}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.department}</td>
                <td className="px-4 py-2 border border-gray-300">{emp.location}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex items-center justify-center gap-3">
                    <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-sm shadow hover:bg-green-600 transition">
                      <ArrowUp size={16} /> Promote
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-sm shadow hover:bg-blue-600 transition">
                      <Eye size={16} /> View
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-sm shadow hover:bg-red-600 transition">
                      <Info size={16} /> Delete
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
      {/* {filteredEmployees.length > entriesPerPage && (

        <div className="flex justify-center items-center mt-6 space-x-6">
          <button
            className="w-[100px] py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm font-medium">
            Page <span className="text-blue-600 font-semibold">{currentPage}</span> / {totalPages}
          </span>

          <button
            className="w-[100px] py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>


      )} */}
    </div>
  );
};

export default OfficersDetails;
