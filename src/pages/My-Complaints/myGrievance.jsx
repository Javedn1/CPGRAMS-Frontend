import React, { useState } from 'react';
import { Plus, FileText, Bell, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import FeedbackForm from '../../components/FeedbackForm';
import GrievanceDetails from '../../components/GrievanceDetails';
import MainNavbar from '../../components/header/MainHeader';
import HeaderLayout from '../../components/header/Header-Layout/HeaderLayout';
import Footer from '../../components/footer/footer';

const statusColorMap = {
    resolved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
};

const priorityColorMap = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
};

const getStatusColor = (status) =>
    statusColorMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';

const getPriorityColor = (priority) =>
    priorityColorMap[priority?.toLowerCase()] || 'bg-gray-100 text-gray-800';

const MyGrievances = ({ complaints = [], setShowForm }) => {
    const sampleComplaints = [
        {
            id: 'GRV-1001',
            title: 'Street light not working',
            category: 'Municipal Services',
            status: 'Pending',
            priority: 'High',
            date: '2025-06-25',
            lastUpdate: '2025-06-27',
        },
        {
            id: 'GRV-1002',
            title: 'Water leakage in government building',
            category: 'Public Works Department',
            status: 'Resolved',
            priority: 'Medium',
            date: '2025-06-20',
            lastUpdate: '2025-06-28',
        },
        {
            id: 'GRV-1003',
            title: 'Delayed pension disbursement',
            category: 'Finance Department',
            status: 'Rejected',
            priority: 'Low',
            date: '2025-06-15',
            lastUpdate: '2025-06-18',
        },
    ];

    const [feedbackGrievanceId, setFeedbackGrievanceId] = useState(null);
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [activeTab, setActiveTab] = useState("mygrievance");

    const openDetailsModal = (grievance) => {
        setSelectedGrievance(grievance);
    };

    const handleFeedbackSubmit = ({ grievanceId, feedback, rating }) => {
        console.log('Feedback submitted:', { grievanceId, feedback, rating });
        setFeedbackGrievanceId(null);
    };

    const openFeedbackForm = (grievanceId) => {
        setFeedbackGrievanceId(grievanceId);
    };

    const handleSendReminder = (grievanceId) => {
        console.log('Reminder sent for:', grievanceId);
        alert(`Reminder sent for grievance ID: ${grievanceId}`);
    };

    const finalComplaints = complaints.length > 0 ? complaints : sampleComplaints;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text('My Grievances', 14, 16);

        const tableData = finalComplaints.map((complaint, index) => [
            index + 1,
            complaint.id,
            complaint.title,
            complaint.category,
            complaint.status,
            complaint.priority,
            complaint.date,
            complaint.lastUpdate,
        ]);

        autoTable(doc, {
            startY: 20,
            head: [[
                'S.No',
                'Grievance ID',
                'Title',
                'Category',
                'Status',
                'Priority',
                'Submitted',
                'Last Update',
            ]],
            body: tableData,
        });

        doc.save('my-grievances.pdf');
    };

    return (
        <>
            <HeaderLayout/>
            <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
                <div className='w-full md:w-56 bg-blue-800 text-white flex flex-col items-center py-8 md:py-10 relative'>
                    <button
            onClick={() => window.history.back()}
            className="absolute top-4 left-4 text-white hover:underline flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
          <div className="mt-12 flex flex-col gap-4 w-full px-4">
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "mygrievance"
                  ? "bg-white text-blue-800 font-semibold "
                  : "hover:bg-blue-700"
              }`}
            >
              My Grievance
            </button>
            </div>
                </div>
            <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-slate-50 w-full">
                {/* Header */}
                <div className="max-w-4xl  space-y-6">
                    <h1 className="text-3xl font-bold mb-2">
                        My Grievances
                    </h1>
                     <p className="text-gray-600 mb-6">
              Track and manage your submitted grievances
            </p>
                    {/* <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-lg shadow"
                    >
                        <Plus className="w-4 h-4" />
                        Submit New Grievance
                    </button> */}
                </div>

                {/* Table Card */}
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="border-b-2 border-gray-300 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center text-lg font-semibold text-gray-800 gap-2">
                            <FileText
                                className="w-5 h-5 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                onClick={handleDownloadPDF}
                                title="Download all grievances as PDF"
                            />
                            Grievance Records
                        </div>
                        {/* <span className="text-sm text-gray-500">Track and manage your submitted grievances</span> */}
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow rounded space-y-4 overflow-x-auto">
                        <table className="min-w-full text-sm table-auto divide-y divide-gray-200">
                            <thead className="bg-gray-50 text-gray-600 font-medium">
                                <tr>
                                    <th className="p-4 text-left">Grievance ID</th>
                                    <th className="p-4 text-left">Title</th>
                                    <th className="p-4 text-left">Category</th>
                                    <th className="p-4 text-left">Status</th>
                                    {/* <th className="p-4 text-left">Priority</th> */}
                                    <th className="p-4 text-left">Submitted</th>
                                    {/* <th className="p-4 text-left">Last Update</th> */}
                                    <th className="p-4 text-left">View Details</th>
                                    <th className="p-4 text-left">Feedback</th>
                                    <th className="p-4 text-left">Remainder</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {finalComplaints.map((complaint) => (
                                    <tr key={complaint.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-mono text-xs text-gray-700">{complaint.id}</td>
                                        <td className="p-4 max-w-xs truncate text-gray-800" title={complaint.title}>
                                            {complaint.title}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 text-xs font-medium ">
                                                {complaint.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium  ${getStatusColor(complaint.status)}`}>
                                                {complaint.status}
                                            </span>
                                        </td>
                                        {/* <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium  ${getPriorityColor(complaint.priority)}`}>
                                                {complaint.priority}
                                            </span>
                                        </td> */}
                                        <td className="p-4 text-gray-600">{complaint.date}</td>
                                        {/* <td className="p-4 text-gray-600">{complaint.lastUpdate}</td> */}
                                        <td className="p-4">
                                            <button
                                                onClick={() => openDetailsModal(complaint)}
                                                className="text-indigo-600 hover:underline text-sm"
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => openFeedbackForm(complaint.id)}
                                                className="text-green-600 hover:underline text-sm"
                                            >
                                                Feedback
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleSendReminder(complaint.id)}
                                                className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 text-sm"
                                            >
                                                <Bell className="w-4 h-4" />
                                                Remind Officer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {finalComplaints.length === 0 && (
                                    <tr>
                                        <td colSpan={10} className="p-6 text-center text-gray-500">
                                            No grievances found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {feedbackGrievanceId && (
                    <FeedbackForm
                        grievanceId={feedbackGrievanceId}
                        onClose={() => setFeedbackGrievanceId(null)}
                        onSubmit={handleFeedbackSubmit}
                    />
                )}
                {selectedGrievance && (
                    <GrievanceDetails
                        grievance={selectedGrievance}
                        onClose={() => setSelectedGrievance(null)}
                    />
                )}
            </div>
            </div>
            <Footer />
        </>
    );
};

export default MyGrievances;
